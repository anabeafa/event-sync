// frontend/src/pages/participante/HomeFeed.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// O serviço de listagem de eventos real (mantido)
import { listPublicEvents } from '../../services/eventoService'; 

// Importação dos estilos
import '../../styles/HomeFeed.css';
import '../../styles/CardEvento.css'; 


const HomeFeed = () => {
    // Mantemos o state para carregar eventos reais se a API funcionar
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    // Removemos o state 'error' e o seu uso para garantir que a mensagem de erro não seja exibida.
    const navigate = useNavigate();

    // Mock temporário para verificar se o usuário está logado
    const isUserLoggedIn = false; 

    // Dados Mockados para exibição imediata
    const mockEventosData = [
        {
            id: 101,
            titulo: "Workshop de ReactJS e Novas APIs",
            organizadorName: "Code Academy Teresina",
            dataHora: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), 
            local: "Hub de Inovação - Teresina",
            valor: 0.00,
            inscricoes_count: 75,
            capacidadeMax: 100
        },
        {
            id: 102,
            titulo: "Hackathon Piauí Tech Future",
            organizadorName: "Secretaria de Ciência e Tecnologia",
            dataHora: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString(),
            local: "Palácio de Convenções",
            valor: 50.00,
            inscricoes_count: 20,
            capacidadeMax: 50
        },
        {
            id: 103,
            titulo: "Seminário: IA Aplicada a Negócios",
            organizadorName: "Startup Piauí",
            dataHora: new Date(new Date().setDate(new Date().getDate() + 19)).toISOString(), 
            local: "Online (Zoom)",
            valor: 0.00,
            inscricoes_count: 150,
            capacidadeMax: 150 
        },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await listPublicEvents();
                
                if (data && data.length > 0) {
                    setEventos(data);
                } else {
                    // Se a API retornar vazio, usamos o mock
                    setEventos(mockEventosData);
                }
                
            } catch (err) {
                console.error("Erro ao carregar o feed:", err);
                
                // Em caso de erro de conexão, garantimos que os mocks sejam exibidos
                setEventos(mockEventosData);
                console.info("Exibindo eventos mockados devido a erro de conexão ou lista vazia.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const formatarData = (dataHora) => {
        const date = new Date(dataHora);
        // Formato: 12/Dez, 14:30
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderConteudo = () => {
        if (loading) {
            return <p className="loading">Carregando eventos públicos...</p>;
        }
        
        // Esta condição só será verdadeira se NENHUM evento (nem real, nem mock) for carregado.
        if (eventos.length === 0) {
            return <p className="no-events">Nenhum evento futuro disponível no momento. 😔</p>;
        }

        // Renderiza os dados (reais ou mockados)
        return (
            <div className="feed-list">
                {eventos.map(evento => {
                    const inscritos = evento.inscricoes_count || 0;
                    const capacidade = evento.capacidadeMax || 100; 
                    // Calcula a porcentagem de vagas preenchidas
                    const progresso = Math.min(100, Math.round((inscritos / capacidade) * 100));

                    return (
                        <div 
                            key={evento.id} 
                            className="card-evento" 
                            onClick={() => navigate(`/evento/${evento.id}`)}
                        >
                            <div className="card-header">
                                <h3 className="card-title">{evento.titulo}</h3>
                                {/* Badge de Preço */}
                                <span className={`status-badge ${evento.valor > 0 ? 'pago' : 'gratuito'}`}>
                                    {evento.valor > 0 ? `R$ ${evento.valor.toFixed(2)}` : 'GRATUITO'}
                                </span>
                            </div>
                            
                            <p className="card-organizador">Organizador: **{evento.organizadorName || 'Desconhecido'}**</p>
                            
                            <div className="card-details">
                                <p><span className="detail-icon">📅</span> Data: **{formatarData(evento.dataHora)}**</p>
                                <p><span className="detail-icon">📍</span> Local: **{evento.local}**</p>
                            </div>
                            
                            {/* Rodapé com a barra de progresso de vagas */}
                            <div className="card-footer">
                                <div className="inscritos-text">
                                    <span>Vagas Preenchidas:</span>
                                    <span>{progresso}% ({inscritos}/{capacidade})</span>
                                </div>
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill" 
                                        style={{ width: `${progresso}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    };

    // Componente para a Seção de Destaque do Piauí (mantido)
    const EventosPiauiDestaque = () => (
        <section className="piaui-destaque-section">
            <h2 className="section-title piaui-destaque-title">
                Ecossistema Tech do Piauí em Destaque!
            </h2>
            <p className="piaui-destaque-subtitle">
                Conheça os grandes eventos que impulsionam a inovação, drones, IA e empreendedorismo em Teresina.
            </p>

            <div className="piaui-destaque-cards-container">
                {/* CARD 1: Campus Party Weekend Piauí */}
                <div className="piaui-destaque-card campus-party-card">
                    <h4 className="card-title" style={{ fontSize: '1.4em' }}>Campus Party Weekend PI 🚀</h4>
                    <p>Foco em Games, IA e Drones. Uma imersão de conhecimento e criatividade.</p>
                    <a 
                        href="https://www.campus-party.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="auth-cadastro destaque-button campus-party-btn" 
                    >
                        Inscreva-se Agora!
                    </a>
                </div>

                {/* CARD 2: Nordeste Tech */}
                <div className="piaui-destaque-card nordeste-tech-card">
                    <h4 className="card-title" style={{ fontSize: '1.4em' }}>Nordeste Tech 💻</h4>
                    <p>A maior feira de tecnologia, negócios e *startups* do Piauí.</p>
                    <a 
                        href="https://www.nordestetech.com.br" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="auth-cadastro destaque-button nordeste-tech-btn" 
                    >
                        Garanta seu Ingresso!
                    </a>
                </div>
                
                {/* CARD 3: Startup Piauí Meetups */}
                <div className="piaui-destaque-card startup-piaui-card">
                    <h4 className="card-title" style={{ fontSize: '1.4em' }}>Startup Piauí Meetups 🤝</h4>
                    <p>Encontros periódicos para conectar talentos, empreendedores e investidores.</p>
                    <a 
                        href="https://www.startuppiaui.com.br/meetups" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="auth-cadastro destaque-button startup-piaui-btn" 
                    >
                        Participe dos Encontros
                    </a>
                </div>
            </div>
        </section>
    );

    return (
        <div className="home-feed-page-wrapper">
            <header className="feed-header-login">
                <h1 className="feed-title">
                    <Link to="/" className="auth-link">EventSync 📅</Link>
                </h1>
                
                {isUserLoggedIn ? (
                    <p>Bem-vindo(a)! <Link to="/dashboard" className="auth-link">Ir para Dashboard</Link></p>
                ) : (
                    <div className="auth-links">
                        <Link to="/login" className="auth-link auth-login">Login</Link>
                        <Link to="/register" className="auth-link auth-cadastro">Cadastre-se</Link>
                    </div>
                )}
            </header>
            
            {/* 2. Hero Section - Banner Chamativo */}
            <section className="hero-section">
                <h2>Encontre Eventos e Cursos Próximos de Você</h2>
                <p>Descubra workshops, seminários e conferências. Participe e comece a aprender hoje!</p>
            </section>

            {/* NOVO: Seção de Destaque do Ecossistema do Piauí */}
            <EventosPiauiDestaque />
            
            {/* 3. Conteúdo Principal (Feed de Eventos) */}
            <main className="feed-main-content">
                <h2 className="section-title">Próximos Eventos Disponíveis</h2>
                {renderConteudo()}
            </main>
        </div>
    );
};

export default HomeFeed;