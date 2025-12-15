import { Router } from 'express';
import { PrismaCertificadoRepository } from '../repositories/PrismaCertificadoRepository.js'; 
import { CertificadoController } from '../controllers/CertificadoController.js';
import { CertificadoService } from '../application/CertificadoService.js';
import { protect } from '../middlewares/authMiddleware.js';

export default function certificadoRoutesFactory(prisma, userRepository) {
    
    const certificadoRepository = new PrismaCertificadoRepository(prisma);

    const certificadoService = new CertificadoService(certificadoRepository);

    const certificadoController = new CertificadoController(certificadoService);
    
    const router = Router();

    router.get('/meus', protect, (req, res) => certificadoController.getMeusCertificados(req, res));

    router.get('/verificar/:codigo', (req, res) => certificadoController.verificarCertificado(req, res));

    router.get('/download/:codigo', (req, res) => certificadoController.downloadCertificado(req, res));

    return router;
}