import React from "react";
import "../../../style/itinerary/components/MyTripCard.css";
let calendar = require("../../../assets/icons/itinerary-icon.svg")
let people = require("../../../assets/icons/persons.svg")

function MyTripCard(props) {
    return(
        <>
            <div className="trip-card">
                <div className="trip-left">
                    <img src="https://www.lima2019.pe/sites/default/files/2019-07/iStock-458584553.jpg"/>
                </div>
                <div className="trip-right">
                    <h1>
                        {props.item.name}
                    </h1>
                    <div className="trip-days">
                        <img src={calendar.default} />
                        Duración: {props.item.duration_days}
                    </div>
                    <div className="trip-days">
                        <img src={people.default} />
                        Duración: {props.item.num_people}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyTripCard;