import React from "react";
import "../../../style/shared/searchbar/SearchBar.css"
import SearchBarList from "./SearchBarList";
let searchIcon = require("../../../assets/icons/icons8-búsqueda.svg")

function SearchBar(props) {

    return(
        <>
            <div className="searchbar">
                <a className="search-icon"><img src={searchIcon.default}/></a>
                <input className="search-input" type="text" placeholder="Buscar..." onChange={props.inputHandler}/>
                <SearchBarList
                    input={props.input}
                    searchValues = {props.searchValues} />
            </div>
        </>
    )
}

export default SearchBar;