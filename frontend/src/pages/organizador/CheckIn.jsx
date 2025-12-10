import React from 'react';
import LayoutOrganizador from './LayoutOrganizador';

const ParticipanteInfo = ({ name, status, checkins, maxCheckins, lastCheckin }) => {
    const checkinProgress = `${checkins} / ${maxCheckins}`;
    const isMaxReached = checkins >= maxCheckins;
    const counterColor = isMaxReached ? 'var(--success-color)' : 'var(--danger-color)';

    return (
        <div className="participante-info" style={{ borderColor: isMaxReached ? 'var(--secondary-color)' : 'var(--primary-color)' }}>
            <h3 style={{ marginBottom: '5px' }}>Participante Encontrado</h3>
            <p><strong>Nome:</strong> {name}</p>
            <p><strong>Status:</strong> <span className="inscricao-status-badge status-aprovada">{status}</span></p>
            <p><strong>Check-ins Realizados:</strong> 
                <span className="checkin-counter" style={{ color: counterColor }}>{checkinProgress}</span>
            </p>
            
            <hr style={{ margin: '10px 0' }} />
            
            {isMaxReached ? (
                <button className="btn btn-secondary" disabled>Limite de Check-ins Atingido</button>
            ) : (
                <button className="btn btn-success"><i className="fas fa-sign-in-alt"></i> Registrar Check-in Agora</button>
            )}
            
            <p style={{ fontSize: '0.8em', color: 'var(--secondary-color)', textAlign: 'center', marginTop: '5px' }}>Último Check-in: {lastCheckin}.</p>
        </div>
    );
};

const Checkin = () => {
    return (
        <LayoutOrganizador activePage="checkin">
            <div className="checkin-header">
                <h1>🎫 Painel de Check-in</h1>
                <span className="subtitle">Evento: Summit Inovação 2025 (Limite: 1 Check-in)</span>
            </div>
            
            <h2>Leitura de QR Code</h2>
            <div className="camera-placeholder">
                <i className="fas fa-camera fa-2x"></i> Câmera (Leitor QR Code)
            </div>

            <h2>Busca Manual</h2>
            <div className="form-group">
                <input type="text" placeholder="Buscar por Nome do Participante ou ID" />
            </div>

            <ParticipanteInfo 
                name="Ana Paula Souza"
                status="APROVADA"
                checkins={0}
                maxCheckins={1}
                lastCheckin="Nunca"
            />

            <ParticipanteInfo 
                name="Pedro Alvares"
                status="APROVADA"
                checkins={2}
                maxCheckins={2}
                lastCheckin="10:30h (Manual)"
            />
        </LayoutOrganizador>
    );
};

export default Checkin;