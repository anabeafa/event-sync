import React, { useState } from 'react';
import LayoutOrganizador from './LayoutOrganizador';

const Comunicacao = () => {
    const [tipoEnvio, setTipoEnvio] = useState('email'); 
    const [destinatario, setDestinatario] = useState('aprovados'); 
    const templates = {
        aprovacao: "Sua inscrição foi aprovada! Bem-vindo.",
        lembrete: "Lembrete: Seu evento começa em 24 horas.",
        certificado: "Seu Certificado de Participação está disponível.",
    };

    const handleTemplateChange = (e) => {
        const templateKey = e.target.value;
        if (templateKey && templates[templateKey]) {
            alert(`Template ${templateKey} carregado: "${templates[templateKey]}"`); 
        }
    };

    return (
        <LayoutOrganizador activePage="config"> 
            <h1>Enviar Comunicação</h1>
            <span className="subtitle">Evento: Summit Inovação 2025</span>
            
            <p style={{marginBottom: '20px'}}>Envie notificações internas (push in-app) ou e-mail para grupos específicos de participantes.</p>

            <form>
                <h2>Destino da Mensagem</h2>
                
                <div className="form-group">
                    <label>Tipo de Envio</label>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className="form-check">
                            <input 
                                type="radio" 
                                name="tipo_envio" 
                                value="email" 
                                checked={tipoEnvio === 'email'} 
                                onChange={() => setTipoEnvio('email')} 
                            />
                            Email
                        </label>
                        <label className="form-check">
                            <input 
                                type="radio" 
                                name="tipo_envio" 
                                value="notificacao" 
                                checked={tipoEnvio === 'notificacao'} 
                                onChange={() => setTipoEnvio('notificacao')} 
                            />
                            Notificação In-App
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="destinatario">Destinatários</label>
                    <select id="destinatario" value={destinatario} onChange={(e) => setDestinatario(e.target.value)}>
                        <option value="aprovados">Aprovados/Confirmados (200)</option>
                        <option value="todos">Todos Inscritos (250)</option>
                        <option value="checkin">Apenas quem fez Check-in (150)</option>
                        <option value="individual">Individual (Buscar E-mail/Nome)</option>
                    </select>
                </div>

                {destinatario === 'individual' && (
                    <div className="form-group">
                        <label htmlFor="busca_individual">Buscar Participante</label>
                        <input type="text" id="busca_individual" placeholder="Nome ou Email do participante" />
                    </div>
                )}
                
                <hr style={{ margin: '20px 0' }} />

                <h2>Conteúdo</h2>
                
                {tipoEnvio === 'email' && (
                    <div className="form-group">
                        <label htmlFor="template">Usar Template (Opcional)</label>
                        <select id="template" onChange={handleTemplateChange}>
                            <option value="">-- Selecione --</option>
                            <option value="lembrete">Lembrete do Evento (24h)</option>
                            <option value="aprovacao">Inscrição Aprovada</option>
                            <option value="certificado">Certificado Disponível</option>
                        </select>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="titulo_msg">Título / Assunto</label>
                    <input type="text" id="titulo_msg" placeholder={tipoEnvio === 'email' ? 'Assunto do Email' : 'Título da Notificação'} required />
                </div>

                <div className="form-group">
                    <label htmlFor="corpo_msg">Corpo da Mensagem</label>
                    <textarea id="corpo_msg" rows="5" placeholder="Insira o conteúdo completo aqui..."></textarea>
                </div>
                
                <div className="form-group">
                    <label htmlFor="anexo">Anexo (Opcional)</label>
                    <input type="file" id="anexo" />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
                    <i className="fas fa-paper-plane"></i> Enviar {tipoEnvio === 'email' ? 'Email' : 'Notificação'}
                </button>
            </form>
        </LayoutOrganizador>
    );
};

export default Comunicacao;