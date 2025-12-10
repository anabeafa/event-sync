import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <nav className="navbar">
      <Link to="/">Eventos</Link>

      {token ? (
        <>
          <Link to="/meus-eventos">Seus Eventos</Link>
          <Link to="/minhas-inscricoes">Suas Inscrições</Link>
          <Link to="/amigos">Amigos</Link>
          <Link to="/mensagens">Mensagens</Link>

          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <>
          <Link to="/login">Entrar</Link>
          <Link to="/register">Criar Conta</Link>
        </>
      )}
    </nav>
  );
}
