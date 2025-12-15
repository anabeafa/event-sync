

import { useNavigate, Link } from "react-router-dom"; 
import { useState } from "react";
import "../../styles/register.css"; 
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
      const response = await login(form.email, form.password);
      
      alert(response.message || "Login realizado com sucesso!");
      
    
      const userRole = response.user.role ? response.user.role.toUpperCase() : '';
      
      if (userRole === 'ORGANIZADOR') {
    
        navigate("/organizador/criarevento"); 
      } else {

        navigate("/home"); 
      }

    } catch (err) {
      console.error("Erro ao logar:", err);
      setError(err.message || "Credenciais inválidas ou erro ao entrar."); 
    }
  };

  return (
    <div className="split-container"> 
      
 
      <div className="left-panel">
        <h1 className="main-title">EVENTSYNC</h1>

        <h2 className="subtitle" style={{ color: 'white' }}>Entre e Gerencie Seus Eventos.</h2>
        
        <div className="decoration-line"></div>
      </div>

      <div className="right-panel">
        <div className="register-card">
          <h2>Acesso à Conta</h2>
          
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            
            <input 
              type="email" 
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input 
              type="password"
              name="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Entrar</button>
          </form>

          <p className="link-text">
            Não tem conta? <Link to="/register">Criar Conta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}