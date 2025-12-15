import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listPublicEvents } from '../../services/eventoService'; 
import '../../styles/HomeFeed.css';
import '../../styles/CardEvento.css'; 


const HomeFeed = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const isUserLoggedIn = false; 
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
                    setEventos(mockEventosData);
                }
                
            } catch (err) {
                console.error("Erro ao carregar o feed:", err);
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
        
        if (eventos.length === 0) {
            return <p className="no-events">Nenhum evento futuro disponível no momento. 😔</p>;
        }

        return (
            <div className="feed-list">
                {eventos.map(evento => {
                    const inscritos = evento.inscricoes_count || 0;
                    const capacidade = evento.capacidadeMax || 100; 
                    const progresso = Math.min(100, Math.round((inscritos / capacidade) * 100));

                    return (
                        <div 
                            key={evento.id} 
                            className="card-evento" 
                            onClick={() => navigate(`/evento/${evento.id}`)}
                        >
                            <div className="card-header">
                                <h3 className="card-title">{evento.titulo}</h3>
                                <span className={`status-badge ${evento.valor > 0 ? 'pago' : 'gratuito'}`}>
                                    {evento.valor > 0 ? `R$ ${evento.valor.toFixed(2)}` : 'GRATUITO'}
                                </span>
                            </div>
                            
                            <p className="card-organizador">Organizador: **{evento.organizadorName || 'Desconhecido'}**</p>
                            
                            <div className="card-details">
                                <p><span className="detail-icon">📅</span> Data: **{formatarData(evento.dataHora)}**</p>
                                <p><span className="detail-icon">📍</span> Local: **{evento.local}**</p>
                            </div>
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

    const EventosPiauiDestaque = () => (
        <section className="piaui-destaque-section">
            <h2 className="section-title piaui-destaque-title">
                Ecossistema Tech do Piauí em Destaque!
            </h2>
            <p className="piaui-destaque-subtitle">
                Conheça os grandes eventos que impulsionam a inovação, drones, IA e empreendedorismo em Teresina.
            </p>

            <div className="piaui-destaque-cards-container">
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
            
            <section className="hero-section">
                <h2>Encontre Eventos e Cursos Próximos de Você</h2>
                <p>Descubra workshops, seminários e conferências. Participe e comece a aprender hoje!</p>
            </section>

            <EventosPiauiDestaque />
            
            <main className="feed-main-content">
                <h2 className="section-title">Próximos Eventos Disponíveis</h2>
                {renderConteudo()}
            </main>
        </div>
    );
};

export default HomeFeed;