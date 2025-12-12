// backend/src/server.js (VERSÃO FINAL OTIMIZADA E CORRIGIDA)

// 1. CARREGAMENTO DE VARIÁVEIS DE AMBIENTE (DEVE SER O PRIMEIRO)
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// 🛑 1. CORREÇÃO: Importa a CLASSE PrismaClient do pacote @prisma/client
import { PrismaClient } from '@prisma/client'; 

// Importação da classe do Repositório (Mantenha o caminho ajustado)
import { PrismaUserRepository } from './infra/PrismaUserRepository.js'; 

// Importar as factories/rotas
import authRoutesFactory from "./routes/auth.routes.js";
import eventRoutesFactory from "./routes/event.routes.js"; 
// 🛑 IMPORTAÇÕES: Assumimos que são factories e ajustamos a chamada abaixo
import inscricaoRoutesFactory from "./routes/inscricao.routes.js";
import certificadoRoutesFactory from "./routes/certificado.routes.js";


// 2. Cria a instância do Prisma
const prisma = new PrismaClient(); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 4. CONECTAR E TESTAR O BANCO DE DADOS
async function connectDB() {
    try {
        await prisma.$connect();
        console.log("Conectado ao banco de dados (SQLite) via Prisma!");
    } catch (e) {
        // O erro P1012/P1013 significa problema de conexão/schema
        console.error("Falha Crítica ao conectar ao banco de dados:", e.message);
        console.error("Verifique a DATABASE_URL no .env e o schema.prisma.");
        process.exit(1); 
    }
}

// 🛑 Configura as rotas injetando o Prisma
function initializeApp() {
    
    // Instanciar dependências globais (UserRepository)
    const userRepository = new PrismaUserRepository(prisma);

    // Rota de Teste (Raiz)
    app.get("/", (req, res) => {
        res.json({ message: "Backend EventSync funcionando!" });
    });

    // 5. USAR TODAS AS ROTAS: (E PASSAR O PRISMA)
    
    // Auth Routes: Recebe o prisma e userRepository
    app.use("/auth", authRoutesFactory(prisma, userRepository)); 

    // Event Routes: Recebe o prisma e userRepository
    // Note: o eventRoutesFactory precisa lidar com o userRepository se for usá-lo dentro do Service
    app.use("/api/eventos", eventRoutesFactory(prisma, userRepository)); 
    
    // Outras Rotas (Assumimos que as factories também precisam do prisma/userRepository)
    app.use("/api/inscricoes", inscricaoRoutesFactory(prisma, userRepository)); 
    app.use("/api/certificados", certificadoRoutesFactory(prisma, userRepository)); 

    return app;
}

const PORT = process.env.PORT || 3000;

// Iniciar o Servidor
async function startServer() {
    await connectDB(); // Conecta o banco
    initializeApp(); // Configura as rotas
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`🔗 API acessível em http://localhost:${PORT}`);
    });
}

startServer();

// Opcional: Desconectar o Prisma de forma limpa ao encerrar o processo
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('\n shut down: Prisma client desconectado.');
    process.exit(0);
});

// Remove a exportação se não for estritamente necessária
// export { prisma };