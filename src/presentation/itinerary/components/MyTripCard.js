import React from "react";
import "../../../style/itinerary/components/MyTripCard.css";
let calendar = require("../../../assets/icons/itinerary-icon.svg")

function MyTripCard() {
    return(
        <>
            <div className="trip-card">
                <div className="trip-left">
                    <img src="https://www.lima2019.pe/sites/default/files/2019-07/iStock-458584553.jpg"/>
                </div>
                <div className="trip-right">
                    <h1>
                        Viaje 1
                    </h1>
                    <div className="trip-days">
                        <img src={calendar.default} />
                        Sep, 9 → Sep 15, 2024 
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyTripCard;