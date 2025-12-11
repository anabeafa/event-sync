// backend/src/controllers/EventController.js

export class EventController {
    
    // Recebe o EventService por injeção
    constructor(eventService) {
        this.eventService = eventService;
    }

    /**
     * Rota POST /api/eventos
     * Cria um novo evento (Apenas para organizadores).
     */
    async create(req, res) {
        const organizadorId = req.user.id;
        const eventData = req.body; 

        try {
            const newEvent = await this.eventService.createEvent(eventData, organizadorId);

            return res.status(201).json({
                message: "Evento criado com sucesso!",
                event: {
                    id: newEvent.id,
                    title: newEvent.title,
                    date: newEvent.date,
                    location: newEvent.location,
                }
            });
            
        } catch (error) {
            console.error("Erro ao criar evento:", error.message);
            
            if (error.message) {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
    
    /**
     * Rota POST /api/eventos/inscrever
     * Registra o usuário logado (Participante) em um evento.
     */
    async enroll(req, res) {
        // ID do usuário logado (Participante)
        const participanteId = req.user.id; 
        
        // ID do evento vindo do Front-end
        const { eventId } = req.body; 

        if (!eventId) {
            return res.status(400).json({ message: "O ID do evento é obrigatório para a inscrição." });
        }

        try {
            // 🛑 Chama a nova função no EventService para registrar a inscrição
            const enrollment = await this.eventService.enrollParticipant(participanteId, eventId);

            // Resposta de sucesso (201 Created)
            return res.status(201).json({
                message: "Inscrição realizada com sucesso!",
                enrollment: enrollment
            });
            
        } catch (error) {
            console.error("Erro ao inscrever-se no evento:", error.message);
            
            if (error.message) {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: "Erro interno do servidor ao inscrever-se." });
        }
    }
}