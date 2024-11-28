import React from "react";
import "../../../style/shared/searchbar/SearchBar.css";
import SearchBarList from "./SearchBarList";

let searchIcon = require("../../../assets/icons/icons8-búsqueda.svg");

function SearchBar({ inputHandler, input, searchValues }) {
    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <a className="search-icon">
                    <img src={searchIcon.default} alt="Search Icon" />
                </a>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Buscar..."
                    onChange={inputHandler}
                    value={input}
                />
                <SearchBarList input={input} searchValues={searchValues} />
            </div>
        </div>
    );
}

export default SearchBar;