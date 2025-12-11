// backend/src/routes/certificado.routes.js

import { Router } from 'express';
import { CertificadoController } from '../controllers/CertificadoController.js';
import { CertificadoService } from '../application/CertificadoService.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

// Inicialização das dependências
const certificadoService = new CertificadoService();
const certificadoController = new CertificadoController(certificadoService);

// ==================================
// ROTAS DE CERTIFICADOS (/api/certificados/...)
// ==================================

// Participante: Listar Meus Certificados (Protegida)
router.get('/meus', protect, (req, res) => certificadoController.getMeusCertificados(req, res));

// Público: Rota de Verificação
router.get('/verificar/:codigo', (req, res) => certificadoController.verificarCertificado(req, res));

// Público: Rota de Download (Simulação)
router.get('/download/:codigo', (req, res) => certificadoController.downloadCertificado(req, res));

export default router;