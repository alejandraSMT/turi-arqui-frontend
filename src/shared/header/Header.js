import { React, ReactComponent } from "react";
import "../../style/shared/Header.css"
let logo = require("../../assets/images/logo-turi-black.png")
let headerOption = require("../../assets/json/header.json");
let itinerary = require("../../assets/icons/itinerary-icon.svg");
let favorites = require("../../assets/icons/favorites.svg");

function Header() {

    let options = [];
    headerOption.options.forEach((element) => {
        options.push(
            <a href={element.href}>
                <div className="header-options__item">
                    {element.name}
                </div>
            </a>);
    });

    return (
        <div className="header">
            <img className="logo" src={logo}/>
            <div class="header-options">
                {options}
            </div>
            <div className="avatar-container">
                <a className="other-option"><img className="icon" src={favorites.default}/>Favoritos</a>
                <a className="other-option"><img className="icon" src={itinerary.default}/>Itinerario</a>
                <div className="avatar">
                    <div class="dropdown-content">
                        <a href="/">Mi perfil</a>
                        <a href="/">Cerrar sesión</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;