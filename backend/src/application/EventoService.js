// backend/src/application/EventoService.js

import prisma from '../prisma.js'; // O cliente Prisma está na raiz do src

export class EventoService {
    
    // Lista eventos para o feed (somente publicados)
    async getPublicEvents() {
        return prisma.evento.findMany({
            where: { status: 'publicado' },
            orderBy: { data: 'asc' },
            include: { organizador: { select: { nome: true } } }
        });
    }

    // Lista eventos criados por um organizador
    async getOrganizerEvents(organizadorId) {
        return prisma.evento.findMany({
            where: { organizadorId },
            orderBy: { createdAt: 'desc' },
        });
    }

    // Cria um novo evento
    async createEvent(eventData) {
        // O organizadorId deve vir do token (req.user.id)
        const novoEvento = await prisma.evento.create({
            data: {
                ...eventData,
                data: new Date(eventData.data),
                vagasDisponiveis: parseInt(eventData.vagasDisponiveis),
                preco: parseFloat(eventData.preco) || 0,
            }
        });
        return novoEvento;
    }
    
    // Obter detalhes de um evento específico
    async getEventDetails(eventId) {
        const evento = await prisma.evento.findUnique({
            where: { id: eventId },
            include: { organizador: { select: { nome: true, email: true } } }
        });

        if (!evento) {
            throw new Error('Evento não encontrado.');
        }

        return evento;
    }
    
    // [PATCH] Atualiza os detalhes básicos de um evento.
    async updateEventDetails(eventoId, organizadorId, dadosAtualizados) {
        const evento = await this.verifyOwnership(eventoId, organizadorId);

        return prisma.evento.update({
            where: { id: eventoId },
            data: {
                ...dadosAtualizados,
                data: dadosAtualizados.data ? new Date(dadosAtualizados.data) : undefined, 
                preco: dadosAtualizados.preco ? parseFloat(dadosAtualizados.preco) : undefined,
                vagasDisponiveis: dadosAtualizados.vagasDisponiveis ? parseInt(dadosAtualizados.vagasDisponiveis) : undefined
            }
        });
    }

    // Método auxiliar para verificar se o usuário é o dono do evento
    async verifyOwnership(eventoId, organizadorId) {
        const evento = await prisma.evento.findUnique({
            where: { id: eventoId },
            select: { organizadorId: true }
        });

        if (!evento) {
            throw new Error("Evento não encontrado.");
        }
        if (evento.organizadorId !== organizadorId) {
            throw new Error("Acesso negado. Você não é o organizador deste evento.");
        }
        return evento;
    }
}