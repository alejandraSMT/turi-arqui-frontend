import React from "react";
import "../../../style/home/components/HomeCard.css";
import { useNavigate } from "react-router-dom";

function HomeCard(props) {

    const navigate = useNavigate();

    function goToDetail() {
        navigate(`/detail/${props.item.id}`);
    }

    return(
        <>
            <div className="home-card" onClick={goToDetail}>
                <div className="card-photo">
                    <img src={props.item.photo} />
                </div>
                <div className="card-content">
                    <h3>{props.item.name}</h3>
                    <h4>{props.item.District.district_name}</h4>
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