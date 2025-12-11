// backend/src/domain/EventRepository.js

/**
 * Interface/Contrato Abstrato para o repositório de Eventos.
 * Define quais operações devem ser implementadas.
 */
export class EventRepository {
    async create(eventData) {
        throw new Error("Method 'create' must be implemented.");
    }

    async findById(id) {
        throw new Error("Method 'findById' must be implemented.");
    }
    
    // Futuras operações (list, update, delete)
}