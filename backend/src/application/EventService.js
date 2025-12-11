// backend/src/application/EventService.js

import { Evento } from '../domain/Evento.js'; 

export class EventService {
    
    // 🛑 Recebe o EventRepository por injeção
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * Cria um novo evento, com validações de dados.
     * @param {object} data - Dados do evento (title, description, date, location).
     * @param {string} organizadorId - ID do usuário que está criando o evento.
     * @returns {Evento} - O objeto Evento criado.
     */
    async createEvent(data, organizadorId) {
        const { title, description, date, location } = data;

        // 1. Validação de Dados de Entrada
        if (!title || !description || !date || !location) {
            throw new Error("Todos os campos do evento (título, descrição, data, local) são obrigatórios.");
        }

        const eventDate = new Date(date);
        if (isNaN(eventDate)) {
            throw new Error("Formato de data e hora inválido.");
        }

        // 2. Validação de Regra de Negócio (Ex: Não permitir eventos no passado)
        if (eventDate < new Date()) {
            throw new Error("Não é possível agendar um evento para o passado.");
        }
        
        // 3. Preparar os dados para o Repositório
        const eventData = {
            title,
            description,
            date: eventDate,
            location,
            organizadorId,
        };

        // 4. Salvar no banco via Repositório
        const newEvent = await this.eventRepository.create(eventData);

        return newEvent;
    }

    // Futuros métodos: listEvents, getEventDetails, updateEvent
}