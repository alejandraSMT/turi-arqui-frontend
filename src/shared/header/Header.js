import { React, ReactComponent } from "react";
import "../../style/shared/Header.css"
import { Link } from "react-router-dom";
let logo = require("../../assets/images/logo-turi-black.png")
let headerOption = require("../../assets/json/header.json");
let itinerary = require("../../assets/icons/itinerary-icon.svg");
let favorites = require("../../assets/icons/favorites.svg");
let sideMenu = require("../../assets/icons/side-menu.svg");

function Header() {

    let options = [];
    headerOption.options.forEach((element) => {
        options.push(
            <Link to={element.href}>
                <a>
                    <div className="header-options__item">
                        {element.name}
                    </div>
                </a>
            </Link>);
    });

    let sideBarOptions = [];
    headerOption.options.forEach((element) => {
        sideBarOptions.push(
            <a href={element.href}>{element.name.charAt(0).toUpperCase() + element.name.slice(1).toLowerCase()}</a>
        )
    })

    return (
        <>
            <div className="header">
                <a className="logo" href="/"><img src={logo}/></a>
                <div class="header-options">
                    {options}
                </div>
                <div className="avatar-container">
                    <a className="other-option"><img className="icon" src={favorites.default}/>Favoritos</a>
                    <Link to="/itinerary"><a className="other-option"><img className="icon" src={itinerary.default}/>Itinerario</a></Link>
                    <div className="avatar">
                        <div class="dropdown-content">
                            <a href="/">Mi perfil</a>
                            <a href="/">Cerrar sesión</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-mobile">
                <div className="header-mobile__side">
                    <div class="side-bar">
                        <img className="side" src={sideMenu.default}/>
                        <div class="side-dropdown">
                            {sideBarOptions}
                        </div>
                    </div>
                    
                </div>
                <a className="logo" href="/"><img src={logo}/></a>
                <div className="avatar">
                    <div class="dropdown-content">
                        <a href="/">Mi perfil</a>
                        <a href="/">Cerrar sesión</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;