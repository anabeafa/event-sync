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
        // O req.user foi injetado pelo seu middleware 'protect'
        const organizadorId = req.user.id;
        const eventData = req.body; 

        try {
            const newEvent = await this.eventService.createEvent(eventData, organizadorId);

            // Resposta de sucesso (201 Created)
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
            
            // 🛑 CORREÇÃO: Tratar qualquer erro de lógica/repositório vindo do Service como 400, 
            // e mostrar a mensagem de erro exata (incluindo o erro do Prisma)
            if (error.message) {
                // Se for um erro vindo do EventService/Prisma, trate como 400 Bad Request.
                // Isso inclui erros de campo obrigatório, data no passado, etc.
                // Isso vai forçar a mensagem "Argument X is missing" a aparecer no Front-end.
                return res.status(400).json({ message: error.message });
            }
            
            // 500 Erro Interno do Servidor (apenas para falhas não previstas)
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
    
    // Futuros métodos: listAll, getDetails
}