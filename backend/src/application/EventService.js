// backend/src/application/EventService.js

import { Evento } from '../domain/Evento.js'; 

export class EventService {
    
    // Recebe o EventRepository por injeção
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * Cria um novo evento, com validações de dados.
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
    
    /**
     * 🛑 NOVA FUNÇÃO: Registra a inscrição de um participante em um evento.
     * Usa 'usuarioId' para corresponder ao seu schema.prisma.
     */
    async enrollParticipant(usuarioId, eventoId) {
        
        // 1. REGRA DE NEGÓCIO: Verificar se o usuário já está inscrito.
        // O Repositório cuida da busca pela chave composta (usuarioId + eventoId)
        const alreadyEnrolled = await this.eventRepository.findEnrollment(usuarioId, eventoId);
        
        if (alreadyEnrolled) {
            // Se o Repositório encontrar, significa que a inscrição já existe.
            throw new Error("Você já está inscrito(a) neste evento.");
        }

        // 2. Criação do Objeto de Inscrição (Enrollment)
        const enrollmentData = {
            usuarioId, // Nome do campo conforme seu schema.prisma
            eventoId,  // Nome do campo conforme seu schema.prisma
            status: 'PENDENTE', // Usando 'PENDENTE' como padrão do seu schema
        };
        
        // 3. Salvar no Repositório
        const enrollment = await this.eventRepository.createEnrollment(enrollmentData);
        
        return enrollment;
    }
}