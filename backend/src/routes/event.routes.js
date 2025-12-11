// backend/src/routes/event.routes.js

import { Router } from 'express';

// Importações DDD
import { PrismaEventRepository } from '../repositories/PrismaEventRepository.js';
import { EventService } from '../application/EventService.js';
import { EventController } from '../controllers/EventController.js';

// Importação dos seus Middlewares
import { protect, isOrganizador } from '../middlewares/authMiddleware.js'; 

/**
 * Função Factory que cria as rotas de evento, recebendo o prisma e o userRepository
 * por injeção de dependência.
 */
export default function eventRoutesFactory(prisma, userRepository) {
    
    // =========================================================
    // 🛑 INJEÇÃO DE DEPENDÊNCIA (Criando as instâncias)
    // =========================================================
    
    // 1. Repositório: Recebe o Prisma
    const eventRepository = new PrismaEventRepository(prisma);

    // 2. Serviço: Recebe o Repositório
    const eventService = new EventService(eventRepository);

    // 3. Controller: Recebe o Serviço
    const eventController = new EventController(eventService);
    
    // =========================================================
    // DEFINIÇÃO DAS ROTAS
    // =========================================================
    
    const router = Router();

    // Rota de Criação de Evento:
    // 1. protect: Verifica se está logado e injeta req.user
    // 2. isOrganizador: Verifica se req.user.isOrganizador é true
    // 3. eventController.create: Executa a lógica
    router.post(
        '/', 
        protect, 
        isOrganizador, 
        (req, res) => eventController.create(req, res)
    );

    // Futuras rotas:
    // router.get('/', protect, (req, res) => eventController.listAll(req, res));
    // router.get('/:id', (req, res) => eventController.getDetails(req, res));

    return router;
}