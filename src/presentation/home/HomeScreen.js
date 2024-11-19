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

function HomeScreen() {

    let searchValues = ['Wonwoo', 'Mingyu', 'Coups'];

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return ( 
        <>
            <Header />
            <div className="search-container">
                <SearchBar 
                    inputHandler={inputHandler}
                    input={inputText}
                    searchValues={searchValues} />
            </div>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={3}
                autoplay={true}
                loop={true}
                navigation
                pagination={{clickable: true}}
                >
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </>
    )
}

export default HomeScreen;