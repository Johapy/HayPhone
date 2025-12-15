import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: 'sk-4ab0f219ae3c495f853af266e934c59e',
    baseURL: 'https://api.deepseek.com',
});

/**
 * Obtiene una respuesta de la IA (SIN MEMORIA).
 * @param {string} promptTemplate - La plantilla del prompt (personalidad).
 * @param {string} userId - (No utilizado, se mantiene por compatibilidad si lo envías).
 * @param {string} userMessage - El mensaje actual del usuario.
 * @returns {Promise<string>} - La respuesta generada por la IA.
 */
async function getResponse(promptTemplate) {

    try {

        // --- CAMBIO PRINCIPAL: Estructura sin historial ---
        // Solo mandamos el System Prompt y el mensaje actual.
        const messages = [
            {
                role: 'system',
                content: promptTemplate
            }
        ];

        const response = await openai.chat.completions.create({
            model: 'deepseek-chat',
            messages: messages,
        });

        const botReply = response.choices[0].message.content;

        // --- NOTA: Se eliminaron las funciones appendToMemory aquí ---

        return botReply;

    } catch (error) {
        console.error('Error en getResponse:', error);
        return 'Lo siento, tuve un problema para procesar tu solicitud.';
    }
}

export { getResponse };