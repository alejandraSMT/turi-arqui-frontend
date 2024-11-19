import React from "react";
import "../../../style/shared/searchbar/SearchBarList.css"

function SearchBarList(props) {

    const filteredData = props.searchValues.filter((el) => {
        if (props.input === '') {
            return el;
        }
        else{
            return el.toLocaleLowerCase().includes(props.input);
        }

    });

    let list;
    if(props.input != '' && filteredData.length > 0){
        list = <div className="search-list">
            <ul>
                    {filteredData.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
        </div>
    }

    return (
        <>
            {list}
        </>
    )
}

export default SearchBarList;