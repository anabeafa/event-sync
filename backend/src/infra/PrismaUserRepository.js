import { UserRepository } from '../domain/UserRepository.js'; 
import { Usuario } from '../domain/Usuario.js';
export class PrismaUserRepository extends UserRepository {
    constructor(prismaInstance) {
        super(); 
        this.prisma = prismaInstance; 
    }
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

    async create(userData) {
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
    
    async findByEmail(email) {

        const prismaUser = await this.prisma.usuario.findUnique({
            where: { email },
        });

        return this.toDomain(prismaUser);
    }
    
    async findById(id) {
        const prismaUser = await this.prisma.usuario.findUnique({
            where: { id },
        });

        return this.toDomain(prismaUser);
    }
}