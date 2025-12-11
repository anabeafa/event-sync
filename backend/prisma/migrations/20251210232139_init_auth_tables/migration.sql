-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isOrganizador" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataHora" DATETIME NOT NULL,
    "local" TEXT NOT NULL,
    "capacidadeMax" INTEGER NOT NULL,
    "organizadorId" TEXT NOT NULL,
    CONSTRAINT "Evento_organizadorId_fkey" FOREIGN KEY ("organizadorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inscricao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataInscricao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "usuarioId" TEXT NOT NULL,
    "eventoId" TEXT NOT NULL,
    CONSTRAINT "Inscricao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inscricao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Certificado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigoValidacao" TEXT NOT NULL,
    "dataEmissao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Certificado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Inscricao_usuarioId_eventoId_key" ON "Inscricao"("usuarioId", "eventoId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificado_codigoValidacao_key" ON "Certificado"("codigoValidacao");
