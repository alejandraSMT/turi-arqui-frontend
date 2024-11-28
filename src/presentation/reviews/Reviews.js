import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import ReviewItem from "./components/ReviewItem";
import { fetchReviews } from "../../services/reviewService";

import "../../style/review/Reviews.css";
import ReviewForm from "./components/ReviewForm";
import ReportModal from "./components/report/ReportModal";
import { useParams } from "react-router-dom";
import Header from "../../shared/header/Header";
let titles = require("../../assets/json/titles.json");

function Reviews() {
    const { id } = useParams();

    const [openSendReview, setOpenSendReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [review, setReview] = useState('');
   
    
    async function fetchData() {
        try {
          const result = await fetchReviews(id);
          setReviews(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
  // useEffect block
    useEffect(() => {
         fetchData();
    }, []);


    function onButtonClick(){
        setOpenSendReview(true);
    }

    function closeReviewForm(){
        setOpenSendReview(false);
    }

    let form;
    if(openSendReview){
        form = <ReviewForm closeReviewForm={closeReviewForm} placeId={id}/>
    }

    let showButton;
    if(!openSendReview){
        showButton = <button onClick={onButtonClick} className="secondary-button">Agregar reseña</button>
    }

    let reviewsSection = [];
    if(reviews.length > 0){
        reviews.forEach((element) => {
            reviewsSection.push(
                <ReviewItem
                    item={element}
                    onReportClick={onReportClick}
                />
            )
        });
    }

    function onReportClick(id) {
        setOpenModal(true);
        setReview(id);
    }

    return (
        <>
            <Header />
            {openModal && <ReportModal reviewId={review} setOpenModal={setOpenModal} />}
            <div className="reviews-container">
                <div className="top">
                    <h2>{titles["review-title"]}</h2>
                    {showButton}
                </div>
                {form}
                {reviewsSection}
            </div>
        </>
    )
}

export default Reviews;