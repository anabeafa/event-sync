// backend/src/routes/inscricao.routes.js

import { Router } from 'express';
import { InscricaoController } from '../controllers/InscricaoController.js';
import { InscricaoService } from '../application/InscricaoService.js';
import { protect, isOrganizador } from '../middlewares/authMiddleware.js';

const router = Router();

// Inicialização das dependências
const inscricaoService = new InscricaoService();
const inscricaoController = new InscricaoController(inscricaoService);

// ==================================
// ROTAS DE INSCRIÇÕES (/api/inscricoes/...)
// ==================================

// Participante: Inscrição em um Evento
router.post('/', protect, (req, res) => inscricaoController.inscrever(req, res));

// Participante: Listar Minhas Inscrições
router.get('/minhas', protect, (req, res) => inscricaoController.getMinhasInscricoes(req, res));

// Participante: Cancelar Minha Inscrição
router.patch('/:id/cancelar', protect, (req, res) => inscricaoController.cancelarInscricao(req, res));

// Organizador: Listar Inscrições para Gestão
router.get('/gerenciar', protect, isOrganizador, (req, res) => inscricaoController.getInscricoesParaOrganizador(req, res));

// Organizador: Atualizar Status da Inscrição
router.patch('/:id/status', protect, isOrganizador, (req, res) => inscricaoController.updateStatus(req, res));


export default router;