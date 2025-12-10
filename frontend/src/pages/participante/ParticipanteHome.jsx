import "../../styles/participante.css";

export default function ParticipanteHome() {
  return (
    <div className="participante-home">
      <h1 className="titulo">Bem-vindo(a)!</h1>

      <div className="card-container">
        <div className="card">
          <h2>Próximos Eventos</h2>
          <p>Veja os eventos disponíveis pararição.</p>
        </div>

        <div className="card">
          <h2>Suas Inscrições</h2>
          <p>Acompanhe os eventos que você está participando.</p>
        </div>

        <div className="card">
          <h2>Mensagens</h2>
          <p>Veja comunicados e alertas importantes.</p>
        </div>
      </div>
    </div>
  );
}