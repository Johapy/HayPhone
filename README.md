📱 HayPhone Bot - Automatización WhatsApp

Bot de WhatsApp basado en Puppeteer para la gestión de la comunidad HayPhone, enfocado en engagement y detección de leads de venta.

Este proyecto es una solución automatizada diseñada para HayPhone. Su objetivo principal es mantener activa la comunidad de usuarios mediante interacciones programadas y actuar como un filtro de ventas inteligente, detectando intenciones de compra en tiempo real.

🚀 Funcionalidades

1. 📢 Reactivación de Comunidad

Envío automático de mensajes para generar debate y actividad.

Prevención de "grupos muertos" mediante contenido programado.

2. 💰 Detector de Intención de Venta (Sales Sniffer)

Escucha activa de mensajes entrantes.

Análisis de palabras clave (ej: "precio", "catálogo", "iphone 14", "disponible").

Acción: Alerta a los administradores o envía una respuesta automática con información de venta cuando detecta un cliente potencial.

3. 🌐 Servidor Express Integrado

Mantiene el proceso de Node.js activo.

Expone endpoints (opcional) para disparar mensajes masivos o verificar el estado del bot (Health Check).

🛠️ Stack Tecnológico

Node.js: Entorno de ejecución principal.

Puppeteer: Automatización del navegador (Headless Chrome) para simular la interacción humana en WhatsApp Web.

Express.js: Framework de servidor para gestionar rutas HTTP y mantener la aplicación escuchando.

📋 Requisitos Previos

Node.js (v16 o superior recomendado).

NPM o Yarn.

Un dispositivo móvil con WhatsApp (y la línea de HayPhone) listo para escanear el código QR.

Google Chrome instalado (opcional, Puppeteer descarga su propia versión de Chromium, pero ayuda tenerlo).

🔧 Instalación

Clonar el repositorio:

git clone [https://github.com/tu-usuario/hayphone-bot.git](https://github.com/tu-usuario/hayphone-bot.git)
cd hayphone-bot


Instalar dependencias:

npm install


Esto instalará Puppeteer, lo cual puede tardar un poco mientras descarga Chromium.

Configuración de Entorno (.env):
Crea un archivo .env en la raíz:

PORT=3000
SESSION_PATH=./session_auth
ADMIN_NUMBER=584120000000@c.us


▶️ Uso

Modo Desarrollo

Para ver el navegador abrirse (útil para debuggear):

npm run dev
# Asegúrate de tener configurado { headless: false } en tu config de Puppeteer


Modo Producción

Para correr en un servidor (VPS, Heroku, Railway):

npm start


📱 Vinculación

Al iniciar, la terminal generará un Código QR (si usas una librería como qrcode-terminal) o guardará una imagen del QR.

Escanea el código con el WhatsApp de HayPhone.

Una vez vinculado, Puppeteer guardará la sesión localmente para no pedir el QR de nuevo.

🧠 Arquitectura del Bot

El sistema funciona con un bucle de eventos:

Inicialización: Express levanta el servidor en el puerto configurado.

Puppeteer Launch: Se abre una instancia de Chrome y navega a web.whatsapp.com.

Inyección: El bot inyecta scripts o utiliza la API del DOM para leer mensajes nuevos.

Lógica de Negocio:

if (msg.body.includes('precio')) -> Trigger Venta.

if (inactiveTime > 24h) -> Trigger Reactivación.

📂 Estructura del Proyecto

hayphone-bot/
├── src/
│   ├── config/         # Configuración de Puppeteer/Express
│   ├── controllers/    # Lógica de respuestas
│   ├── services/       # Lógica de Puppeteer (Client)
│   ├── routes/         # Rutas de Express (API)
│   └── utils/          # Parsers y helpers
├── session_auth/       # Datos de sesión de WhatsApp (No subir a Git)
├── .env                # Variables de entorno
├── index.js            # Punto de entrada
└── package.json


🤝 Contribución

Haz un Fork.

Crea tu rama (git checkout -b feature/nueva-feature).

Commit a tus cambios (git commit -am 'Agrega X funcionalidad').

Push a la rama (git push origin feature/nueva-feature).

Abre un Pull Request.

⚠️ Nota Legal

Este proyecto es para uso educativo y de gestión interna de HayPhone. El uso de bots en cuentas personales puede conllevar riesgos de bloqueo por parte de WhatsApp si se detecta spam. Úsalo con intervalos de tiempo humanos y responsabilidad.

Desarrollado para HayPhone 📱
