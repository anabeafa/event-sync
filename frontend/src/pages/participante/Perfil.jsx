import "../../styles/participante.css";
import { useState } from "react";

export default function Perfil() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="perfil-container">
      <h1 className="titulo">Seu Perfil</h1>

      <form className="perfil-form" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Telefone</label>
        <input
          type="text"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
        />

        <button type="submit" className="btn-salvar">Salvar alterações</button>
      </form>
    </div>
  );
}