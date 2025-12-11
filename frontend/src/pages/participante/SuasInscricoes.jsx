import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/participante.css"; 

export default function SuasInscricoes() {
    const inscricoes = [
        {
            idInscricao: "i001",
            idEvento: 101,
            titulo: "Congresso Nacional de IA",
            data: "20/03/2026",
            status: "Aprovada",
            paga: true,
            checkin: true,
        },
        {
            idInscricao: "i002",
            idEvento: 102,
            titulo: "Workshop de UX Design",
            data: "05/04/2026",
            status: "Pendente",
            paga: false,
            checkin: false,
        },
        {
            idInscricao: "i003",
            idEvento: 103,
            titulo: "Feira de Startups 2026",
            data: "15/05/2026",
            status: "Cancelada",
            paga: false,
            checkin: false,
        },
        {
            idInscricao: "i004",
            idEvento: 104,
            titulo: "Seminário de Cibersegurança",
            data: "01/06/2026",
            status: "Aguardando Pagamento",
            paga: false,
            checkin: false,
        }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case "Aprovada":
                return "status-aprovada";
            case "Pendente":
            case "Aguardando Pagamento":
                return "status-pendente";
            case "Cancelada":
                return "status-cancelada";
            default:
                return "status-default";
        }
    };

    return (
        <div className="part-container">
            <div className="part-content">

                <h1 className="part-title">Minhas Inscrições</h1>

                {inscricoes.length === 0 ? (
                    <p>Você ainda não possui nenhuma inscrição ativa.</p>
                ) : (
                    <div className="part-inscricao-list">
                        {inscricoes.map(inscricao => (
                            <div key={inscricao.idInscricao} className="part-inscricao-card">
                                
                                <h2 className="part-inscricao-title">{inscricao.titulo}</h2>
                                <p className="part-inscricao-date">Data: {inscricao.data}</p>
                                
                                <div className={`part-status-badge ${getStatusClass(inscricao.status)}`}>
                                    Status: {inscricao.status}
                                </div>

                                <div className="part-actions">
                                    
                                   
                                    {inscricao.status === "Aprovada" && inscricao.paga && (
                                        <Link to={`/meucartao/${inscricao.idInscricao}`} className="part-btn-small">
                                            Ver Cartão Virtual
                                        </Link>
                                    )}

                                    <Link to={`/inscrever/${inscricao.idEvento}`} className="part-link-detalhes">
                                        Detalhes do Evento
                                    </Link>
                                    
                                 
                                    {inscricao.status === "Aprovada" && (
                                        <button className="part-btn-cancel">Cancelar Inscrição</button>
                                    )}
                                    {inscricao.status === "Aguardando Pagamento" && (
                                        <button className="part-btn-pay">Realizar Pagamento</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}