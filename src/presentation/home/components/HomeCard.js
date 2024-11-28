import React from "react";
import "../../../style/home/components/HomeCard.css";

function HomeCard(props) {
    return(
        <>
            <div className="home-card">
                <div className="card-photo">
                    <img src={props.item.photo} />
                </div>
                <div className="card-content">
                    <h3>{props.item.name}</h3>
                    <p className="card-description">
                        {props.item.description}
                    </p>
                    <p className="card-price">S/ {props.item.cost}</p>
                </div>
            </div>
        </>
    )
}

export default HomeCard;