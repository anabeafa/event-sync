export default function CartaoVirtual() {
  return (
    <div className="page">
      <h1>Cartão Virtual</h1>

      <div className="card-virtual">
        <h3>Seu Nome</h3>
        <p>Evento X</p>

        <div className="qr-box">
          <img src="/qr.png" alt="qr" />
        </div>

        <span>Status: Aprovado</span>
      </div>
    </div>
  );
}
