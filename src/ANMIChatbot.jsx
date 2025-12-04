import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  AlertCircle,
  Info,
  Menu,
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  Star,
  Volume2,
  Settings,
  ArrowDown,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { buscarRespuesta } from './MotorConocimiento';
import { obtenerRespuestaInteligente, setForzarModoOffline } from './services/geminiService';
import './styles/ChatStyles.css';
import {
  cargarChats,
  cargarPreferencias,
  guardarChats,
  guardarPreferencias,
} from './utils/storage';

const TIPS_NUTRICION = [
  'Ofrece alimentos ricos en hierro como hígado, sangrecita, lentejas y pescado.',
  'Acompaña los alimentos ricos en hierro con frutas cítricas para mejorar la absorción.',
  'Evita el té o café en niños pequeños, pueden disminuir la absorción de hierro.',
  'Mantén la lactancia materna junto con la alimentación complementaria.',
  'Introduce nuevos alimentos de manera progresiva y observa posibles reacciones.',
];

const MensajeChat = ({ mensaje, esBot, temaOscuro }) => (
  <div
    className={`d-flex mb-3 animate-fade-in ${esBot ? 'justify-content-start' : 'justify-content-end'
      }`}
  >
    {esBot && (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center me-2 animate-bounce-once"
        style={{
          width: '40px',
          height: '40px',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #198754, #0f5132)',
          boxShadow: '0 4px 12px rgba(25, 135, 84, 0.4)',
        }}
      >
        <Bot className="text-white" size={20} />
      </div>
    )}

    <div
      className="px-4 py-3 rounded-4 animate-slide-up"
      style={{
        maxWidth: '80%',
        background: esBot
          ? temaOscuro
            ? 'linear-gradient(135deg, #2d3748, #1a202c)'
            : 'linear-gradient(135deg, #ffffff, #f8f9fa)'
          : 'linear-gradient(135deg, #198754, #157347)',
        color: esBot ? (temaOscuro ? '#e2e8f0' : '#1a202c') : '#ffffff',
        border: esBot && !temaOscuro ? '1px solid #e2e8f0' : 'none',
        boxShadow: esBot
          ? temaOscuro
            ? '0 4px 16px rgba(0, 0, 0, 0.4)'
            : '0 4px 16px rgba(0, 0, 0, 0.08)'
          : '0 4px 16px rgba(25, 135, 84, 0.3)',
      }}
    >
      <div className="mb-0" style={{ lineHeight: '1.7' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => (
              <p {...props} style={{ marginBottom: '0.5rem', lineHeight: '1.7' }} />
            ),
            li: ({ node, ...props }) => (
              <li {...props} style={{ marginBottom: '0.25rem', lineHeight: '1.7' }} />
            ),
          }}
        >
          {mensaje}
        </ReactMarkdown>
      </div>
    </div>

    {!esBot && (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center ms-2"
        style={{
          width: '40px',
          height: '40px',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #0d6efd, #0a58ca)',
          boxShadow: '0 4px 12px rgba(13, 110, 253, 0.4)',
        }}
      >
        <User className="text-white" size={20} />
      </div>
    )}
  </div>
);

const AvisoResponsabilidad = ({ alAceptar }) => (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center animate-fade-in"
    style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}
  >
    <div
      className="bg-white rounded-4 p-3 shadow-lg animate-scale-in"
      style={{ maxWidth: '380px', width: '90%' }}
    >
      {/* ENCABEZADO */}
      <div className="text-center mb-2">
        <img
          src={`${process.env.PUBLIC_URL}/sanMarcos.png`}
          alt="Logo UNMSM"
          style={{ height: '45px', objectFit: 'contain', marginBottom: '0.3rem' }}
        />

        <h2 className="h6 fw-bold text-success mb-1" style={{ fontSize: '0.9rem' }}>
          ANMI
        </h2>

        <p className="text-muted small mb-0" style={{ fontSize: '0.75rem' }}>
          Asistente Nutricional Materno Infantil
        </p>

        <p className="text-muted small mb-0" style={{ fontSize: '0.72rem' }}>
          Proyecto FISI – UNMSM con apoyo de la Facultad de Nutrición
        </p>
      </div>

      {/* AVISO */}
      <div
        className="alert alert-warning d-flex align-items-start mb-3 rounded-3"
        role="alert"
        style={{ fontSize: '0.78rem', padding: '0.6rem' }}
      >
        <AlertCircle
          className="text-warning me-2 flex-shrink-0"
          size={18}
          style={{ marginTop: '2px' }}
        />
        <div style={{ lineHeight: '1.4' }}>
          <h5 className="alert-heading fw-bold mb-2" style={{ fontSize: '0.8rem' }}>
            ⚠️ Aviso importante
          </h5>

          <p className="mb-1">
            <strong>ANMI es una herramienta educativa</strong> sobre nutrición infantil.
          </p>

          <p className="mb-1">No reemplaza la atención profesional y no puede:</p>

          <ul className="mb-2 ps-3">
            <li>Diagnosticar enfermedades</li>
            <li>Recetar medicamentos o suplementos</li>
            <li>Crear dietas personalizadas</li>
          </ul>

          <p className="fw-bold text-dark mb-0" style={{ fontSize: '0.78rem' }}>
            Consulta siempre con tu pediatra o nutricionista.
          </p>
        </div>
      </div>

      {/* PIE */}
      <div className="text-center mb-2">
        <p className="text-muted small mb-0" style={{ fontSize: '0.7rem' }}>
          Universidad Nacional Mayor de San Marcos
        </p>
      </div>

      {/* BOTÓN */}
      <button
        onClick={alAceptar}
        className="btn btn-success w-100 fw-bold py-2 rounded-3 btn-hover"
        style={{ fontSize: '0.85rem' }}
      >
        Entiendo y acepto
      </button>
    </div>
  </div>
);



