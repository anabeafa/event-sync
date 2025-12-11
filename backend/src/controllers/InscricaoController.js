// backend/src/controllers/InscricaoController.js

import { InscricaoService } from '../application/InscricaoService.js';

export class InscricaoController {

    constructor(inscricaoService) {
        if (!(inscricaoService instanceof InscricaoService)) {
            throw new Error("InscricaoController requer uma instância válida de InscricaoService.");
        }
        this.inscricaoService = inscricaoService;
    }

    // [POST] /api/inscricoes - Inscrever
    async inscrever(req, res) {
        const participanteId = req.user.id; 
        const { eventoId } = req.body;

        try {
            const novaInscricao = await this.inscricaoService.inscrever(participanteId, eventoId);
            return res.status(201).json({ 
                message: "Inscrição realizada com sucesso!",
                inscricao: novaInscricao 
            });
        } catch (error) {
            const status = error.message.includes('vagas') || error.message.includes('já está inscrito') ? 409 : 400;
            return res.status(status).json({ message: error.message });
        }
    }

    // [GET] /api/inscricoes/minhas - Listar Minhas Inscrições
    async getMinhasInscricoes(req, res) {
        const participanteId = req.user.id;
        try {
            const inscricoes = await this.inscricaoService.getMinhasInscricoes(participanteId);
            return res.status(200).json(inscricoes);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar suas inscrições.", error: error.message });
        }
    }
    
    // [PATCH] /api/inscricoes/:id/cancelar - Cancelar Inscrição
    async cancelarInscricao(req, res) {
        const { id } = req.params;
        const participanteId = req.user.id;

        try {
            const inscricaoCancelada = await this.inscricaoService.cancelarInscricao(id, participanteId);
            return res.status(200).json({ 
                message: "Inscrição cancelada com sucesso. A vaga foi liberada.",
                inscricao: inscricaoCancelada 
            });
        } catch (error) {
            const statusCode = error.message.includes('Acesso negado') ? 403 : 404;
            return res.status(statusCode).json({ message: error.message });
        }
    }

    // [GET] /api/inscricoes/gerenciar - Listar Inscrições para o Organizador
    async getInscricoesParaOrganizador(req, res) {
        const organizadorId = req.user.id;
        try {
            const inscricoes = await this.inscricaoService.getInscricoesPorOrganizador(organizadorId);
            return res.status(200).json(inscricoes);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar inscrições para gestão.", error: error.message });
        }
    }

    // [PATCH] /api/inscricoes/:id/status - Atualizar Status (Organizador)
    async updateStatus(req, res) {
        const organizadorId = req.user.id;
        const { id } = req.params;
        const { status } = req.body;

        try {
            const updatedInscricao = await this.inscricaoService.updateStatus(id, organizadorId, status);
            return res.status(200).json({ 
                message: `Status da inscrição ${id} atualizado para ${status}.`,
                inscricao: updatedInscricao
            });
        } catch (error) {
             const statusCode = error.message.includes('não autorizado') ? 403 : 404;
             return res.status(statusCode).json({ message: error.message });
        }
    }
}