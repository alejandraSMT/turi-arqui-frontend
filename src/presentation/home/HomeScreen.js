import {React, useState, version} from "react";
import SearchBar from "./components/SearchBar";
import Header from "../../shared/header/Header";
import "../../style/home/HomeScreen.css";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Reviews from "../reviews/Reviews";

function HomeScreen() {

    let searchValues = ['Wonwoo', 'Mingyu', 'Coups'];

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return ( 
        <div className="home-container">
            <Header />
            <div className="search-container">
                <SearchBar 
                    inputHandler={inputHandler}
                    input={inputText}
                    searchValues={searchValues} />
            </div>
            <Reviews />
        </div>
    )
}

export default HomeScreen;