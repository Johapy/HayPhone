import whatsappWeb from 'whatsapp-web.js';
// 1. Agregamos las nuevas importaciones aquí 👇
import { PUPPETEER_OPTIONS, SALES_ADVISOR_NUMBER, SALES_KEYWORDS, PROMPT_SALES } from '../config/config.js';
import { getResponse } from '../services/aiService.js';
import cronService from './cronService.js';

const { Client, LocalAuth } = whatsappWeb;

class WhatsAppService {
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: PUPPETEER_OPTIONS
        });

        this.qrCodeData = null;
        this.isClientReady = false;

        this.initializeEvents();
    }

    initializeEvents() {
        this.client.on('qr', (qr) => {
            console.log('QR recibido. Guardando...');
            this.qrCodeData = qr;
            this.isClientReady = false;
        });

        this.client.on('ready', () => {
            console.log('Cliente de WhatsApp listo.');
            this.isClientReady = true;
            this.qrCodeData = null;
        });

        this.client.on('authenticated', () => {
            console.log('Sesión autenticada.');
            this.isClientReady = true;
            cronService.initialize();
        });

        // 👇 AQUÍ ESTÁ LA MAGIA DE LA DETECCIÓN DE VENTAS
        this.client.on('message', async msg => {
            // Evitamos que el bot se responda a sí mismo o procese mensajes de estado
            if (msg.fromMe || msg.isStatus) return;

            const messageBody = msg.body.toLowerCase();

            // 1. Respuesta básica de saludo (la que ya tenías)
            if (messageBody === 'hola') {
                const response = await getResponse(PROMPT_SALES);
                await msg.reply('Hola somos HayPhone, ¿en qué puedo ayudarte? 📲');
            }

            // 2. Lógica de Detección de Ventas
            // Verificamos si alguna palabra clave está en el mensaje
            const isInterested = SALES_KEYWORDS.some(keyword => messageBody.includes(keyword));

            if (isInterested) {
                console.log(`Posible venta detectada del usuario: ${msg.from}`);

                // Preparamos el mensaje para el asesor
                const alertMessage = `🚨 *Alerta de Venta YouPhone* 🚨\n\n` +
                    `El usuario +${msg.from.replace('@c.us', '')} ha dicho algo interesante:\n` +
                    `_"${msg.body}"_\n\n` +
                    `¡Contáctalo pronto!`;

                // Enviamos el mensaje al asesor
                try {
                    await this.client.sendMessage(SALES_ADVISOR_NUMBER, alertMessage);
                    console.log('Aviso enviado al asesor.');
                } catch (error) {
                    console.error('No se pudo enviar alerta al asesor:', error);
                }
            }
        });
    }

    getQrCode() {
        return {
            qrCodeData: this.qrCodeData,
            isClientReady: this.isClientReady
        };
    }

    async sendMessage(groupName, message) {
        const chats = await this.client.getChats();
        const group = chats.find(chat => chat.isGroup && chat.name === groupName);

        if (!group) {
            throw new Error(`Grupo "${groupName}" no encontrado`);
        }

        await group.sendMessage(message);
        return true;
    }

    initialize() {
        this.client.initialize();
    }
}

export default new WhatsAppService();