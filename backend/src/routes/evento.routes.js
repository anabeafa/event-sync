// backend/src/routes/evento.routes.js

import { Router } from 'express';
import { EventoController } from '../controllers/EventoController.js';
import { EventoService } from '../application/EventoService.js';
import { protect, isOrganizador } from '../middlewares/authMiddleware.js';

const router = Router();

// Inicialização das dependências
const eventoService = new EventoService();
const eventoController = new EventoController(eventoService);

// ==================================
// ROTAS DE EVENTOS (/api/eventos/...)
// ==================================

// Participante: Feed de Eventos Públicos (Acesso livre)
router.get('/', (req, res) => eventoController.listPublicEvents(req, res));

// Organizador: Criar Novo Evento (Protegida)
router.post('/', protect, isOrganizador, (req, res) => eventoController.createEvent(req, res));

// Organizador: Listar Eventos Próprios (Protegida)
router.get('/meus', protect, (req, res) => eventoController.listOrganizerEvents(req, res));

// Organizador: Edição de Detalhes do Evento (Protegida)
router.patch('/:id', protect, isOrganizador, (req, res) => eventoController.updateEventDetails(req, res));

// Organizador: Configuração de Certificado (Protegida)
router.patch('/:id/configurar-certificado', protect, isOrganizador, (req, res) => eventoController.configurarCertificado(req, res));

// Participante: Detalhes do Evento (Acesso livre, mas o controller verifica status)
router.get('/:id', (req, res) => eventoController.getEventDetails(req, res)); 

export default router;