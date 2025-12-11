// frontend/src/pages/Register.jsx 

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../../styles/register.css";
import { register } from "../../services/authService"; 

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isOrganizador: false 
  });
 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await register(
        form.name, 
        form.email, 
        form.password, 
        form.isOrganizador
      );
      
      alert(response.message || "Conta criada com sucesso! Você já está logado.");
      
      if (form.isOrganizador) {
        navigate("/organizador/criarevento"); 
      } else {
        navigate("/"); 
      }

    } catch (err) {
      console.error("Erro ao registrar:", err);
      setError(err.message || "Erro ao criar conta. Verifique seus dados."); 
    }
  };

  return (
   
    <div className="split-container"> 
      <div className="left-panel">
        <h1 className="main-title">EVENTSYNC</h1>
        <h2 className="subtitle">Gerencie e Participe dos Melhores Eventos.</h2>
        <div className="decoration-line"></div>
      </div>
      <div className="right-panel">
        <div className="register-card"> 
          <h2>Criar Conta</h2>

          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={handleChange}
              required
            />

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="isOrganizador"
                id="isOrganizador"
                checked={form.isOrganizador}
                onChange={handleChange}
              />
              <label htmlFor="isOrganizador">Sou um Organizador de Eventos</label>
            </div>

            <button type="submit">Registrar</button>
          </form>

          <p className="link-text">
            Já tem conta? <Link to="/login">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}