import React from "react";
import "../../../style/shared/searchbar/SearchBarList.css";

function SearchBarList(props) {
    const filteredData = props.searchValues.filter((el) => {
        if (!el || typeof el.name !== "string") return false;

        if (props.input === '') {
            return true;
        } else {
            return el.name.toLocaleLowerCase().includes(props.input.toLocaleLowerCase());
        }
    });

    let list;
    if (props.input !== '' && filteredData.length > 0) {
        list = (
            <div className="search-list">
                <ul>
                    {filteredData.map((item) => (
                        // Usar el campo "id" como clave única
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return <>{list}</>;
}

export default SearchBarList;
