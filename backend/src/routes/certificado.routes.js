// backend/src/routes/certificado.routes.js

import { Router } from 'express';
// Assumindo um repositório de certificado
import { PrismaCertificadoRepository } from '../repositories/PrismaCertificadoRepository.js'; 
import { CertificadoController } from '../controllers/CertificadoController.js';
import { CertificadoService } from '../application/CertificadoService.js';
import { protect } from '../middlewares/authMiddleware.js';

// 🛑 EXPORTA AGORA UMA FUNÇÃO QUE RECEBE AS DEPENDÊNCIAS
export default function certificadoRoutesFactory(prisma, userRepository) {
    
    // 1. Instanciar o Repositório com o Prisma
    const certificadoRepository = new PrismaCertificadoRepository(prisma);

    // 2. Instanciar o Serviço com o Repositório
    const certificadoService = new CertificadoService(certificadoRepository);

    // 3. Instanciar o Controller com o Serviço
    const certificadoController = new CertificadoController(certificadoService);
    
    const router = Router();

    // ==================================
    // ROTAS DE CERTIFICADOS (/api/certificados/...)
    // ==================================

    // Participante: Listar Meus Certificados (Protegida)
    router.get('/meus', protect, (req, res) => certificadoController.getMeusCertificados(req, res));

    // Público: Rota de Verificação
    router.get('/verificar/:codigo', (req, res) => certificadoController.verificarCertificado(req, res));

    // Público: Rota de Download (Simulação)
    router.get('/download/:codigo', (req, res) => certificadoController.downloadCertificado(req, res));

    // 🛑 RETORNA O ROUTER
    return router;
}