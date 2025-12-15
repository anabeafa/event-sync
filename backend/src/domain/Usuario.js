export class Usuario {
    
    /**
     * @param {string} id 
     * @param {string} email
     * @param {string} name
     * @param {string} password 
     * @param {boolean} isOrganizador
     */
    constructor(id, email, name, password, isOrganizador = false) {
        if (!email || !name || !password) {
            throw new Error("Dados essenciais do usuário (nome, email, senha) são obrigatórios.");
        }
        
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password; 
        this.isOrganizador = isOrganizador;
    }

}