const PanelInformacion = () => (
  <div
    className="d-flex align-items-start mb-3 rounded-4 animate-slide-down p-4"
    style={{
      background: 'linear-gradient(135deg, #e7f3ff 0%, #d4edff 100%)',
      border: '1px solid #b8daff',
      boxShadow: '0 4px 20px rgba(13, 110, 253, 0.15)',
    }}
  >
    <Info className="text-info me-3 flex-shrink-0 animate-float" size={24} style={{ marginTop: '2px' }} />
    <div>
      <p className="fw-bold mb-3" style={{ fontSize: '1.1em', color: '#004085' }}>
        💚 Puedo ayudarte con:
      </p>
      <ul className="mb-3" style={{ color: '#004085' }}>
        <li>Información sobre anemia infantil</li>
        <li>Alimentos ricos en hierro para bebés</li>
        <li>Preparación segura de alimentos</li>
        <li>Nutrición de 0 a 24 meses</li>
      </ul>

      <p className="fw-bold mb-2 mt-3" style={{ fontSize: '1em', color: '#004085' }}>
        📚 Recursos confiables:
      </p>
      <ul className="mb-0 small" style={{ color: '#084298' }}>
        <li>
          <a
            href="https://www.gob.pe/minsa"
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#0d6efd',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Ministerio de Salud del Perú (MINSA)
          </a>
        </li>
        <li>
          <a
            href="https://www.who.int/es"
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#0d6efd',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Organización Mundial de la Salud (OMS)
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const ItemChat = ({
  chat,
  seleccionado,
  alSeleccionar,
  alRenombrar,
  alEliminar,
  alToggleFavorito,
}) => {
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(chat.nombre);

  const guardarNombre = () => {
    if (nuevoNombre.trim()) {
      alRenombrar(chat.id, nuevoNombre.trim());
      setEditando(false);
    }
  };

  return (
    <div
      className="p-3 rounded-3 mb-2 cursor-pointer transition-all"
      onClick={() => !editando && alSeleccionar(chat.id)}
      style={{
        cursor: 'pointer',
        background: seleccionado
          ? 'linear-gradient(135deg, #d1f2eb, #c3f0e3)'
          : '#ffffff',
        border: seleccionado ? '2px solid #198754' : '1px solid #e2e8f0',
        boxShadow: seleccionado
          ? '0 4px 16px rgba(25, 135, 84, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (!seleccionado) {
          e.currentTarget.style.transform = 'translateX(4px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!seleccionado) {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        }
      }}
    >
      {editando ? (
        <div
          className="d-flex align-items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && guardarNombre()}
            className="form-control form-control-sm"
            autoFocus
          />
          <button onClick={guardarNombre} className="btn btn-success btn-sm">
            <Check size={16} />
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-between">
          <span className="fw-semibold text-dark flex-grow-1 text-truncate">
            {chat.nombre}
          </span>
          <div className="d-flex gap-1 ms-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditando(true);
              }}
              className="btn btn-sm btn-link text-secondary p-1 hover-primary"
              style={{ lineHeight: 1 }}
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                alEliminar(chat.id);
              }}
              className="btn btn-sm btn-link text-secondary p-1 hover-danger"
              style={{ lineHeight: 1 }}
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                alToggleFavorito(chat.id);
              }}
              className="btn btn-sm btn-link p-1"
              style={{
                lineHeight: 1,
                color: chat.favorito ? '#ffc107' : '#adb5bd',
              }}
            >
              <Star size={14} />
            </button>
          </div>
        </div>
      )}
      <p className="text-muted small mb-0 mt-1">{chat.fecha}</p>
    </div>
  );
};

