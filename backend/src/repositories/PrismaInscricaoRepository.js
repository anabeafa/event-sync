// backend/src/repositories/PrismaInscricaoRepository.js

/**
 * Repositório que implementa as operações de dados para Inscrições,
 * utilizando o Prisma Client para interagir com o banco de dados.
 */
export class PrismaInscricaoRepository { 
    // O construtor recebe a instância do Prisma Client
    constructor(prismaInstance) {
        this.prisma = prismaInstance;
    }

    // Você irá adicionar os métodos de CRUD aqui, como:
    /*
    async create(data) {
        return this.prisma.inscricao.create({ data });
    }
    
    async findById(id) {
        return this.prisma.inscricao.findUnique({ where: { id } });
    }
    */
}