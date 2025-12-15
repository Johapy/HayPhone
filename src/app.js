import express from 'express';
import { PORT } from './config/config.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import whatsappService from './services/whatsappService.js';
//import cronService from './services/cronService.js';

const app = express();

// Middleware para entender JSON
app.use(express.json());

// Usamos nuestras rutas
app.use(whatsappRoutes);

// Iniciamos el servidor web
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Para ver el QR visita: http://localhost:${PORT}/link-qr`);
});

// Iniciamos el cliente de WhatsApp
console.log('Iniciando cliente de WhatsApp...');
whatsappService.initialize();

// Iniciamos el servicio de cron
console.log('Iniciando servicio de cron...');
//cronService.initialize();