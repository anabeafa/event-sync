import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/login.css";
import { login } from "../../services/authService"; 

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(""); 
  
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setError(""); 

    try {
   
      const data = await login(form.email, form.password);
      
      if (data && data.user && data.user.isOrganizador) {

        navigate("/organizador/criarevento"); 
      } else {
        navigate("/"); 
      }

    } catch (err) {
      console.error("Erro no login:", err);
      setError(err.message || "Falha ao conectar. Tente novamente."); 
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>} 
        
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