// backend/src/controllers/CertificadoController.js

import { CertificadoService } from '../application/CertificadoService.js';

export class CertificadoController {
    
    constructor(certificadoService) {
        if (!(certificadoService instanceof CertificadoService)) {
            throw new Error("CertificadoController requer uma instância válida de CertificadoService.");
        }
        this.certificadoService = certificadoService;
    }

    // [GET] /api/certificados/meus - Listar Meus Certificados
    async getMeusCertificados(req, res) {
        const participanteId = req.user.id;
        try {
            const certificados = await this.certificadoService.getCertificadosPorParticipante(participanteId);
            
            // Formata a resposta para o Front-end
            const response = certificados.map(c => ({
                id: c.id,
                codigoVerificacao: c.codigoVerificacao,
                dataEmissao: c.dataEmissao,
                evento: c.inscricao.evento.titulo,
                eventoData: c.inscricao.evento.data,
                linkDownload: `/api/certificados/download/${c.codigoVerificacao}` 
            }));

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar seus certificados.", error: error.message });
        }
    }

    // [GET] /api/certificados/verificar/:codigo - Verificação Pública
    async verificarCertificado(req, res) {
        const { codigo } = req.params;
        
        try {
            const dadosCertificado = await this.certificadoService.getCertificadoPorCodigo(codigo);
            return res.status(200).json({
                message: "Certificado encontrado e validado.",
                certificado: dadosCertificado
            });
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
    
    // [GET] /api/certificados/download/:codigo - Download (Simulação)
    async downloadCertificado(req, res) {
         const { codigo } = req.params;
         
         try {
             await this.certificadoService.getCertificadoPorCodigo(codigo); // Verifica se é válido
             
             // Em produção, a lógica de geração de PDF estaria aqui.
             return res.status(200).json({ message: `Simulação: O certificado ${codigo} seria gerado e baixado em PDF aqui.`, codigo });
             
         } catch(error) {
             return res.status(404).json({ message: error.message });
         }
    }
}