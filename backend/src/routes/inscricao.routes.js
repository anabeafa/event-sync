// backend/src/routes/inscricao.routes.js

import { Router } from 'express';
// Assumindo que você tem uma classe base para o Repositório de Inscrição
import { PrismaInscricaoRepository } from '../repositories/PrismaInscricaoRepository.js'; 
import { InscricaoController } from '../controllers/InscricaoController.js';
import { InscricaoService } from '../application/InscricaoService.js';
import { protect, isOrganizador } from '../middlewares/authMiddleware.js';

// 🛑 EXPORTA AGORA UMA FUNÇÃO QUE RECEBE AS DEPENDÊNCIAS
export default function inscricaoRoutesFactory(prisma, userRepository) {
    
    // 1. Instanciar o Repositório com o Prisma
    const inscricaoRepository = new PrismaInscricaoRepository(prisma);

    // 2. Instanciar o Serviço com o Repositório
    const inscricaoService = new InscricaoService(inscricaoRepository);

    // 3. Instanciar o Controller com o Serviço
    const inscricaoController = new InscricaoController(inscricaoService);

    const router = Router();

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

    // 🛑 RETORNA O ROUTER
    return router;
}