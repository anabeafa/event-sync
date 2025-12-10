import "../../styles/participante.css";
import { useState } from "react";

export default function AvaliarEvento() {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviarAvaliacao = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="avaliar-container">
      <h1 className="titulo">Avaliar Evento</h1>

      {enviado ? (
        <div className="avaliacao-sucesso">
          <h2>Obrigado pela avaliação!</h2>
          <p>Sua opinião foi registrada com sucesso.</p>
        </div>
      ) : (
        <form className="avaliar-form" onSubmit={enviarAvaliacao}>
          <label>Nota (1 a 5)</label>
          <select value={nota} onChange={(e) => setNota(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="1">1 - Péssimo</option>
            <option value="2">2 - Ruim</option>
            <option value="3">3 - Regular</option>
            <option value="4">4 - Bom</option>
            <option value="5">5 - Excelente</option>
          </select>

          <label>Comentário</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escreva sua opinião sobre o evento"
            required
          />

          <button type="submit" className="btn-enviar">Enviar Avaliação</button>
        </form>
      )}
    </div>
  );
}