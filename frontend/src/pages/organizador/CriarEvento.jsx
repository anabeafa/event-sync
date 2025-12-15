
import React, { useState } from 'react';
import LayoutOrganizador from './LayoutOrganizador'; 
import { createEvent } from '../../services/eventoService'; 
import { useNavigate } from 'react-router-dom'; 
import '../../styles/CriarEvento.css'; 

const CriarEvento = () => {
    const navigate = useNavigate();
    const [tipoEvento, setTipoEvento] = useState('gratuito'); 
    const [exigeAprovacao, setExigeAprovacao] = useState(false);
    
   
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        date: '', 
        description: '', 
        valor: 0,
        pix: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        
        setFormData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        const eventDataToAPI = {
            title: formData.title,
            description: formData.description || 'Nenhuma descrição fornecida.', 
            location: formData.location,
            date: formData.date,
        };

        try {
            const response = await createEvent(eventDataToAPI);
            
            setMessage(`🎉 Evento "${response.event.title}" criado e salvo no Back-end!`);
            setError('');
            
        
            setFormData(prevData => ({
                ...prevData,
                title: '', description: '', date: '', location: '', valor: 0, pix: '',
            }));
            
          

        } catch (err) {
            console.error('Erro ao criar evento:', err.message);
            setError(err.message || 'Ocorreu um erro desconhecido ao tentar criar o evento.');
            setMessage('');
        }
    };

    return (
        <LayoutOrganizador activePage="eventos">
            
            <div className="criar-evento-container"> 
                <div className="evento-form"> 

                    <h1>Criar Novo Evento</h1>
                    <span className="subtitle">Detalhes, regras e logística do evento.</span>
                    {message && <p className="feedback-message success">{message}</p>}
                    {error && <p className="feedback-message error">Erro: {error}</p>}

                    <form onSubmit={handleSubmit}>
                        
                        <h2>Detalhes do Evento</h2>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" id="title" value={formData.title} onChange={handleChange} placeholder="Ex: Conferência Anual de Tecnologia" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descrição do Evento</label>
                            <textarea 
                                id="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                placeholder="Descreva o evento e sua relevância." 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Local (Endereço ou URL)</label>
                            <input type="text" id="location" value={formData.location} onChange={handleChange} placeholder="Ex: Auditório Central ou link Meet/Zoom" required />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="date">Data e Hora de Início</label>
                            <input type="datetime-local" id="date" value={formData.date} onChange={handleChange} required />
                        </div>

                        <hr />

                        <h2>Configurações de Inscrição</h2>
                        <div className="form-group">
                            <label htmlFor="tipo">Tipo</label>
                            <select id="tipo" value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)}>
                                <option value="gratuito">Gratuito</option>
                                <option value="pago">Pago</option>
                            </select>
                        </div>
                        
                        {tipoEvento === 'pago' && (
                            <div id="config-pagamento" className="form-group">
                                <label htmlFor="valor">Valor (R$)</label>
                                <input type="number" id="valor" value={formData.valor} onChange={handleChange} placeholder="100.00" step="0.01" />
                                
                                <label htmlFor="pix" style={{marginTop: '15px'}}>Chave PIX do Organizador</label>
                                <input type="text" id="pix" value={formData.pix} onChange={handleChange} placeholder="CPF/CNPJ/Email/Telefone" />
                                
                                <p style={{ fontSize: '0.8em', marginTop: '10px', color: 'var(--secondary-color)' }}>*A confirmação de pagamento será manual com base nesta chave.</p>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Fluxo de Inscrição</label>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    id="exigeAprovacao" 
                                    checked={exigeAprovacao}
                                    onChange={(e) => setExigeAprovacao(e.target.checked)}
                                />
                                <label htmlFor="exigeAprovacao">Exige Aprovação Manual do Organizador</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkins_permitidos">Nº Check-ins Permitidos por Participante</label>
                            <input type="number" id="checkins_permitidos" defaultValue="1" />
                        </div>

                        <hr />

                        <h2>Social e Privacidade</h2>
                        <div className="form-group">
                            <div className="form-check">
                                <input type="checkbox" id="divulgar_participantes" defaultChecked />
                                <label htmlFor="divulgar_participantes">Permitir Divulgação da Lista de Participantes</label>
                            </div>
                        </div>
                        
                        <hr />

                        <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Salvar e Publicar Evento</button>
                    </form>
                </div>
            </div>
        </LayoutOrganizador>
    );
};

export default CriarEvento;