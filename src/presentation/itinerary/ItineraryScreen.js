import React, { useEffect, useState } from "react";
import Header from "../../shared/header/Header";
import "../../style/itinerary/ItineraryScreen.css";
import MyTripCard from "./components/MyTripCard";
import { useNavigate } from "react-router-dom";
import { getItinerary } from "../../services/itineraryService";
let titles = require("../../assets/json/titles.json");


function ItineraryScreen() {

    const navigate = useNavigate();

    const [itineraries, setItineraries] = useState([]);
    function createItinerary() {
        navigate("/createItinerary")
    }

    async function getItineraryList() {
        try {
            const result = await getItinerary();

            if(result.status != 200){
                console.error("Can't get itineraries");
                return;
            }

            setItineraries(result.data);

        }catch(error){
            console.error(error);
            throw error;
        }
    }
    
    useEffect(() => {
        getItineraryList();
    }, [])

    let list = [];
    if(itineraries.length > 0){
        itineraries.forEach((e) => {
            list.push(
                <MyTripCard item={e} />
            )
        });
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
                    {list}
                </div>
            </div>
        </>
    )
}

export default ItineraryScreen;