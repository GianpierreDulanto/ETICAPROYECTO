# 🚀 Guía de Despliegue a Railway

Esta guía te ayudará a hostear tu aplicación React en Railway de forma segura usando variables de entorno.

## ⚠️ Importante sobre Seguridad

**NUNCA** pongas tu clave API directamente en el código o en archivos commiteados. Usaremos **Variables de Entorno de Railway** para proteger tu clave API.

## 📋 Pasos para Desplegar

### 1. Crear cuenta en Railway

1. Ve a [Railway.app](https://railway.app)
2. Crea una cuenta (puedes usar GitHub para iniciar sesión)
3. Verifica tu email si es necesario

### 2. Conectar tu Repositorio

1. En el dashboard de Railway, click en **New Project**
2. Selecciona **Deploy from GitHub repo**
3. Autoriza Railway para acceder a tus repositorios
4. Selecciona tu repositorio `eticaca` (o el nombre que tengas)
5. Railway detectará automáticamente que es una aplicación React

### 3. Configurar Variables de Entorno

1. En tu proyecto de Railway, ve a la pestaña **Variables**
2. Click en **New Variable**
3. Agrega la variable:
   - **Key**: `REACT_APP_GEMINI_API_KEY`
   - **Value**: `AIzaSyDiEzNc0hSgZ4V5I-liy6Kb4quhiaNzC-w`
4. Click en **Add**

✅ Ahora tu clave API está guardada de forma segura en Railway

### 4. Configurar el Build

Railway debería detectar automáticamente que es una aplicación React, pero puedes verificar:

1. Ve a la pestaña **Settings** de tu servicio
2. Verifica que:
   - **Build Command**: `npm run build` (o está vacío, Railway lo detectará)
   - **Start Command**: `npx serve -s build -l $PORT` (para servir la app estática)

### 5. Instalar dependencia para servir la app

Railway necesita un servidor para servir tu aplicación React. Agrega `serve` como dependencia:

```bash
npm install --save serve
```

O actualiza tu `package.json` manualmente agregando `serve` en `dependencies`.

### 6. Desplegar

Railway desplegará automáticamente cuando:
- Haces push a la rama conectada (generalmente `main` o `master`)
- O puedes hacer click en **Deploy** manualmente

### 7. Obtener tu URL

1. Una vez desplegado, Railway te dará una URL automática
2. Puedes personalizarla en **Settings** → **Domains**
3. Tu app estará disponible en: `https://TU-PROYECTO.up.railway.app`

## 🔍 Verificación

### Verificar que la Variable está configurada:
- Variables → Debe aparecer `REACT_APP_GEMINI_API_KEY`
- El valor debe estar oculto (mostrando solo `••••••`)

### Verificar el Deploy:
- Deployments → El último deployment debe estar en estado "Success"
- Logs → No debe haber errores relacionados con la clave API

### Verificar que la clave NO está expuesta:
```bash
# Buscar en el código fuente
grep -r "AIzaSy" src/
# No debe encontrar nada

# Verificar que .env está en .gitignore
grep "\.env" .gitignore
# Debe mostrar .env
```

## 🛠️ Solución de Problemas

### Error: "REACT_APP_GEMINI_API_KEY no está configurada"
- Verifica que la variable está configurada en Railway → Variables
- El nombre debe ser exactamente: `REACT_APP_GEMINI_API_KEY`
- Reinicia el deployment después de agregar la variable

### Error: "Cannot find module 'serve'"
- Instala `serve` como dependencia: `npm install --save serve`
- O verifica que está en `package.json` en `dependencies`

### El build falla
- Revisa los logs en Railway → Deployments → [último deployment] → View Logs
- Verifica que todas las dependencias están en `package.json`
- Asegúrate de que el código no tiene errores de sintaxis

### La app no carga o muestra errores
- Verifica que el `Start Command` está configurado: `npx serve -s build -l $PORT`
- Revisa los logs del servicio en tiempo real
- Verifica que el puerto está usando la variable `$PORT` (Railway la proporciona automáticamente)

## 📝 Notas Importantes

1. **Railway Variables son seguras**: Solo están disponibles durante el build y runtime, nunca se exponen en el código fuente
2. **El build incluye la variable**: La variable de entorno se inyecta durante el build y está disponible en runtime
3. **Deploy automático**: Cada push a la rama principal desplegará automáticamente
4. **Plan gratuito**: Railway ofrece un plan gratuito con límites generosos para proyectos pequeños

## 🔒 Seguridad Adicional (Recomendado)

Para mayor seguridad, considera:

1. **Restringir la clave API por dominio**:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Selecciona tu proyecto
   - Ve a APIs & Services → Credentials
   - Edita tu clave API
   - En "Application restrictions", selecciona "HTTP referrers"
   - Agrega: `https://TU-PROYECTO.up.railway.app/*`

2. **Usar un backend proxy** (más seguro):
   - Crea un backend simple en Railway (Node.js, Python, etc.)
   - El backend guarda la clave API como variable de entorno
   - El frontend llama al backend, no directamente a Gemini
   - Esto oculta completamente la clave del frontend

## 💰 Costos

- **Plan Hobby (Gratis)**: 
  - $5 de crédito gratis por mes
  - Suficiente para proyectos pequeños
  - Se pausa después de inactividad

- **Plan Pro ($20/mes)**:
  - Sin pausas automáticas
  - Más recursos
  - Soporte prioritario

## 📚 Recursos

- [Railway Documentation](https://docs.railway.app)
- [Railway Variables](https://docs.railway.app/develop/variables)
- [React Deployment Guide](https://docs.railway.app/guides/deploy-react)

## 🔄 Comandos Útiles

```bash
# Instalar serve para producción
npm install --save serve

# Build local para probar
npm run build

# Probar el build localmente
npx serve -s build -p 3000
```
