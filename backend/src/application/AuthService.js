import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(name, email, password) {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) throw new Error("E-mail já está em uso.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: "Usuário registrado com sucesso!",
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado.");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Senha incorreta.");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "segredo123",
      { expiresIn: "1d" }
    );

    return {
      message: "Login realizado com sucesso!",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
