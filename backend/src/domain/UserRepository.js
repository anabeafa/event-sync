// backend/src/domain/UserRepository.js

/**
 * Interface que define as operações básicas do repositório de Usuários.
 * Qualquer implementação de persistência (Prisma, MongoDB, MySQL, etc.) deve
 * herdar desta classe e implementar estes métodos.
 */
export class UserRepository {
    
    /**
     * Cria um novo usuário.
     * @param {Object} userData - Dados a serem salvos (deve ser um Objeto com nome, email, password, isOrganizador).
     * @returns {Promise<Usuario>} A Entidade de Domínio criada.
     */
    async create(userData) {
        // Este método deve ser implementado pela classe filha (PrismaUserRepository)
        throw new Error("O método 'create' deve ser implementado pela classe de implementação do repositório.");
    }
    
    /**
     * Busca um usuário pelo email.
     * @param {string} email
     * @returns {Promise<Usuario | null>} A Entidade de Domínio ou null.
     */
    async findByEmail(email) {
        // Este método deve ser implementado pela classe filha
        throw new Error("O método 'findByEmail' deve ser implementado pela classe de implementação do repositório.");
    }
    
    /**
     * Busca um usuário pelo ID.
     * @param {string} id
     * @returns {Promise<Usuario | null>} A Entidade de Domínio ou null.
     */
    async findById(id) {
        // Este método deve ser implementado pela classe filha
        throw new Error("O método 'findById' deve ser implementado pela classe de implementação do repositório.");
    }
}