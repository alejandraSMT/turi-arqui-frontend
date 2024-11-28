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
import { getTypeOfPlace } from "../../services/homeService";

function HomeScreen() {

    let searchValues = ['Wonwoo', 'Mingyu', 'Coups'];

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    let types = [1,2,3];
    const [restaurants, setRestaurants] = useState([]);
    const [locals, setLocals] = useState([]);
    const [activities, setActivities] = useState([]);

    /*
    async function fetchData() {
        try {
          const result = await fetchReviews(placeId);
          setReviews(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
  // useEffect block
    useEffect(() => {
         fetchData();
    }, []);
    */

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

    console.log("RESTAURANTES: ", restaurants);
    console.log("LOCALS: ", locals);
    console.log("ACTIVIDADES: ", activities);

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