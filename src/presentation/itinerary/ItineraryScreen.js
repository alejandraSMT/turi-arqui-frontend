import React from "react";
import Header from "../../shared/header/Header";
import "../../style/itinerary/ItineraryScreen.css";
import MyTripCard from "./components/MyTripCard";
import { useNavigate } from "react-router-dom";



let titles = require("../../assets/json/titles.json");


function ItineraryScreen() {

    const navigate = useNavigate();

    function createItinerary() {
        navigate("/createItinerary")
    }

    return(
        <>
            <Header />
            <div className="itinerary-container">
                <div className="itinerary-header">
                    <h1>
                        {titles['my-itinerary']}
                    </h1>
                    <button onClick={createItinerary} className="secondary-button">Crear itinerario</button>
                </div>
                <br />
                <div className="itinerary-list">
                    <MyTripCard />
                    <MyTripCard />
                </div>
            </div>
        </>
    )
}

export default ItineraryScreen;