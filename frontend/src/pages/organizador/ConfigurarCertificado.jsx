import React, { useState } from 'react';
import LayoutOrganizador from './LayoutOrganizador';

const ConfigCertificado = () => {
    const [exigeCheckin, setExigeCheckin] = useState(true);
    const [liberacao, setLiberacao] = useState('manual'); 

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Configurações de Certificado salvas com sucesso!');
    };

    return (
        <LayoutOrganizador activePage="config">
            <h1>📜 Configurar Certificado</h1>
            <span className="subtitle">Evento: Summit Inovação 2025</span>
            
            <p style={{marginBottom: '20px'}}>Defina o modelo do PDF, os dados que serão incluídos e as regras para que o participante possa fazer o download.</p>

            <form onSubmit={handleSubmit}>
                <h2>Modelo do PDF</h2>
                
                <div className="form-group">
                    <label htmlFor="titulo_certificado">Título do Certificado</label>
                    <input type="text" id="titulo_certificado" defaultValue="Certificado de Participação" required />
                </div>

                <div className="form-group">
                    <label htmlFor="carga_horaria">Carga Horária (A ser exibida)</label>
                    <input type="number" id="carga_horaria" placeholder="8" required />
                    <span className="card-info">Em horas. Ex: 8 (para 8 horas).</span>
                </div>
                
                <div className="form-group">
                    <label htmlFor="assinatura">Assinatura / Organização (Imagem)</label>
                    <input type="file" id="assinatura" />
                    <span className="card-info">Upload da imagem de assinatura ou logo do organizador.</span>
                </div>
                
                <hr style={{ margin: '20px 0' }} />

                <h2>Regras e Liberação</h2>

                <div className="form-group">
                    <label>Critério de Check-in</label>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            id="exige_checkin" 
                            checked={exigeCheckin}
                            onChange={(e) => setExigeCheckin(e.target.checked)}
                        />
                        <label htmlFor="exige_checkin">Exigir pelo menos 1 Check-in para ter direito ao Certificado.</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="liberacao">Momento da Liberação</label>
                    <select id="liberacao" value={liberacao} onChange={(e) => setLiberacao(e.target.value)}>
                        <option value="manual">Manual (Organiz. libera após finalizar evento)</option>
                        <option value="automatico">Automático (Assim que o evento for finalizado)</option>
                        <option value="avaliacao">Somente após o participante avaliar o evento (Opcional)</option>
                    </select>
                </div>
                
                <hr style={{ margin: '20px 0' }} />

                <h2>Campos Inclusos (Automático)</h2>
                <ul style={{ listStyleType: 'disc', marginLeft: '20px', fontSize: '0.9em', color: 'var(--dark-text)' }}>
                    <li>Nome Completo do Participante</li>
                    <li>Título do Evento</li>
                    <li>Data(s) do Evento</li>
                    <li>Carga Horária (configurada acima)</li>
                    <li>Código de Validação Único (QR Code)</li>
                </ul>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '30px' }}>
                    <i className="fas fa-save"></i> Salvar Configurações
                </button>
                <button type="button" className="btn btn-outline" style={{ marginTop: '10px' }}>
                    <i className="fas fa-file-pdf"></i> Pré-visualizar Modelo
                </button>
            </form>
        </LayoutOrganizador>
    );
};

export default ConfigCertificado;