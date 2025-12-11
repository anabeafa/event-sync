// backend/src/application/CertificadoService.js

import prisma from '../prisma.js';

export class CertificadoService {

    // Lógica do Participante: Lista todos os certificados
    async getCertificadosPorParticipante(participanteId) {
        return prisma.certificado.findMany({
            where: { participanteId },
            include: {
                inscricao: {
                    include: {
                        evento: { 
                            select: { titulo: true, data: true, local: true } 
                        }
                    }
                }
            },
            orderBy: { dataEmissao: 'desc' }
        });
    }

    // Lógica Pública: Busca certificado por código de verificação
    async getCertificadoPorCodigo(codigoVerificacao) {
        const certificado = await prisma.certificado.findUnique({
            where: { codigoVerificacao },
            include: {
                participante: { select: { nome: true } },
                inscricao: {
                    include: {
                        evento: { 
                            select: { titulo: true, data: true, local: true } 
                        }
                    }
                }
            }
        });

        if (!certificado) {
            throw new Error("Certificado não encontrado ou inválido.");
        }

        return {
            id: certificado.id,
            codigoVerificacao: certificado.codigoVerificacao,
            dataEmissao: certificado.dataEmissao,
            status: "Válido",
            evento: certificado.inscricao.evento.titulo,
            dataEvento: certificado.inscricao.evento.data,
            participanteNome: certificado.participante.nome
        };
    }
}