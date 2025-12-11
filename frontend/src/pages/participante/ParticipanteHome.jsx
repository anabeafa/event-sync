import React from 'react';
import { Link } from 'react-router-dom'; 
import "../../styles/participante.css";

export default function ParticipanteHome() {
  return (
    <div className="participante-home">
      <h1 className="titulo">Bem-vindo(a)!</h1>

      <div className="card-container">
        <Link to="/inscrever" className="card-link">
            <div className="card">
                <h2>Próximos Eventos</h2>
                <p>Veja os eventos disponíveis para inscrição.</p>
            </div>
        </Link>
        <Link to="/inscricoes" className="card-link">
            <div className="card">
                <h2>Suas Inscrições</h2>
                <p>Acompanhe os eventos que você está participando.</p>
            </div>
        </Link>
        <Link to="/mensagens" className="card-link">
            <div className="card">
                <h2>Mensagens</h2>
                <p>Veja comunicados e alertas importantes.</p>
            </div>
        </Link>
      </div>
    </div>
  );
}