import React, { useState } from 'react';
import LayoutOrganizador from './LayoutOrganizador';

const CriarEvento = () => {

    const [tipoEvento, setTipoEvento] = useState('gratuito'); 
    const [exigeAprovacao, setExigeAprovacao] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Evento salvo como rascunho. Implementação do backend necessária.');
    };

    return (
        <LayoutOrganizador activePage="eventos">
            <h1>Criar Novo Evento</h1>
            <span className="subtitle">Detalhes, regras e logística do evento.</span>

            <form onSubmit={handleSubmit}>
             
                <h2>Detalhes do Evento</h2>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" id="titulo" placeholder="Ex: Conferência Anual de Tecnologia" required />
                </div>
               
                <div className="form-group">
                    <label htmlFor="local">Local (Endereço ou URL)</label>
                    <input type="text" id="local" placeholder="Ex: Auditório Central ou link Meet/Zoom" required />
                </div>
                <div className="form-group">
                    <label htmlFor="data_inicio">Data e Hora de Início</label>
                    <input type="datetime-local" id="data_inicio" required />
                </div>

                <hr style={{ margin: '20px 0' }} />

            
                <h2>Configurações de Inscrição</h2>
                <div className="form-group">
                    <label htmlFor="tipo">Tipo</label>
                    <select id="tipo" value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)}>
                        <option value="gratuito">Gratuito</option>
                        <option value="pago">Pago</option>
                    </select>
                </div>
                
                {tipoEvento === 'pago' && (
                    <div id="config-pagamento" className="form-group" style={{ border: '1px solid var(--warning-color)', padding: '10px', borderRadius: '5px' }}>
                        <label htmlFor="valor">Valor (R$)</label>
                        <input type="number" id="valor" placeholder="100.00" step="0.01" />
                        <label htmlFor="pix">Chave PIX do Organizador</label>
                        <input type="text" id="pix" placeholder="CPF/CNPJ/Email/Telefone" />
                        <p style={{ fontSize: '0.8em', marginTop: '5px' }}>*A confirmação de pagamento será manual com base nesta chave.</p>
                    </div>
                )}

                <div className="form-group">
                    <label>Fluxo de Inscrição</label>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            id="exige_aprovacao" 
                            checked={exigeAprovacao}
                            onChange={(e) => setExigeAprovacao(e.target.checked)}
                        />
                        <label htmlFor="exige_aprovacao">Exige Aprovação Manual do Organizador</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="checkins_permitidos">Nº Check-ins Permitidos por Participante</label>
                    <input type="number" id="checkins_permitidos" defaultValue="1" />
                </div>

                <hr style={{ margin: '20px 0' }} />

                <h2>Social e Privacidade</h2>
                <div className="form-group">
                    <div className="form-check">
                        <input type="checkbox" id="divulgar_participantes" defaultChecked />
                        <label htmlFor="divulgar_participantes">Permitir Divulgação da Lista de Participantes</label>
                    </div>
                </div>
                
                <hr style={{ margin: '20px 0' }} />

                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Salvar como Rascunho</button>
                <button type="button" className="btn btn-success" style={{ marginTop: '0' }}>Publicar e Abrir Inscrições</button>
            </form>
        </LayoutOrganizador>
    );
};

export default CriarEvento;