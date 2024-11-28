import React from "react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HomeCard from "./HomeCard";
import "../../../style/home/components/HomeCarrousel.css"

function HomeCarrousel(props) {


    let homeItems = [];
    if(props.list.length > 0){
        props.list.forEach((element) => {
            homeItems.push(
                <SwiperSlide>
                    <HomeCard item={element}/>
                </SwiperSlide>
            )
        });
    }


    return (
        <div className="home-carrousel">
            <h1>{props.type}</h1>
            <br/>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={4}
                slidesPerGroup={1}
                autoplay={{ delay: 3000 }} 
                loop={true} 
                navigation
            >
                {homeItems}
            </Swiper>
        </div>
    );
}

export default HomeCarrousel;
