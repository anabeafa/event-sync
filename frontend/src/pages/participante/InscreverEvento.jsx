import "../../styles/participante.css";

export default function InscreverEvento() {
    const eventos = [
        {
            id: 1,
            titulo: "Congresso de Tecnologia",
            descricao: "Um evento completo com palestras e workshops.",
            data: "12/05/2025"
        },
        {
            id: 2,
            titulo: "Feira de Inovação",
            descricao: "Exposição de startups e produtos inovadores.",
            data: "22/06/2025"
        }
    ];

    return (
        <div className="part-container">
            <div className="part-content">

                <h1 className="part-title">Eventos Disponíveis</h1>

                <div className="part-grid">
                    {eventos.map(evento => (
                        <div key={evento.id} className="part-event-card">
                            <h2 className="part-event-title">{evento.titulo}</h2>
                            <p className="part-event-desc">{evento.descricao}</p>
                            <p className="part-event-info">Data: {evento.data}</p>
                            <button className="part-btn">Inscrever-se</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
