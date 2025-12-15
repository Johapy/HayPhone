import QRCode from 'qrcode';
import whatsappService from '../services/whatsappService.js';

export const getLinkQr = async (req, res) => {
    const { qrCodeData, isClientReady } = whatsappService.getQrCode();

    if (isClientReady) {
        return res.send(`
            <html>
                <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                    <h1 style="color: green;">¡WhatsApp está conectado!</h1>
                </body>
            </html>
        `);
    }

    if (!qrCodeData) {
        return res.send(`
            <html>
                <meta http-equiv="refresh" content="2">
                <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                    <h1>Cargando cliente...</h1>
                </body>
            </html>
        `);
    }

    try {
        const qrImage = await QRCode.toDataURL(qrCodeData);
        res.send(`
            <html>
                <meta http-equiv="refresh" content="20">
                <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                    <h1>Escanea para iniciar sesión</h1>
                    <img src="${qrImage}" alt="QR Code"/>
                </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send('Error generando QR');
    }
};

export const sendMessage = async (req, res) => {
    const { groupName, message } = req.body;

    if (!groupName || !message) {
        return res.status(400).json({ status: 'error', message: 'Faltan parámetros' });
    }

    try {
        await whatsappService.sendMessage(groupName, message);
        res.json({ status: 'success', message: 'Mensaje enviado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};