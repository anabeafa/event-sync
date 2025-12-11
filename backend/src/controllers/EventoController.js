// backend/src/controllers/EventoController.js

import { EventoService } from '../application/EventoService.js';

export class EventoController {
    
    constructor(eventoService) {
        if (!(eventoService instanceof EventoService)) {
            throw new Error("EventoController requer uma instância válida de EventoService.");
        }
        this.eventoService = eventoService;
    }

    // [GET] /api/eventos - Feed de Eventos Públicos
    async listPublicEvents(req, res) {
        try {
            const eventos = await this.eventoService.getPublicEvents();
            return res.status(200).json(eventos);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar feed de eventos.", error: error.message });
        }
    }

    // [GET] /api/eventos/meus - Listar Eventos do Organizador
    async listOrganizerEvents(req, res) {
        const organizadorId = req.user.id; // ID vem do JWT/Middleware
        try {
            const eventos = await this.eventoService.getOrganizerEvents(organizadorId);
            return res.status(200).json(eventos);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar seus eventos.", error: error.message });
        }
    }

    // [POST] /api/eventos - Criar Novo Evento
    async createEvent(req, res) {
        const eventData = req.body;
        eventData.organizadorId = req.user.id; // ID do organizador logado

        try {
            const novoEvento = await this.eventoService.createEvent(eventData);
            return res.status(201).json(novoEvento);
        } catch (error) {
            return res.status(400).json({ message: "Dados inválidos para criação do evento.", error: error.message });
        }
    }

    // [GET] /api/eventos/:id - Detalhes do Evento
    async getEventDetails(req, res) {
        const { id } = req.params;
        
        try {
            const evento = await this.eventoService.getEventDetails(id);
            
            // Regra básica: O usuário logado pode ver o evento, senão só se for 'publicado'
            if (evento.status !== 'publicado' && (!req.user || evento.organizadorId !== req.user.id)) {
                 return res.status(404).json({ message: "Evento não encontrado ou indisponível." });
            }
            
            return res.status(200).json(evento);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
    
    // [PATCH] /api/eventos/:id - Edição de Detalhes
    async updateEventDetails(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const organizadorId = req.user.id;

        try {
            const eventoAtualizado = await this.eventoService.updateEventDetails(id, organizadorId, dadosAtualizados);
            return res.status(200).json({ 
                message: "Detalhes do evento atualizados com sucesso.",
                evento: eventoAtualizado
            });
        } catch (error) {
            const statusCode = error.message.includes('Acesso negado') ? 403 : 404;
            return res.status(statusCode).json({ message: error.message });
        }
    }

    // [PATCH] /api/eventos/:id/configurar-certificado - Configuração de Certificado
    async configurarCertificado(req, res) {
        const { id } = req.params;
        const configData = req.body;
        const organizadorId = req.user.id;

        if (!configData.templateUrl || !configData.horasDuracao) {
            return res.status(400).json({ message: "Dados de configuração de certificado incompletos." });
        }

        try {
            const config = await this.eventoService.updateCertificadoConfig(id, organizadorId, configData);
            return res.status(200).json({
                message: "Configuração de certificado salva com sucesso.",
                config: config
            });
        } catch (error) {
             const statusCode = error.message.includes('Acesso negado') ? 403 : 404;
             return res.status(statusCode).json({ message: error.message });
        }
    }
}