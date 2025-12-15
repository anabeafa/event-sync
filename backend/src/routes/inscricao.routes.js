import { Router } from 'express';
import { PrismaInscricaoRepository } from '../repositories/PrismaInscricaoRepository.js'; 
import { InscricaoController } from '../controllers/InscricaoController.js';
import { InscricaoService } from '../application/InscricaoService.js';
import { protect, isOrganizador } from '../middlewares/authMiddleware.js';

export default function inscricaoRoutesFactory(prisma, userRepository) {
    
    const inscricaoRepository = new PrismaInscricaoRepository(prisma);

    const inscricaoService = new InscricaoService(inscricaoRepository);

    const inscricaoController = new InscricaoController(inscricaoService);

    const router = Router();

    router.post('/', protect, (req, res) => inscricaoController.inscrever(req, res));

    router.get('/minhas', protect, (req, res) => inscricaoController.getMinhasInscricoes(req, res));

    router.patch('/:id/cancelar', protect, (req, res) => inscricaoController.cancelarInscricao(req, res));

    router.get('/gerenciar', protect, isOrganizador, (req, res) => inscricaoController.getInscricoesParaOrganizador(req, res));

    router.patch('/:id/status', protect, isOrganizador, (req, res) => inscricaoController.updateStatus(req, res));

    return router;
}