// Servicio para integrar con Google Gemini API
// Usa el motor offline como fallback si falla la conexión

import { GoogleGenerativeAI } from '@google/generative-ai';

// ⚠️ SEGURIDAD: La clave API debe estar en variables de entorno, nunca hardcodeada
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ REACT_APP_GEMINI_API_KEY no está configurada. Por favor, crea un archivo .env con tu clave API.');
  throw new Error('REACT_APP_GEMINI_API_KEY no está configurada. Verifica tu archivo .env');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const SYSTEM_PROMPT = `Eres ANMI, un Asistente Nutricional Materno Infantil desarrollado por la Universidad Nacional Mayor de San Marcos.

Tu propósito es brindar información educativa sobre:
- Nutrición infantil (0-24 meses)
- Prevención y manejo de anemia
- Lactancia materna
- Alimentación complementaria (6-12 meses)
- Seguridad alimentaria
- Conducta alimentaria

IMPORTANTE:
- Eres una herramienta EDUCATIVA, NO reemplazas la atención médica profesional
- NO puedes diagnosticar enfermedades
- NO puedes recetar medicamentos
- NO puedes dar dietas personalizadas con cantidades exactas
- Siempre recomienda consultar con pediatra o nutricionista para casos específicos
- Si detectas una emergencia médica, insta a buscar atención inmediata
- Mantén un tono cálido, empático y profesional
- Responde en español peruano, de forma clara y accesible
- Usa emojis moderadamente para hacer la información más amigable

Responde de forma concisa pero completa, enfocándote en información práctica y segura.`;

/**
 * Obtiene respuesta de Gemini API usando el modelo actual gemini-2.0-flash
 * @param {string} mensajeUsuario - El mensaje del usuario
 * @param {Array} historialMensajes - Historial de mensajes del chat actual (opcional)
 * @returns {Promise<{texto: string, fuente: 'gemini'|'offline'}>}
 */
export const obtenerRespuestaGemini = async (mensajeUsuario, historialMensajes = []) => {
  try {
    // ✅ Usar gemini-2.0-flash - el modelo actual disponible
    // Intentar con gemini-2.0-flash primero, luego gemini-2.5-flash como fallback
    let model;
    try {
      model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        systemInstruction: SYSTEM_PROMPT,
      });
    } catch (error) {
      // Si falla, intentar con gemini-2.5-flash
      console.warn('gemini-2.0-flash no disponible, intentando con gemini-2.5-flash');
      model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        systemInstruction: SYSTEM_PROMPT,
      });
    }

    // Construir historial
    const historial = [];
    if (historialMensajes.length > 0) {
      const historialReciente = historialMensajes.slice(-10);
      const empezarDesde = historialReciente[0]?.esBot ? 1 : 0;
      
      for (let i = empezarDesde; i < historialReciente.length; i++) {
        const msg = historialReciente[i];
        historial.push({
          role: msg.esBot ? 'model' : 'user',
          parts: [{ text: msg.texto }],
        });
      }
    }

    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    const chat = model.startChat({
      history: historial,
      generationConfig,
    });

    const result = await chat.sendMessage(mensajeUsuario);
    const response = await result.response;

    return {
      texto: response.text().trim(),
      fuente: 'gemini',
    };
  } catch (error) {
    console.error('Error al obtener respuesta de Gemini:', error);
    throw error;
  }
};

// Variable global para forzar modo offline (puede ser modificada desde la UI)
let forzarModoOffline = false;

/**
 * Establece si se debe forzar el modo offline
 * @param {boolean} forzar - true para forzar offline, false para usar conexión real
 */
export const setForzarModoOffline = (forzar) => {
  forzarModoOffline = forzar;
};

/**
 * Obtiene el estado de forzar modo offline
 * @returns {boolean}
 */
export const getForzarModoOffline = () => {
  return forzarModoOffline;
};

/**
 * Verifica si hay conexión a internet
 * @returns {boolean}
 */
export const hayConexion = () => {
  // Si está forzado a offline, retornar false
  if (forzarModoOffline) {
    return false;
  }
  
  return typeof navigator !== 'undefined' && navigator.onLine;
};

/**
 * Intenta obtener respuesta de Gemini, si falla usa el motor offline
 * @param {string} mensajeUsuario - El mensaje del usuario
 * @param {Array} historialMensajes - Historial de mensajes
 * @param {Function} buscarRespuestaOffline - Función del motor offline
 * @returns {Promise<{texto: string, fuente: string}>}
 */
export const obtenerRespuestaInteligente = async (
  mensajeUsuario,
  historialMensajes = [],
  buscarRespuestaOffline
) => {
  if (!hayConexion()) {
    console.log('Sin conexión, usando motor offline');
    return {
      texto: buscarRespuestaOffline(mensajeUsuario).texto,
      fuente: 'offline',
    };
  }

  try {
    return await obtenerRespuestaGemini(mensajeUsuario, historialMensajes);
  } catch (error) {
    console.warn('Error con Gemini, fallback a offline:', error.message);
    return {
      texto: buscarRespuestaOffline(mensajeUsuario).texto,
      fuente: 'offline',
    };
  }
};
