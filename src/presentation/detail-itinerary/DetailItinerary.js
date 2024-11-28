import React from "react";

import "../../style/itinerary-detail/ItineraryDetail.css"
import Header from "../../shared/header/Header";
let calendar = require("../../assets/icons/itinerary-icon.svg");

function DetailItinerary() {

    const style = {
        backgroundImage: "url('https://www.lima2019.pe/sites/default/files/2019-07/iStock-458584553.jpg')"
      };
    return(
        <>
            <Header />
            <div className="itinerary-detail-container">
                <div className="detail-itinerary-header" style={style}>
                    <h1>Mi Viaje</h1>
                    <div className="detail-trip-days">
                        <img src={calendar.default} />
                        Sep, 9 → Sep 15, 2024 
                    </div>
                </div>
                <p>¿De qué se trata este viaje?</p>
                <div className="itinerary-detail-list">
                    <h3>Itinerario</h3>
                </div>
            </div>
        </>
    )
}

export default DetailItinerary;