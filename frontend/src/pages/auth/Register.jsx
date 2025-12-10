import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";
import "../../styles/register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", form);
      alert("Conta criada com sucesso!");
      console.log(response.data);
    } catch (error) {
      alert("Erro ao registrar.");
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Criar Conta</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Registrar</button>
        </form>

        <p className="link-text">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
