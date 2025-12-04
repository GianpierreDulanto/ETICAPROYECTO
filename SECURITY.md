# 🔒 Guía de Seguridad - ANMI Chatbot

## Problema de Seguridad Resuelto

Se ha corregido un problema crítico de seguridad donde la clave API de Google Gemini estaba hardcodeada en el código fuente.

## ✅ Cambios Realizados

1. **Eliminada la clave API hardcodeada** de `src/services/geminiService.js`
2. **Actualizado `.gitignore`** para asegurar que archivos `.env` nunca sean commiteados
3. **Implementada validación estricta** que requiere la variable de entorno
4. **Documentación actualizada** en README.md con instrucciones de configuración

## 🚨 Acciones Inmediatas Requeridas

### Si tu clave API fue expuesta:

1. **Revoca la clave API inmediatamente:**
   - Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Encuentra la clave expuesta: `AIzaSyArtYjjD8ANVs5_j-68mpiEX9T2rU3u9Hs`
   - Elimínala o revócala

2. **Genera una nueva clave API:**
   - Crea una nueva clave en [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Configura restricciones de dominio/IP si es posible

3. **Configura tu entorno local:**
   ```bash
   # En la raíz del proyecto, crea un archivo .env
   echo REACT_APP_GEMINI_API_KEY=tu_nueva_clave_aqui > .env
   ```

4. **Verifica que el archivo .env no esté en git:**
   ```bash
   git status
   # El archivo .env NO debe aparecer en los archivos rastreados
   ```

## 📋 Configuración Correcta

### Archivo `.env` (NO commitear)
```env
REACT_APP_GEMINI_API_KEY=tu_clave_api_aqui
```

### Verificación
- ✅ El archivo `.env` está en `.gitignore`
- ✅ No hay claves hardcodeadas en el código
- ✅ El código valida que la variable de entorno exista

## 🔍 Verificación de Seguridad

Para verificar que no hay claves expuestas en tu repositorio:

```bash
# Buscar posibles claves API en el código
grep -r "AIzaSy" src/
# No debe encontrar nada

# Verificar que .env está en .gitignore
grep "\.env" .gitignore
# Debe mostrar .env

# Verificar que no hay archivos .env en git
git ls-files | grep "\.env"
# No debe mostrar nada
```

## 📚 Mejores Prácticas

1. **NUNCA** commitees claves API, tokens o credenciales
2. **SIEMPRE** usa variables de entorno para secretos
3. **REVISA** el historial de git si crees que una clave fue expuesta
4. **ROTA** las claves regularmente
5. **USA** restricciones de dominio/IP en las claves API cuando sea posible

## 🆘 Si Necesitas Ayuda

Si tu clave API fue bloqueada por Google:
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Revisa los logs de API para entender el problema
3. Contacta al soporte de Google si es necesario
4. Considera implementar un backend proxy para ocultar la clave del frontend

## 📝 Notas Adicionales

- Las variables de entorno en React deben comenzar con `REACT_APP_`
- El archivo `.env` debe estar en la raíz del proyecto (junto a `package.json`)
- Reinicia el servidor de desarrollo después de crear/modificar `.env`

