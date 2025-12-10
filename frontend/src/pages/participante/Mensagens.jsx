import "../../styles/participante.css";
import { useState } from "react";

export default function Mensagens() {
  const [mensagens, setMensagens] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");

  const enviarMensagem = (e) => {
    e.preventDefault();

    const novaMensagem = {
      id: Date.now(),
      titulo,
      corpo,
      data: new Date().toLocaleString(),
    };

    setMensagens([novaMensagem, ...mensagens]);
    setTitulo("");
    setCorpo("");
  };

  return (
    <div className="mensagens-container">
      <h1 className="titulo">Mensagens</h1>

      <form className="mensagem-form" onSubmit={enviarMensagem}>
        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Assunto da mensagem"
          required
        />

        <label>Mensagem</label>
        <textarea
          value={corpo}
          onChange={(e) => setCorpo(e.target.value)}
          placeholder="Escreva sua mensagem"
          required
        />

        <button type="submit" className="btn-enviar">Enviar</button>
      </form>

      <div className="lista-mensagens">
        {mensagens.map((msg) => (
          <div key={msg.id} className="mensagem-item">
            <h3>{msg.titulo}</h3>
            <p>{msg.corpo}</p>
            <span className="data">{msg.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
}