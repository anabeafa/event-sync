import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_secreto_e_longo";

export class AuthService {
    constructor(userRepository) {
      
        this.userRepository = userRepository;
    }

    /**
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @param {boolean} isOrganizador 
     * @returns {object} 
     */
    async register(name, email, password, isOrganizador = false) {
        const userExists = await this.userRepository.findByEmail(email);
        if (userExists) {
        
            throw new Error("E-mail já está em uso.");
        }


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            isOrganizador: isOrganizador, 
        });
        
        return { 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            isOrganizador: user.isOrganizador 
        };
    }

    /**
     * @param {string} email 
     * @param {string} password 
     * @returns {object} 
     */
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Credenciais inválidas."); 
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Credenciais inválidas.");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, isOrganizador: user.isOrganizador }, 
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return {
            token,
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                isOrganizador: user.isOrganizador 
            },
        };
    }
}