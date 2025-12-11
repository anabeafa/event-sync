// backend/src/application/InscricaoService.js

import prisma from '../prisma.js';

export class InscricaoService {

    // Lógica do Participante: Realiza a inscrição
    async inscrever(participanteId, eventoId) {
        const existingInscricao = await prisma.inscricao.findUnique({
            where: {
                participanteId_eventoId: {
                    participanteId: participanteId,
                    eventoId: eventoId,
                }
            }
        });

        if (existingInscricao) {
            throw new Error("Você já está inscrito neste evento.");
        }

        const evento = await prisma.evento.findUnique({
            where: { id: eventoId },
            select: { vagasDisponiveis: true, titulo: true }
        });

        if (!evento || evento.vagasDisponiveis <= 0) {
            throw new Error(`Evento não encontrado ou vagas esgotadas.`);
        }

        // Transação: Cria inscrição e decrementa vagas
        return prisma.$transaction(async (tx) => {
            const inscricao = await tx.inscricao.create({
                data: {
                    participanteId: participanteId,
                    eventoId: eventoId,
                    status: 'pendente',
                }
            });

            await tx.evento.update({
                where: { id: eventoId },
                data: {
                    vagasDisponiveis: { decrement: 1 }
                }
            });
            return inscricao;
        });
    }

    // Lógica do Participante: Lista minhas inscrições
    async getMinhasInscricoes(participanteId) {
        return prisma.inscricao.findMany({
            where: { participanteId },
            include: { evento: { select: { titulo: true, data: true, local: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }

    // Lógica do Participante: Cancela a inscrição
    async cancelarInscricao(inscricaoId, participanteId) {
        const inscricao = await prisma.inscricao.findUnique({
            where: { id: inscricaoId },
            select: { participanteId: true, eventoId: true, status: true }
        });

        if (!inscricao || inscricao.participanteId !== participanteId || inscricao.status === 'cancelada') {
            throw new Error("Inscrição inválida ou não autorizada.");
        }
        
        // Transação: Atualiza status e incrementa vagas
        return prisma.$transaction(async (tx) => {
            const cancelled = await tx.inscricao.update({
                where: { id: inscricaoId },
                data: { status: 'cancelada' }
            });

            await tx.evento.update({
                where: { id: inscricao.eventoId },
                data: { vagasDisponiveis: { increment: 1 } }
            });

            return cancelled;
        });
    }
    
    // Lógica do Organizador: Atualiza o status
    async updateStatus(inscricaoId, organizadorId, novoStatus) {
        const inscricao = await prisma.inscricao.findUnique({
            where: { id: inscricaoId },
            include: { evento: { select: { organizadorId: true } } }
        });

        if (!inscricao || inscricao.evento.organizadorId !== organizadorId) {
            throw new Error("Não autorizado a alterar o status desta inscrição.");
        }
        // ... (validação de status)
        
        return prisma.inscricao.update({
            where: { id: inscricaoId },
            data: { status: novoStatus }
        });
    }

    // Lógica do Organizador: Lista inscrições para gestão
    async getInscricoesPorOrganizador(organizadorId) {
        const eventos = await prisma.evento.findMany({
            where: { organizadorId },
            select: { id: true, titulo: true }
        });

        const eventoIds = eventos.map(e => e.id);

        return prisma.inscricao.findMany({
            where: { eventoId: { in: eventoIds } },
            include: { participante: { select: { nome: true, email: true } }, evento: { select: { titulo: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }
}