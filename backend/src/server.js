// backend/src/server.js (VERSÃO FINAL COM CORREÇÃO DE CAMINHO)

import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";

// 1. Importa a CLASSE PrismaClient
import PrismaClient from "./prisma.js"; 

// 2. Cria a instância do Prisma
const prisma = new PrismaClient(); 

// 🛑 CORREÇÃO DE CAMINHO: Assumindo que o repositório está em src/infra
import { PrismaUserRepository } from './infra/PrismaUserRepository.js'; 

// Importar as factories/rotas no nível superior
import authRoutesFactory from "./routes/auth.routes.js";
import eventRoutesFactory from "./routes/event.routes.js"; 
import inscricaoRoutes from "./routes/inscricao.routes.js";
import certificadoRoutes from "./routes/certificado.routes.js";


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
        console.error("Falha ao conectar ao banco de dados. Verifique a DATABASE_URL:", e.message);
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
    app.use("/api/eventos", eventRoutesFactory(prisma, userRepository)); 
    
    // Outras Rotas (Assumimos que também precisam de factories no futuro)
    app.use("/api/inscricoes", inscricaoRoutes); 
    app.use("/api/certificados", certificadoRoutes); 

    return app;
}

const PORT = process.env.PORT || 3000;

// Iniciar o Servidor
async function startServer() {
    await connectDB(); // Conecta o banco
    initializeApp(); // Configura as rotas
    
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

startServer();

// Opcional: Desconectar o Prisma
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

export { prisma };