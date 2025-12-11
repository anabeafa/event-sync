// backend/src/domain/Usuario.js

/**
 * Entidade de Domínio que representa um Usuário (Participante ou Organizador).
 * Regras e validações de negócio sobre o Usuário devem viver aqui.
 */
export class Usuario {
    
    /**
     * @param {string} id - ID do usuário (geralmente gerado pelo banco de dados).
     * @param {string} email
     * @param {string} name
     * @param {string} password - Senha JÁ HASHADA.
     * @param {boolean} isOrganizador
     */
    constructor(id, email, name, password, isOrganizador = false) {
        if (!email || !name || !password) {
            throw new Error("Dados essenciais do usuário (nome, email, senha) são obrigatórios.");
        }
        
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password; // Senha já deve estar hashada pelo AuthService
        this.isOrganizador = isOrganizador;
    }

    // Métodos de negócio podem ser adicionados aqui (ex: mudarSenha, promoverAOrganizador)
}