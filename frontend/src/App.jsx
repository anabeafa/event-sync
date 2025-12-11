import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// PARTICIPANTE
import ParticipanteHome from "./pages/participante/ParticipanteHome";
import Perfil from "./pages/participante/Perfil";
import InscreverEvento from "./pages/participante/InscreverEvento";
import Mensagens from "./pages/participante/Mensagens";
import AvaliarEvento from "./pages/participante/AvaliarEvento";
import SuasInscricoes from "./pages/participante/SuasInscricoes";


// ORGANIZADOR
import CriarEvento from "./pages/organizador/CriarEvento";
import Comunicacao from "./pages/organizador/Comunicacao";
     {/*import CheckIn from "./pages/organizador/CheckIn";
import ConfigurarCertificado from "./pages/organizador/ConfigurarCertificado";
import Dashboard from "./pages/organizador/Dashboard";
import EditarEvento from "./pages/organizador/EditarEvento ";*/}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROTAS DE LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ROTAS DO PARTICIPANTE */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ParticipanteHome />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/inscrever" element={<InscreverEvento />} />
        <Route path="/mensagens" element={<Mensagens />} />
        <Route path="/avaliar" element={<AvaliarEvento />} />
        <Route path="/inscricoes" element={<SuasInscricoes />} />
        

        {/* ROTAS DO ORGANIZADOR*/}
        <Route path="/organizador/criarevento" element={<CriarEvento />} />
        <Route path="/organizador/comunicacao" element={<Comunicacao />} />

         {/* <Route path="/organizador/checkin" element={<CheckIn />} />
        <Route path="/organizador/ConfigurarCertificado" element={<ConfigurarCertificado />} />
        <Route path="/organizador/Dashboard" element={<Dashboard/>} />
        <Route path="/organizador/EditarEvento" element={<EditarEvento/>} />*/}
      </Routes>
    </BrowserRouter>
  );
}