const Sidebar = ({
  abierta,
  alCerrar,
  chats,
  chatActual,
  alSeleccionarChat,
  alNuevoChat,
  alRenombrarChat,
  alEliminarChat,
  alToggleFavoritoChat,
}) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const chatsFiltrados = chats
    .slice()
    .sort((a, b) => {
      if (a.favorito === b.favorito) return 0;
      return a.favorito ? -1 : 1;
    })
    .filter((chat) => {
      if (!terminoBusqueda.trim()) return true;
      const texto = terminoBusqueda.toLowerCase();
      const coincideNombre = chat.nombre.toLowerCase().includes(texto);
      const coincideMensajes = (chat.mensajes || []).some((m) =>
        (m.texto || '').toLowerCase().includes(texto)
      );
      return coincideNombre || coincideMensajes;
    });

  return (
    <>
      {abierta && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark animate-fade-in"
          style={{ zIndex: 1040, opacity: 0.5 }}
          onClick={alCerrar}
        />
      )}

      <div
        className="position-fixed top-0 start-0 h-100 animate-slide-in-left"
        style={{
          width: '320px',
          zIndex: 1051,
          background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
          display: abierta ? 'block' : 'none',
        }}
      >
        <div className="d-flex flex-column h-100">
          <div className="p-4" style={{
            background: 'linear-gradient(135deg, #198754, #157347)',
            boxShadow: '0 2px 12px rgba(25, 135, 84, 0.3)',
          }}>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="h5 mb-0 fw-bold text-white">💬 Mis Chats</h2>
              <button
                onClick={alCerrar}
                className="btn btn-link p-1"
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-3">
            <button
              onClick={() => {
                alNuevoChat();
                alCerrar();
              }}
              className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold py-3 rounded-3 btn-hover"
              style={{
                background: 'linear-gradient(135deg, #198754, #157347)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 12px rgba(25, 135, 84, 0.3)',
              }}
            >
              <Plus size={20} />
              Nuevo Chat
            </button>
          </div>

          <div className="px-3 mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar en mis chats..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
          </div>

          <div
            className="flex-grow-1 overflow-auto px-3 pb-3"
            style={{ maxHeight: 'calc(100vh - 180px)' }}
          >
            {chatsFiltrados.length === 0 ? (
              <p className="text-muted text-center mt-5 small">
                No se encontraron chats
              </p>
            ) : (
              chatsFiltrados.map((chat) => (
                <ItemChat
                  key={chat.id}
                  chat={chat}
                  seleccionado={chat.id === chatActual}
                  alSeleccionar={alSeleccionarChat}
                  alRenombrar={alRenombrarChat}
                  alEliminar={alEliminarChat}
                  alToggleFavorito={alToggleFavoritoChat}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SubmenuSettings = ({
  abierto,
  alCerrar,
  tamanoFuente,
  disminuirFuente,
  aumentarFuente,
  temaOscuro,
  toggleTema,
  manejarDescargarChat,
  forzarOffline,
  toggleForzarOffline,
}) => {
  if (!abierto) return null;

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark animate-fade-in"
        style={{ zIndex: 1040, opacity: 0.4 }}
        onClick={alCerrar}
      />
      <div
        className="position-fixed top-0 end-0 h-100 animate-slide-in-right"
        style={{
          width: '300px',
          zIndex: 1052,
          background: temaOscuro
            ? 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)'
            : 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="d-flex flex-column h-100">
          <div
            className="p-4"
            style={{
              background: temaOscuro
                ? 'linear-gradient(135deg, #2d3748, #1a202c)'
                : 'linear-gradient(135deg, #198754, #157347)',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span
                className="fw-bold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#ffffff', fontSize: '1.1em' }}
              >
                ⚙️ Configuración
              </span>
              <button
                onClick={alCerrar}
                className="btn btn-link p-1"
                style={{
                  color: temaOscuro ? 'rgba(226, 232, 240, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = temaOscuro ? '#ffffff' : '#ffffff';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = temaOscuro
                    ? 'rgba(226, 232, 240, 0.9)'
                    : 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                <X size={22} />
              </button>
            </div>
          </div>

          <div className="p-3 flex-grow-1 overflow-auto">
            <div className="mb-4">
              <p
                className="mb-2 fw-semibold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}
              >
                📏 Tamaño de letra
              </p>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm"
                  onClick={disminuirFuente}
                  style={{
                    background: temaOscuro ? '#2d3748' : '#ffffff',
                    color: temaOscuro ? '#e2e8f0' : '#1a202c',
                    border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  A-
                </button>
                <button
                  className="btn btn-sm"
                  onClick={aumentarFuente}
                  style={{
                    background: temaOscuro ? '#2d3748' : '#ffffff',
                    color: temaOscuro ? '#e2e8f0' : '#1a202c',
                    border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  A+
                </button>
                <span
                  className="small ms-1"
                  style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}
                >
                  {tamanoFuente}px
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p
                className="mb-2 fw-semibold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}
              >
                🎨 Tema
              </p>
              <button
                className="btn btn-sm d-flex align-items-center gap-2"
                onClick={toggleTema}
                style={{
                  background: temaOscuro ? '#2d3748' : '#ffffff',
                  color: temaOscuro ? '#e2e8f0' : '#1a202c',
                  border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {temaOscuro ? 'Modo claro ☀️' : 'Modo oscuro 🌙'}
              </button>
            </div>

            <div className="mb-4">
              <p
                className="mb-2 fw-semibold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}
              >
                📴 Modo Offline
              </p>
              <div className="d-flex align-items-center gap-3">
                <label
                  className="form-check-label"
                  style={{
                    color: temaOscuro ? '#e2e8f0' : '#1a202c',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={forzarOffline}
                    onChange={toggleForzarOffline}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#198754',
                    }}
                  />
                  Forzar modo offline (solo motor local)
                </label>
              </div>
              <p
                className="small mt-2 mb-0"
                style={{ color: temaOscuro ? '#a0aec0' : '#6c757d', lineHeight: '1.5' }}
              >
                {forzarOffline
                  ? 'El chatbot usará solo el motor offline, sin conexión a Gemini.'
                  : 'El chatbot usará Gemini cuando haya conexión, con fallback offline.'}
              </p>
            </div>

            <div className="mb-3">
              <p
                className="mb-2 fw-semibold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}
              >
                💾 Exportar chat
              </p>
              <button
                className="btn btn-sm"
                onClick={manejarDescargarChat}
                style={{
                  background: temaOscuro ? '#2d3748' : '#ffffff',
                  color: temaOscuro ? '#e2e8f0' : '#1a202c',
                  border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Descargar historial (.txt)
              </button>
              <p
                className="small mt-2 mb-0"
                style={{ color: temaOscuro ? '#a0aec0' : '#6c757d', lineHeight: '1.5' }}
              >
                Se descargará un archivo de texto con todas las preguntas y respuestas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function ChatbotANMI({ estaOffline = false }) {
  const [mensajes, setMensajes] = useState([]);
  const [valorEntrada, setValorEntrada] = useState('');
  const [mostrarAviso, setMostrarAviso] = useState(true);
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [usandoIA, setUsandoIA] = useState(false);
  const [sidebarAbierta, setSidebarAbierta] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatActualId, setChatActualId] = useState(null);
  const [tipActual, setTipActual] = useState(
    () => TIPS_NUTRICION[Math.floor(Math.random() * TIPS_NUTRICION.length)]
  );

  const [temaOscuro, setTemaOscuro] = useState(false);
  const [tamanoFuente, setTamanoFuente] = useState(16);
  const [forzarOffline, setForzarOffline] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [mostrarBotonBajar, setMostrarBotonBajar] = useState(false);

  // ⭐ NUEVO: estados para instalación PWA
  const [esInstalable, setEsInstalable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [appInstalada, setAppInstalada] = useState(false);

  const finMensajesRef = useRef(null);
  const contenedorChatRef = useRef(null);

  // Cargar chats y preferencias al inicio
  useEffect(() => {
    let cancelado = false;

    const cargarTodo = async () => {
      const preferencias = await cargarPreferencias();
      if (!cancelado) {
        if (preferencias.tema) {
          setTemaOscuro(preferencias.tema === 'oscuro');
        }
        if (preferencias.font_size) {
          setTamanoFuente(parseInt(preferencias.font_size, 10));
        }
        if (preferencias.forzar_offline !== undefined) {
          const forzar = preferencias.forzar_offline === 'true';
          setForzarOffline(forzar);
          setForzarModoOffline(forzar);
        }
      }

      const chatsPersistidos = await cargarChats();
      if (!cancelado) {
        setChats(chatsPersistidos);
        if (chatsPersistidos.length > 0) {
          setChatActualId(chatsPersistidos[0].id);
          setMensajes(chatsPersistidos[0].mensajes || []);
        }
        setCargandoDatos(false);
      }
    };

    cargarTodo();

    return () => {
      cancelado = true;
    };
  }, []);

  // Guardar chats en IndexedDB cada vez que cambien
  useEffect(() => {
    if (cargandoDatos) return;
    guardarChats(chats);
  }, [chats, cargandoDatos]);

  // Guardar preferencias
  useEffect(() => {
    if (cargandoDatos) return;
    guardarPreferencias({
      tema: temaOscuro ? 'oscuro' : 'claro',
      font_size: tamanoFuente.toString(),
      forzar_offline: forzarOffline.toString(),
    });
    setForzarModoOffline(forzarOffline);
  }, [temaOscuro, tamanoFuente, forzarOffline, cargandoDatos]);

  // Actualizar mensajes en el chat actual cada vez que cambian
  useEffect(() => {
    if (!chatActualId || mensajes.length === 0) return;

    setChats((prevChats) => {
      const chatsActualizados = prevChats.map((chat) =>
        chat.id === chatActualId
          ? {
            ...chat,
            mensajes: [...mensajes],
            ultimaActualizacion: new Date().toISOString(),
          }
          : chat
      );
      return chatsActualizados;
    });
  }, [mensajes, chatActualId]);

  const desplazarAlFinal = () => {
    finMensajesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    desplazarAlFinal();
  }, [mensajes, estaEscribiendo]);

  // Detectar si el usuario está cerca del final del chat
  useEffect(() => {
    const contenedor = contenedorChatRef.current;

    if (!contenedor) return;

    const manejarScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = contenedor;
      const distanciaDelFinal = scrollHeight - scrollTop - clientHeight;
      const deberiaMostrar = distanciaDelFinal > 150;
      setMostrarBotonBajar(deberiaMostrar);
    };

    contenedor.addEventListener('scroll', manejarScroll);
    setTimeout(() => manejarScroll(), 100);

    return () => {
      contenedor.removeEventListener('scroll', manejarScroll);
    };
  }, [mensajes]);

  useEffect(() => {
    if (!mostrarAviso && mensajes.length === 0 && chatActualId) {
      setMensajes([
        {
          texto: `¡Hola! Soy ANMI, tu Asistente Nutricional Materno Infantil 👶  Estoy aquí para ayudarte con información educativa sobre nutrición y prevención de anemia en bebés de 6 a 12 meses.  ¿En qué puedo ayudarte hoy?`,
          esBot: true,
        },
      ]);
    }
  }, [mostrarAviso, chatActualId, mensajes.length]);

  // ⭐ NUEVO: detección de instalabilidad PWA
  useEffect(() => {
    const manejarBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setEsInstalable(true); // 👉 Solo aquí mostramos el mensaje/botón
    };

    const manejarInstalada = () => {
      setAppInstalada(true);
      setEsInstalable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', manejarBeforeInstallPrompt);
    window.addEventListener('appinstalled', manejarInstalada);

    return () => {
      window.removeEventListener('beforeinstallprompt', manejarBeforeInstallPrompt);
      window.removeEventListener('appinstalled', manejarInstalada);
    };
  }, []);

  const manejarInstalarPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setEsInstalable(false);
      setDeferredPrompt(null);
    }
  };

  const crearNuevoChat = () => {
    const nuevoChat = {
      id: Date.now().toString(),
      nombre: `Chat ${chats.length + 1}`,
      fecha: new Date().toLocaleDateString(),
      mensajes: [],
      ultimaActualizacion: new Date().toISOString(),
      favorito: false,
    };
    setChats((prev) => [nuevoChat, ...prev]);
    setChatActualId(nuevoChat.id);
    setMensajes([]);
  };

  const seleccionarChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setChatActualId(chatId);
      setMensajes(chat.mensajes || []);
    }
  };

  const renombrarChat = (chatId, nuevoNombre) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, nombre: nuevoNombre } : chat
      )
    );
  };

  const eliminarChat = (chatId) => {
    const nuevosChats = chats.filter((c) => c.id !== chatId);
    setChats(nuevosChats);

    if (chatId === chatActualId) {
      if (nuevosChats.length > 0) {
        setChatActualId(nuevosChats[0].id);
        setMensajes(nuevosChats[0].mensajes || []);
      } else {
        setChatActualId(null);
        setMensajes([]);
      }
    }
  };

  const toggleFavoritoChat = (chatId) => {
    setChats((prev) =>
      prev
        .map((chat) =>
          chat.id === chatId ? { ...chat, favorito: !chat.favorito } : chat
        )
        .sort((a, b) => {
          if (a.favorito === b.favorito) return 0;
          return a.favorito ? -1 : 1;
        })
    );
  };

  const manejarEnvio = async () => {
    if (!valorEntrada.trim()) return;

    const mensajeUsuario = valorEntrada.trim();

    if (!chatActualId) {
      crearNuevoChat();
      setTimeout(async () => {
        setMensajes([{ texto: mensajeUsuario, esBot: false }]);
        setValorEntrada('');
        setEstaEscribiendo(true);
        setUsandoIA(!estaOffline);

        try {
          const respuesta = await obtenerRespuestaInteligente(
            mensajeUsuario,
            [],
            buscarRespuesta
          );
          setEstaEscribiendo(false);
          setUsandoIA(false);
          setMensajes((prev) => [
            ...prev,
            { texto: respuesta.texto, esBot: true },
          ]);
        } catch (error) {
          console.error('Error al obtener respuesta:', error);
          setEstaEscribiendo(false);
          setUsandoIA(false);
          const respuestaOffline = buscarRespuesta(mensajeUsuario);
          setMensajes((prev) => [
            ...prev,
            { texto: respuestaOffline.texto, esBot: true },
          ]);
        }
      }, 100);
      return;
    }

    setMensajes((prev) => [...prev, { texto: mensajeUsuario, esBot: false }]);
    setValorEntrada('');
    setEstaEscribiendo(true);
    setUsandoIA(!estaOffline);

    try {
      const respuesta = await obtenerRespuestaInteligente(
        mensajeUsuario,
        mensajes,
        buscarRespuesta
      );
      setEstaEscribiendo(false);
      setUsandoIA(false);
      setMensajes((prev) => [
        ...prev,
        { texto: respuesta.texto, esBot: true },
      ]);
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
      setEstaEscribiendo(false);
      setUsandoIA(false);
      const respuestaOffline = buscarRespuesta(mensajeUsuario);
      setMensajes((prev) => [
        ...prev,
        { texto: respuestaOffline.texto, esBot: true },
      ]);
    }
  };

  const manejarTeclaPresionada = (evento) => {
    if (evento.key === 'Enter' && !evento.shiftKey) {
      evento.preventDefault();
      manejarEnvio();
    }
  };

  const manejarDescargarChat = () => {
    if (!mensajes.length) return;

    const contenido = mensajes
      .map((m) => `${m.esBot ? 'ANMI:' : 'Usuario:'}\n${m.texto}`)
      .join('\n\n-----------------------------\n\n');

    const blob = new Blob([contenido], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-anmi.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const disminuirFuente = () => {
    setTamanoFuente((prev) => Math.max(14, prev - 2));
  };

  const aumentarFuente = () => {
    setTamanoFuente((prev) => Math.min(22, prev + 2));
  };

  const leerUltimoMensajeBot = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('El lector de voz no está disponible en este dispositivo.');
      return;
    }
    const ultimoBot = [...mensajes].reverse().find((m) => m.esBot);
    if (!ultimoBot) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(ultimoBot.texto);
    utterance.lang = 'es-PE';
    window.speechSynthesis.speak(utterance);
  };

  if (mostrarAviso) {
    return <AvisoResponsabilidad alAceptar={() => setMostrarAviso(false)} />;
  }

  return (
    <>
      <Sidebar
        abierta={sidebarAbierta}
        alCerrar={() => setSidebarAbierta(false)}
        chats={chats}
        chatActual={chatActualId}
        alSeleccionarChat={seleccionarChat}
        alNuevoChat={crearNuevoChat}
        alRenombrarChat={renombrarChat}
        alEliminarChat={eliminarChat}
        alToggleFavoritoChat={toggleFavoritoChat}
      />

      <SubmenuSettings
        abierto={submenuAbierto}
        alCerrar={() => setSubmenuAbierto(false)}
        tamanoFuente={tamanoFuente}
        disminuirFuente={disminuirFuente}
        aumentarFuente={aumentarFuente}
        temaOscuro={temaOscuro}
        toggleTema={() => setTemaOscuro((prev) => !prev)}
        manejarDescargarChat={manejarDescargarChat}
        forzarOffline={forzarOffline}
        toggleForzarOffline={() => setForzarOffline((prev) => !prev)}
      />

      <div
        className="d-flex flex-column vh-100"
        style={{
          background: temaOscuro
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(180deg, #d1f2eb 0%, #f8f9fa 50%, #ffffff 100%)',
          transition: 'background 0.3s ease, color 0.3s ease',
          fontSize: `${tamanoFuente}px`,
          color: temaOscuro ? '#e2e8f0' : '#1a202c',
        }}
      >
        {/* Header */}
        <div
          className="text-white p-3 gradient-header"
          style={{
            background: 'linear-gradient(135deg, #198754 0%, #157347 50%, #0f5132 100%)',
            boxShadow: '0 4px 20px rgba(25, 135, 84, 0.3)',
          }}
        >
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <button
                  onClick={() => setSidebarAbierta(true)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                  }}
                  aria-label="Abrir lista de chats"
                >
                  <Menu size={24} />
                </button>
                <div
                  className="bg-white rounded-circle p-2 animate-float d-flex align-items-center justify-content-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Bot size={32} style={{ color: '#198754' }} />
                </div>
                <div>
                  <h1 className="h4 mb-0 d-flex align-items-center fw-bold">
                    ANMI
                    {usandoIA && (
                      <span
                        className="badge bg-info ms-2 animate-pulse"
                        style={{ fontSize: '0.6rem', padding: '2px 6px' }}
                        title="Usando IA de Gemini"
                      >
                        🤖 IA
                      </span>
                    )}
                    {estaOffline && !usandoIA && (
                      <span
                        className="badge bg-secondary ms-2"
                        style={{ fontSize: '0.6rem', padding: '2px 6px' }}
                        title="Modo offline"
                      >
                        📴 Offline
                      </span>
                    )}
                  </h1>
                  <p className="mb-0 small" style={{ opacity: 0.95 }}>
                    Asistente Nutricional Materno Infantil
                  </p>

                  {/* 🔹 SOLO se muestra mensaje + botón si REALMENTE se puede instalar */}
                  {esInstalable && !appInstalada && (
                    <div className="mt-2 d-flex align-items-center gap-2">
                      <p className="mb-0 small" style={{ opacity: 0.95 }}>
                        📲 Puedes instalar ANMI como aplicación en tu dispositivo.
                      </p>
                      <button
                        onClick={manejarInstalarPWA}
                        className="btn btn-sm btn-light py-1 px-2"
                        style={{
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        Instalar
                      </button>
                    </div>
                  )}
                  {/* 🔸 Después de instalar, NO mostramos nada extra */}
                </div>
              </div>

              <button
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                }}
                onClick={() => setSubmenuAbierto(true)}
                aria-label="Abrir configuración"
              >
                <Settings size={22} />
              </button>
            </div>
          </div>
        </div>


        {/* Área de Chat */}
        <div
          ref={contenedorChatRef}
          className="flex-grow-1 overflow-auto p-3 position-relative"
          style={{
            background: temaOscuro
              ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
              : 'linear-gradient(180deg, #d1f2eb 0%, #f8f9fa 50%, #ffffff 100%)',
          }}
        >
          <div className="container" style={{ maxWidth: '900px' }}>
            <PanelInformacion />

            {tipActual && (
              <div
                className="rounded-4 mb-3 animate-fade-in p-4"
                style={{
                  background: temaOscuro
                    ? 'linear-gradient(135deg, #065f46, #047857)'
                    : 'linear-gradient(135deg, #d1f2eb, #a7f3d0)',
                  border: `1px solid ${temaOscuro ? '#059669' : '#6ee7b7'}`,
                  boxShadow: temaOscuro
                    ? '0 4px 20px rgba(6, 95, 70, 0.4)'
                    : '0 4px 20px rgba(16, 185, 129, 0.2)',
                  color: temaOscuro ? '#d1fae5' : '#064e3b',
                }}
              >
                <strong style={{ fontSize: '1.05em' }}>💡 Tip ANMI:</strong> {tipActual}
                <button
                  className="btn btn-sm ms-3 p-1 px-2"
                  onClick={() => {
                    const random =
                      TIPS_NUTRICION[
                      Math.floor(Math.random() * TIPS_NUTRICION.length)
                      ];
                    setTipActual(random);
                  }}
                  style={{
                    background: temaOscuro ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                    color: temaOscuro ? '#d1fae5' : '#064e3b',
                    border: 'none',
                    fontSize: '0.85em',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = temaOscuro
                      ? 'rgba(255, 255, 255, 0.25)'
                      : 'rgba(0, 0, 0, 0.12)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = temaOscuro
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(0, 0, 0, 0.08)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🔄 Otro tip
                </button>
              </div>
            )}

            {mensajes.map((msj, indice) => (
              <MensajeChat
                key={indice}
                mensaje={msj.texto}
                esBot={msj.esBot}
                temaOscuro={temaOscuro}
              />
            ))}

            {estaEscribiendo && (
              <div className="d-flex align-items-center mb-3 animate-fade-in">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #198754, #0f5132)',
                    boxShadow: '0 4px 12px rgba(25, 135, 84, 0.4)',
                  }}
                >
                  <Bot className="text-white" size={20} />
                </div>
                <div
                  className="px-4 py-3 rounded-4"
                  style={{
                    background: temaOscuro
                      ? 'linear-gradient(135deg, #2d3748, #1a202c)'
                      : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                    border: temaOscuro ? 'none' : '1px solid #e2e8f0',
                    boxShadow: temaOscuro
                      ? '0 4px 16px rgba(0, 0, 0, 0.4)'
                      : '0 4px 16px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="d-flex gap-1">
                    <div
                      className="spinner-grow text-secondary"
                      role="status"
                      style={{ width: '10px', height: '10px' }}
                    >
                      <span className="visually-hidden">Escribiendo...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary"
                      role="status"
                      style={{
                        width: '10px',
                        height: '10px',
                        animationDelay: '0.15s',
                      }}
                    >
                      <span className="visually-hidden">Escribiendo...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary"
                      role="status"
                      style={{
                        width: '10px',
                        height: '10px',
                        animationDelay: '0.3s',
                      }}
                    >
                      <span className="visually-hidden">Escribiendo...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={finMensajesRef} />
          </div>
        </div>

        {/* Botón flotante para bajar al final */}
        <div
          className="position-relative"
          style={{
            width: '100%',
            height: '0',
            pointerEvents: 'none',
          }}
        >
          {mostrarBotonBajar && (
            <button
              onClick={desplazarAlFinal}
              className="btn position-absolute animate-fade-in"
              style={{
                bottom: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(25, 135, 84, 0.9)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 16px rgba(25, 135, 84, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                pointerEvents: 'auto',
              }}
              aria-label="Ir al final del chat"
            >
              <ArrowDown size={24} />
            </button>
          )}
        </div>

        {/* Input */}
        <div
          className="p-3"
          style={{
            background: temaOscuro
              ? 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)'
              : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
            borderTop: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="d-flex gap-2 align-items-center">
              <button
                onClick={leerUltimoMensajeBot}
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  width: '46px',
                  height: '46px',
                  background: temaOscuro ? '#2d3748' : '#ffffff',
                  color: temaOscuro ? '#e2e8f0' : '#495057',
                  border: `1px solid ${temaOscuro ? '#4a5568' : '#ced4da'}`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                aria-label="Escuchar último mensaje de ANMI"
              >
                <Volume2 size={20} />
              </button>
              <input
                type="text"
                value={valorEntrada}
                onChange={(evento) => setValorEntrada(evento.target.value)}
                onKeyPress={manejarTeclaPresionada}
                placeholder="Escribe tu pregunta..."
                className="form-control rounded-3"
                style={{
                  background: temaOscuro ? '#2d3748' : '#ffffff',
                  color: temaOscuro ? '#e2e8f0' : '#1a202c',
                  border: `2px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                  padding: '12px 16px',
                  fontSize: '1em',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#198754';
                  e.target.style.boxShadow = '0 0 0 3px rgba(25, 135, 84, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = temaOscuro ? '#4a5568' : '#dee2e6';
                  e.target.style.boxShadow = 'none';
                }}
                aria-label="Escribe tu pregunta para ANMI"
              />
              <button
                onClick={manejarEnvio}
                disabled={!valorEntrada.trim()}
                className="btn px-4 rounded-3 btn-hover"
                style={{
                  background: valorEntrada.trim()
                    ? 'linear-gradient(135deg, #198754, #157347)'
                    : temaOscuro
                      ? '#4a5568'
                      : '#e9ecef',
                  color: valorEntrada.trim() ? '#ffffff' : temaOscuro ? '#718096' : '#adb5bd',
                  border: 'none',
                  height: '46px',
                  boxShadow: valorEntrada.trim()
                    ? '0 4px 12px rgba(25, 135, 84, 0.3)'
                    : 'none',
                  cursor: valorEntrada.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
