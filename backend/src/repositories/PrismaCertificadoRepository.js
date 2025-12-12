// backend/src/repositories/PrismaCertificadoRepository.js

/**
 * Repositório que implementa as operações de dados para Certificados,
 * utilizando o Prisma Client para interagir com o banco de dados.
 */
export class PrismaCertificadoRepository {
    // O construtor recebe a instância do Prisma Client
    constructor(prismaInstance) {
        this.prisma = prismaInstance;
    }

    // Você irá adicionar os métodos de CRUD aqui, como:
    /*
    async generate(data) {
        return this.prisma.certificado.create({ data });
    }
    
    async findByUserAndEvent(userId, eventId) {
        return this.prisma.certificado.findUnique({ 
            where: { 
                userId_eventId: { userId, eventId } 
            } 
        });
    }
    */
}