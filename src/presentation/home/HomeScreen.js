import {React, useEffect, useState, version} from "react";
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
import HomeCard from "./components/HomeCard";
import HomeCarrousel from "./components/HomeCarrousel";
import { getTypeOfPlace, placesByName } from "../../services/homeService";
import RecommendationsScreen from "../recommendations/Recommendations";

function HomeScreen() {

    let [searchValues, setSearchValues] = useState([]);

    const [inputText, setInputText] = useState("");
    let types = [1,2,3];
    let timeoutId = null;
    const [restaurants, setRestaurants] = useState([]);
    const [locals, setLocals] = useState([]);
    const [activities, setActivities] = useState([]);

    
    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            search(lowerCase);
        }, 500);
    };

    const search = async (text) => {
        try {
            if (text) {
                const result = await placesByName(text);
                if (result.status === 200) {
                    setSearchValues(result.data);
                } else {
                    setSearchValues([]);
                }
            } else {
                setSearchValues([]);
            }
        } catch (error) {
            console.error(error);
            setSearchValues([]);
        }
    };

    async function getPlaces() {
        types.forEach(async (e) => {
            const response = await getTypeOfPlace(e);
            if(e==1){
                setRestaurants(response.data)
            }else if(e==2){
                setLocals(response.data);
            }else if(e==3){
                setActivities(response.data);
            }

        });
    }

    let recommendations;
    const isPremium = sessionStorage.getItem('isPremium');
    if((/true/).test(isPremium)){
        recommendations = <RecommendationsScreen />
    }

    useEffect(() => {
        getPlaces();
    }, [])

    return ( 
        <div className="home-container">
            <Header />
            <div className="search-container">
                <SearchBar 
                    inputHandler={inputHandler}
                    input={inputText}
                    searchValues={searchValues} />
            </div>
            {recommendations}
            <HomeCarrousel 
                type={"Top 5 Restaurantes"}
                list={restaurants} />
            <HomeCarrousel 
                type={"Top 5 Atracciones"}
                list={locals} />
            <HomeCarrousel 
                type={"Top 5 Actividades"}
                list={activities} />

                
        </div>
    )
}

export default HomeScreen;