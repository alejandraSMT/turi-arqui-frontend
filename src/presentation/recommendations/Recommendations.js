import React, { useState } from 'react';
import '../../style/recommendations/RecommendationsScreen.css'; // Ruta correcta
import Header from '../../shared/header/Header'; // Importa el Header

const RecommendationCard = ({ id }) => {
    const [expanded, setExpanded] = useState(false);

    // Funci�n para alternar expansi�n
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="recommendation-card">
            <img
                src="https://via.placeholder.com/300x200"
                alt={`Rec ${id}`}
                className="recommendation-image"
            />
            <div className="recommendation-content">
                <p>Recomendaci�n {id}</p>
                <button className="btn-expand" onClick={toggleExpand}>
                    {expanded ? "Ver Menos" : "Ver M�s"}
                </button>
            </div>
            {expanded && (
                <div className="expanded-content">
                    <p>Detalles de la recomendaci�n {id}...</p>
                </div>
            )}
        </div>
    );
};

const RecommendationsScreen = () => {
    return (
        <div className="recommendations-screen">
            <Header /> {/* Incluyendo el Header aqu� */}

            <div className="recommendations-header">
                <h1>Recomendaciones personalizadas</h1> {/* T�tulo agregado */}
            </div>

            {/* Secci�n de recomendaciones con fondo gris */}
            <div className="recommendations-container-wrapper">
                <div className="recommendations-container">
                    {[1, 2, 3].map((id) => (
                        <RecommendationCard key={id} id={id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendationsScreen;
