import cron from 'node-cron';
import whatsappService from './whatsappService.js';
import { getResponse } from './aiService.js';
import { PROMPT_SALES } from '../config/config.js';

class CronService {
    initialize() {
        console.log('🕒 Servicio de Cron Jobs iniciado...');

        // Ejemplo: Tarea que se ejecuta cada minuto (para probar)
        cron.schedule('0 10,12,19 * * *', () => {
            console.log('⏰ Ejecutando tarea automática...');
            // Aquí llamaremos a whatsappService para enviar el mensaje
            this.sendDailyUpdate();
        });
    }

    async sendDailyUpdate() {
        // Lógica para enviar el mensaje a la comunidad
        const groupName = 'HayPhone Comunidad 📲';
        const response = await getResponse(PROMPT_SALES);
        await whatsappService.sendMessage(groupName, response);


        // TODO: Aquí pondremos el ID del grupo real y el mensaje
    }
}

export default new CronService();