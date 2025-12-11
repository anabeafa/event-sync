// backend/src/repositories/PrismaEventRepository.js 

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
                    // Mapeamentos de campos de dados:
                    titulo: title,        
                    dataHora: date,       
                    local: location,      
                    descricao: description, 
                    organizadorId: organizadorId,
                    
                    // Campos obrigatórios que precisam de valor:
                    capacidadeMax: 1000, 
                    
                    // 🛑 REMOVIDO: O campo 'status' foi removido porque o Prisma o rejeitou.
                    // O Prisma deve aplicar o valor padrão (ex: 'AGENDADO') automaticamente.
                },
            });

            return this.toDomain(prismaEvent);
        } catch (error) {
            console.error("ERRO CRÍTICO NO REPOSITÓRIO:", error);
            throw new Error(error.message || "Falha ao salvar evento no banco de dados.");
        }
    }
}