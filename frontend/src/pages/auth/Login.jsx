import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/login.css";



export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode validar o login, chamar API etc.
    // Se estiver tudo certo → redireciona para a Home do participante.
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          type="email" 
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Senha</label>
        <input 
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
