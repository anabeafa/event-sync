import { Router } from 'express';
import { EventoController } from '../controllers/EventoController.js';
import { EventoService } from '../application/EventoService.js';
import { protect, isOrganizador } from '../middlewares/authMiddleware.js';

const router = Router();

const eventoService = new EventoService();
const eventoController = new EventoController(eventoService);

router.get('/', (req, res) => eventoController.listPublicEvents(req, res));

router.post('/', protect, isOrganizador, (req, res) => eventoController.createEvent(req, res));

router.get('/meus', protect, (req, res) => eventoController.listOrganizerEvents(req, res));

router.patch('/:id', protect, isOrganizador, (req, res) => eventoController.updateEventDetails(req, res));

router.patch('/:id/configurar-certificado', protect, isOrganizador, (req, res) => eventoController.configurarCertificado(req, res));

router.get('/:id', (req, res) => eventoController.getEventDetails(req, res)); 

export default router;