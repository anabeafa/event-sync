import React from 'react';
import "../../styles/organizador.css";

const LayoutOrganizador = ({ children, activePage }) => {

    const isActive = (pageName) => activePage === pageName ? 'active' : '';

    return (
        <>
            <div className="container">
                {children}
            </div>

         
            <nav className="nav-organizador">
                <div className="nav-item">
                    <a href="index.html" className={isActive('eventos')}> 
                        <i className="fas fa-calendar-alt"></i>
                        <span>Seus Eventos</span>
                    </a>
                </div>
                <div className="nav-item">
                    <a href="gestao-inscricoes.html" className={isActive('inscricoes')}>
                        <i className="fas fa-users"></i>
                        <span>Inscrições</span>
                    </a>
                </div>
                <div className="nav-item">
                    <a href="checkin.html" className={isActive('checkin')}>
                        <i className="fas fa-qrcode"></i>
                        <span>Check-in</span>
                    </a>
                </div>
                <div className="nav-item">
                    <a href="#" className={isActive('config')}>
                        <i className="fas fa-cog"></i>
                        <span>Config</span>
                    </a>
                </div>
            </nav>
        </>
    );
};

export default LayoutOrganizador;