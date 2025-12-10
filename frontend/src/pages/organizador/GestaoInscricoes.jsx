import React from 'react';
import LayoutOrganizador from './LayoutOrganizador';

const InscricaoItem = ({ name, emailInfo, status, statusClass, actions }) => (
    <div className="inscricao-item">
        <div className="inscricao-details">
            <strong>{name}</strong><br />
            <span className="card-info">{emailInfo}</span>
            <span className={`inscricao-status-badge ${statusClass}`}>{status}</span>
        </div>
        <div className="inscricao-actions">
            {actions.map((action, index) => (
                <button 
                    key={index} 
                    className={`btn-sm ${action.className}`}
           
                    style={action.style || {}} 
                >
                    <i className={`fas ${action.icon}`}></i> {action.text}
                </button>
            ))}
        </div>
    </div>
);

const GestaoInscricoes = () => {
    const inscricoesMock = [
        {
            id: 1,
            name: "João Silva",
            emailInfo: "joao.s@email.com",
            status: "PENDENTE",
            statusClass: "status-pendente",
            actions: [
                { text: "Aprovar", icon: "fa-check", className: "btn-success" },
                { text: "Recusar", icon: "fa-times", className: "btn-danger" },
            ]
        },
        {
            id: 2,
            name: "Maria Oliveira",
            emailInfo: "maria.o@email.com (R$ 100,00)",
            status: "AG. PGTO",
            statusClass: "status-aguardando",
            actions: [
                { text: "Conf. PIX", icon: "fa-check", className: "btn-success" },
                { text: "Cancelar", icon: "fa-times", className: "btn-danger" },
            ]
        },
        {
            id: 3,
            name: "Carlos Santos",
            emailInfo: "carlos.s@email.com | Check-ins: 1/1",
            status: "APROVADA",
            statusClass: "status-aprovada",
            actions: [
                { 
                    text: "Email", 
                    icon: "fa-envelope", 
                    className: "btn-outline", 
                    style: { borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' } 
                },
            ]
        },
    ];

    return (
        <LayoutOrganizador activePage="inscricoes">
            <h1>👥 Gestão de Inscrições</h1>
            <span className="subtitle">Evento: Summit Inovação 2025</span>
            
         
            <div className="card-actions" style={{ marginBottom: '20px', borderLeft: 'none', padding: '10px 0' }}>
                <button className="btn-sm btn-primary">Todos (250)</button>
                <button className="btn-sm btn-outline">Aprovadas (200)</button>
                <button className="btn-sm btn-outline">Pendentes (20)</button>
                <button className="btn-sm btn-outline">Aguardando Pgto (30)</button>
            </div>
            
            <h2>Lista de Participantes</h2>

            {inscricoesMock.map(inscricao => (
                <InscricaoItem key={inscricao.id} {...inscricao} />
            ))}
            
            <hr style={{ margin: '20px 0' }} />
            
            <h2>Ações em Massa</h2>
            <button className="btn btn-outline" style={{ marginTop: '0' }}><i className="fas fa-download"></i> Exportar Lista (.CSV)</button>
            <button className="btn btn-primary"><i className="fas fa-bullhorn"></i> Enviar Comunicação (Aprovados)</button>
        </LayoutOrganizador>
    );
};

export default GestaoInscricoes;