import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client'; 

import { PrismaUserRepository } from './infra/PrismaUserRepository.js'; 


import authRoutesFactory from "./routes/auth.routes.js";
import eventRoutesFactory from "./routes/event.routes.js"; 
import inscricaoRoutesFactory from "./routes/inscricao.routes.js";
import certificadoRoutesFactory from "./routes/certificado.routes.js";

const prisma = new PrismaClient(); 

const app = express();

app.use(cors());
app.use(express.json());

async function connectDB() {
    try {
        await prisma.$connect();
        console.log("Conectado ao banco de dados (SQLite) via Prisma!");
    } catch (e) {
        console.error("Falha Crítica ao conectar ao banco de dados:", e.message);
        console.error("Verifique a DATABASE_URL no .env e o schema.prisma.");
        process.exit(1); 
    }
}

function initializeApp() {
    const userRepository = new PrismaUserRepository(prisma);
    app.get("/", (req, res) => {
        res.json({ message: "Backend EventSync funcionando!" });
    });
    app.use("/auth", authRoutesFactory(prisma, userRepository)); 
    app.use("/api/eventos", eventRoutesFactory(prisma, userRepository)); 
    app.use("/api/inscricoes", inscricaoRoutesFactory(prisma, userRepository)); 
    app.use("/api/certificados", certificadoRoutesFactory(prisma, userRepository)); 

    return app;
}

const PORT = process.env.PORT || 3000;
async function startServer() {
    await connectDB(); 
    initializeApp();
    
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`API acessível em http://localhost:${PORT}`);
    });
}

startServer();

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('\n shut down: Prisma client desconectado.');
    process.exit(0);
});
