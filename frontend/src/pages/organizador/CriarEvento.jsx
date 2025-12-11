// frontend/src/pages/organizador/CriarEvento.jsx

import React, { useState } from 'react';
import LayoutOrganizador from './LayoutOrganizador'; // Seu componente de Layout
import { createEvent } from '../../services/eventoService'; // 🛑 Importar o serviço de API
import { useNavigate } from 'react-router-dom'; // Para redirecionar, se quiser

const CriarEvento = () => {
    const navigate = useNavigate();
    const [tipoEvento, setTipoEvento] = useState('gratuito'); 
    const [exigeAprovacao, setExigeAprovacao] = useState(false);
    
    // 🛑 1. NOVO STATE: Para armazenar todos os dados do formulário
    const [formData, setFormData] = useState({
        // Mapeamento para os campos que o Back-end espera (title, location, date, description)
        title: '',
        location: '',
        date: '', // Será preenchido por data_inicio
        description: '', // Será preenchido por descrição (falta input no seu código original, adicionaremos!)
        
        // Campos extras que usaremos no Front-end ou ignoraremos por enquanto:
        valor: 0,
        pix: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    // 🛑 2. Função genérica para capturar a mudança em qualquer input
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        
        // Lida com checkboxes e outros tipos de input
        setFormData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    // 🛑 3. Conexão com o Back-end
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        // O Back-end que criamos só espera title, location, date e description
        const eventDataToAPI = {
            title: formData.title,
            description: formData.description || 'Nenhuma descrição fornecida.', // Use a descrição do campo
            location: formData.location,
            date: formData.date, // O campo datetime-local enviará o formato correto
            // Ignoramos temporariamente 'valor', 'pix', etc., pois o Back-end só espera os 4 campos principais.
        };

        try {
            const response = await createEvent(eventDataToAPI);
            
            setMessage(`🎉 Evento "${response.event.title}" criado e salvo no Back-end!`);
            setError('');
            
            // Limpa os campos essenciais após o sucesso
            setFormData(prevData => ({
                ...prevData,
                title: '', description: '', date: '', location: '', valor: 0, pix: '',
            }));
            
            // Opcional: Redirecionar
            // setTimeout(() => navigate('/organizador/dashboard'), 2000); 

        } catch (err) {
            console.error('Erro ao criar evento:', err.message);
            // Exibe a mensagem de erro do Back-end (ex: "Data inválida", "Acesso negado")
            setError(err.message || 'Ocorreu um erro desconhecido ao tentar criar o evento.');
            setMessage('');
        }
    };

    return (
        <LayoutOrganizador activePage="eventos">
            <h1>Criar Novo Evento</h1>
            <span className="subtitle">Detalhes, regras e logística do evento.</span>

            {/* Mensagens de feedback */}
            {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Erro: {error}</p>}

            <form onSubmit={handleSubmit}>
              
                <h2>Detalhes do Evento</h2>
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    {/* 🛑 Mapeamento: id="title" -> formData.title */}
                    <input type="text" id="title" value={formData.title} onChange={handleChange} placeholder="Ex: Conferência Anual de Tecnologia" required />
                </div>
                
                {/* 🛑 NOVO CAMPO NECESSÁRIO NO BACK-END */}
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
                    {/* 🛑 Mapeamento: id="location" -> formData.location */}
                    <input type="text" id="location" value={formData.location} onChange={handleChange} placeholder="Ex: Auditório Central ou link Meet/Zoom" required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="date">Data e Hora de Início</label>
                    {/* 🛑 Mapeamento: id="date" -> formData.date (Ajustado de data_inicio para o nome que o Back-end espera) */}
                    <input type="datetime-local" id="date" value={formData.date} onChange={handleChange} required />
                </div>

                <hr style={{ margin: '20px 0' }} />

                {/* O restante do formulário (configurações avançadas) pode ficar,
                    mas os dados extras não serão enviados ao Back-end ainda. */}
                
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
                        {/* 🛑 Mapeamento: id="valor" -> formData.valor */}
                        <input type="number" id="valor" value={formData.valor} onChange={handleChange} placeholder="100.00" step="0.01" />
                        <label htmlFor="pix">Chave PIX do Organizador</label>
                        {/* 🛑 Mapeamento: id="pix" -> formData.pix */}
                        <input type="text" id="pix" value={formData.pix} onChange={handleChange} placeholder="CPF/CNPJ/Email/Telefone" />
                        <p style={{ fontSize: '0.8em', marginTop: '5px' }}>*A confirmação de pagamento será manual com base nesta chave.</p>
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

                <hr style={{ margin: '20px 0' }} />

                <h2>Social e Privacidade</h2>
                <div className="form-group">
                    <div className="form-check">
                        <input type="checkbox" id="divulgar_participantes" defaultChecked />
                        <label htmlFor="divulgar_participantes">Permitir Divulgação da Lista de Participantes</label>
                    </div>
                </div>
                
                <hr style={{ margin: '20px 0' }} />

                {/* 🛑 Chamaremos o handleSubmit no botão principal */}
                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Salvar e Publicar Evento</button>
            </form>
        </LayoutOrganizador>
    );
};

export default CriarEvento;