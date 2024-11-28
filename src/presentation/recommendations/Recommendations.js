import React, { useState } from 'react';
import '../../style/recommendations/RecommendationsScreen.css'; // Ruta correcta
import Header from '../../shared/header/Header'; // Importa el Header

const RecommendationCard = ({ id, name, image, description, details }) => {
    const [expanded, setExpanded] = useState(false);

    // Función para alternar expansión
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="recommendation-card">
            <img
                src={image}
                alt={`Rec ${id}`}
                className="recommendation-image"
            />
            <div className="recommendation-content">
                <h3>{name}</h3>
                <p>{description}</p>
                <button
                    className="btn-expand"
                    onClick={toggleExpand}
                >
                    {expanded ? "Ver Menos" : "Ver Mas"}
                </button>
            </div>
            {expanded && (
                <div className="expanded-content">
                    <p><strong>Ubicacion:</strong> {details.location}</p>
                    <p><strong>Precio promedio:</strong> {details.price}</p>
                    <p><strong>Servicios:</strong> {details.services}</p>
                </div>
            )}
        </div>
    );
};

const RecommendationsScreen = () => {
    const recommendations = [
        {
            id: 1,
            name: "Hotel Ocean View",
            image: "https://images.trvl-media.com/lodging/18000000/17440000/17436300/17436297/5232e6e9.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
            description: "Un hotel de lujo con vistas al mar, ideal para tus vacaciones.",
            details: {
                location: "Miami, FL",
                price: "$200 por noche",
                services: "Spa, Gimnasio, Restaurante, Piscina"
            }
        },
        {
            id: 2,
            name: "Le Meurice",
            image: "https://www.dorchestercollection.com/media/twhmbdzd/le-meurice-belle-etoile-suite-terrace2.jpg?rxy=0.5112781954887218%2C0.5500654526753782&width=1013&height=570&rmode=crop",
            description: "Hotel de lujo en el corazon de Paris, con vistas espectaculares de la Torre Eiffel.",
            details: {
                location: "Paris, Francia",
                price: "$500 por noche",
                services: "Restaurante Michelin, Spa, Vistas a la Torre Eiffel"
            }
        },
        {
            id: 3,
            name: "Casa de Campo Resort",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/5f/bf/56/oceanfront-villa-at-casa.jpg?w=700&h=-1&s=1",
            description: "Un resort todo incluido en la costa de la Republica Dominicana, ideal para unas vacaciones relajantes.",
            details: {
                location: "Republica Dominicana",
                price: "$300 por noche",
                services: "Todo incluido, Golf, Spa, Actividades acuaticas"
            }
        },
    ];

    return (
        <div className="recommendations-screen">
            <Header />
            <div className="recommendations-header">
                <h1>Recomendaciones Personalizadas</h1>
                <h2>Mejora tu experiencia</h2>
            </div>

            <div className="recommendations-container">
                {recommendations.map((rec) => (
                    <RecommendationCard
                        key={rec.id}
                        id={rec.id}
                        name={rec.name}
                        image={rec.image}
                        description={rec.description}
                        details={rec.details}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendationsScreen;
