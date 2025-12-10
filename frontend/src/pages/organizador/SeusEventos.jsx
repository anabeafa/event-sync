import React from 'react';
import LayoutOrganizador from './LayoutOrganizador';

const EventoCard = ({ title, info, status, statusClass, actions }) => (
    <div className="card" style={{ borderLeftColor: statusClass === 'status-rascunho' ? '#adb5bd' : statusClass === 'status-aberto' ? '#28a745' : statusClass === 'status-finalizado' ? '#6c757d' : '#007bff' }}>
        <div className="card-title">{title}</div>
        <div className="card-info">{info}</div>
        <span className={`status-badge ${statusClass}`}>{status}</span>
        <div className="card-actions">
            {actions.map((action, index) => (
                <a key={index} href={action.link} className={`btn-sm ${action.className}`}>
                    {action.text}
                </a>
            ))}
        </div>
    </div>
);

const SeusEventos = () => {
    const eventosMock = [
        {
            id: 1,
            title: "Workshop de UX/UI Mobile",
            info: "Rua Exemplo, 123 | 12/Set - 14:00h",
            status: "Rascunho",
            statusClass: "status-rascunho",
            actions: [
                { text: "Editar", link: "criar-evento.html?id=1", className: "btn-outline" },
                { text: "Publicar", link: "#", className: "btn-primary" },
            ]
        },
        {
            id: 2,
            title: "Summit Inovação 2025",
            info: "Online | 25/Out - 10:00h | 150/200 Inscritos",
            status: "Inscrições Abertas",
            statusClass: "status-aberto",
            actions: [
                { text: "Ver Inscritos", link: "gestao-inscricoes.html?id=2", className: "btn-primary" },
                { text: "Check-in", link: "checkin.html?id=2", className: "btn-outline" },
                { text: "Fechar Inscrições", link: "#", className: "btn-outline" },
            ]
        },
        {
            id: 3,
            title: "Encontro de Startups - Ed. 1",
            info: "Finalizado em: 10/Abr/2025",
            status: "Finalizado",
            statusClass: "status-finalizado",
            actions: [
                { text: "Gerar Certificados", link: "#", className: "btn-primary" },
                { text: "Ver Avaliações (Rating 4.5)", link: "#", className: "btn-outline" },
            ]
        },
    ];

    return (
        <LayoutOrganizador activePage="eventos">
            <h1>Olá, Organizador!</h1>
            <span className="subtitle">Visão Geral e Gerenciamento dos Seus Eventos.</span>
            
            <a href="criar-evento.html" className="btn btn-success" style={{ marginBottom: '20px' }}>
                <i className="fas fa-plus"></i> Criar Novo Evento
            </a>

            <h2>Seus Eventos ({eventosMock.length})</h2>
            
            {eventosMock.map(evento => (
                <EventoCard key={evento.id} {...evento} />
            ))}
        </LayoutOrganizador>
    );
};

export default SeusEventos;