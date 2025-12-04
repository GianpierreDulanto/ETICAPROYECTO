const isBrowser = typeof window !== 'undefined' && Boolean(window.indexedDB);

const openDatabase = () =>
  new Promise((resolve, reject) => {
    if (!isBrowser) {
      reject(new Error('IndexedDB no disponible'));
      return;
    }
    const request = window.indexedDB.open('anmi-db', 1);

    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('chats')) {
        db.createObjectStore('chats', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('preferences')) {
        db.createObjectStore('preferences', { keyPath: 'clave' });
      }
    };
    request.onsuccess = () => resolve(request.result);
  });

const getStore = async (storeName, mode = 'readonly') => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
};

export const guardarChats = async (chats = []) => {
  if (!isBrowser) return;
  try {
    const store = await getStore('chats', 'readwrite');
    store.clear();
    chats.forEach((chat) => store.put(chat));
  } catch (error) {
    console.warn('Fallo guardando en IndexedDB, usando localStorage', error);
    localStorage.setItem('anmi_chats', JSON.stringify(chats));
  }
};

export const cargarChats = async () => {
  if (!isBrowser) return [];
  try {
    const store = await getStore('chats');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Fallo leyendo IndexedDB, usando localStorage', error);
    const guardados = localStorage.getItem('anmi_chats');
    return guardados ? JSON.parse(guardados) : [];
  }
};

export const guardarPreferencias = async (preferencias = {}) => {
  if (!isBrowser) return;
  try {
    const store = await getStore('preferences', 'readwrite');
    Object.entries(preferencias).forEach(([clave, valor]) => {
      store.put({ clave, valor });
    });
  } catch (error) {
    console.warn('No se pudieron persistir preferencias en IndexedDB', error);
    Object.entries(preferencias).forEach(([clave, valor]) => {
      localStorage.setItem(`anmi_${clave}`, valor);
    });
  }
};

export const cargarPreferencias = async () => {
  const fallback = {};
  if (!isBrowser) return fallback;
  try {
    const store = await getStore('preferences');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const resultado = request.result || [];
        const mapa = resultado.reduce((acc, item) => {
          acc[item.clave] = item.valor;
          return acc;
        }, {});
        resolve(mapa);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('No se pudieron leer preferencias desde IndexedDB', error);
    return {
      tema: localStorage.getItem('anmi_tema'),
      font_size: localStorage.getItem('anmi_font_size'),
    };
  }
};
