import { EventRepository } from '../domain/EventRepository.js'; 
import { Evento } from '../domain/Evento.js'; 

export class PrismaEventRepository extends EventRepository {

    constructor(prismaInstance) {
        super(); 
        this.prisma = prismaInstance; 
    }

    toDomain(prismaEvent) {
        if (!prismaEvent) return null;
        
        return new Evento(
            prismaEvent.id,
            prismaEvent.titulo,  
            prismaEvent.descricao, 
            prismaEvent.dataHora, 
            prismaEvent.local,    
            prismaEvent.organizadorId,
            prismaEvent.capacidadeMax
        );
    }
    
    async create(eventData) {
        const { title, description, date, location, organizadorId } = eventData; 

        try {
            const prismaEvent = await this.prisma.evento.create({
                data: {
                    titulo: title,      
                    dataHora: date,      
                    local: location,      
                    descricao: description, 
                    organizadorId: organizadorId,
                    capacidadeMax: 1000, 
                },
            });

            return this.toDomain(prismaEvent);
        } catch (error) {
            console.error("ERRO CRÍTICO NO REPOSITÓRIO:", error);
            throw new Error(error.message || "Falha ao salvar evento no banco de dados.");
        }
    }
  
    async findEnrollment(usuarioId, eventoId) { 
        const enrollment = await this.prisma.inscricao.findUnique({
            where: {
                usuarioId_eventoId: { 
                    usuarioId: usuarioId,
                    eventoId: eventoId,
                }
            },
        });
        
        return enrollment; 
    }

    async createEnrollment(enrollmentData) {
        const { usuarioId, eventoId, status } = enrollmentData;
        
        try {
            const newEnrollment = await this.prisma.inscricao.create({
                data: {
                    usuarioId: usuarioId,
                    eventoId: eventoId,
                    status: status, 
                },
            });

            return newEnrollment;
        } catch (error) {
            if (error.code === 'P2002') { 
                throw new Error("Você já está inscrito(a) neste evento.");
            }
            console.error("ERRO CRÍTICO ao criar inscrição:", error);
            throw new Error("Falha ao registrar inscrição no banco de dados.");
        }
    }
}