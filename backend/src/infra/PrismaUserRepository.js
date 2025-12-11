// backend/src/infra/PrismaUserRepository.js

import { UserRepository } from '../domain/UserRepository.js'; 
import { Usuario } from '../domain/Usuario.js';

/**
 * Implementação do UserRepository usando o Prisma ORM.
 */
export class PrismaUserRepository extends UserRepository {

    // CORRIGIDO: Chamar super() e receber a instância do Prisma
    constructor(prismaInstance) {
        super(); 
        this.prisma = prismaInstance; 
    }
    
    // ----------------------------------------------------
    // CONVERSÃO DE DADOS (PRISMA -> DOMÍNIO)
    // ----------------------------------------------------
    toDomain(prismaUser) {
        if (!prismaUser) return null;
        
        return new Usuario(
            prismaUser.id,
            prismaUser.email,
            prismaUser.name,    
            prismaUser.password, 
            prismaUser.isOrganizador
        );
    }
    
    // ----------------------------------------------------
    // MÉTODOS DE REPOSITÓRIO
    // ----------------------------------------------------
    
    /**
     * Cria um novo usuário no banco de dados.
     */
    async create(userData) {
        // Usando this.prisma
        const prismaUser = await this.prisma.usuario.create({
            data: {
                email: userData.email,
                name: userData.name,       
                password: userData.password, 
                isOrganizador: userData.isOrganizador || false,
            },
        });

        return this.toDomain(prismaUser);
    }
    
    /**
     * Busca um usuário pelo email.
     */
    async findByEmail(email) {
        // 🛑 USANDO this.prisma
        const prismaUser = await this.prisma.usuario.findUnique({
            where: { email },
        });

        return this.toDomain(prismaUser);
    }
    
    /**
     * Busca um usuário pelo ID.
     */
    async findById(id) {
        // USANDO this.prisma
        const prismaUser = await this.prisma.usuario.findUnique({
            where: { id },
        });

        return this.toDomain(prismaUser);
    }
}