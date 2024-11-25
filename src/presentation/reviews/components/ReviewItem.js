import React, { useEffect, useState } from "react";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
import "../../../style/review/ReviewItem.css";
import ReviewComment from "./ReviewComment";
import ReviewSendComment from "./ReviewSendComment";
import { getComments, likeReview } from "../../../services/reviewService";
let commentIcon = require("../../../assets/icons/comment.svg");
let likeOutline = require("../../../assets/icons/like-outline.svg");
let likeFill = require("../../../assets/icons/like-fill.svg");
let reportIcon = require("../../../assets/icons/report.svg");

function ReviewItem(props) {
    const img = 'https://i.pinimg.com/736x/08/45/56/0845569181615a9cc53014cf24382400.jpg';

    const [showComments, setShowComments] = useState(false);
    const [alreadyCalled, setAlreadyCalled] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState(false);

    async function fetchComments() {
        try {
          const result = await getComments(props.item._id);
          console.log(result);

          if(result.status !== 200){
            console.error('Something went wrong fetching comments');
            return
          }

          setComments(Array.from(result.data.comments));
          setAlreadyCalled(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    async function checkLike() {
        try{
            const result = await checkLike(props.item._id, '673e3145a36b9ff18ad8918f');
            console.log(result);
        }catch(error){
            console.error("Error checking if user liked: ", error);
        }
    }

    async function giveLike() {
        try{
            const result = await likeReview(props.item._id, '673e3145a36b9ff18ad8918f');
            if(result.status !== 200){
                return
            }
            setIsLiked(true);
        }catch(error){
            console.error(error);
        }
    }

    function clickShowComments() {
        if(!alreadyCalled){
            fetchComments();
        }
        setShowComments(!showComments);
    }

    function onLikeClick() {
        if(!isLiked){
            giveLike();
        } else {

        }
    }

    function handleClick() {
        props.onReportClick(props.item._id)
    }

    let commentsList = [];
    if(comments.length > 0){
        Array.from(comments).forEach((element) => {
            commentsList.push(
                <ReviewComment comment={element} />
            )
        })
    }

    let commentSection;
    if(showComments){
        commentSection = 
        <div className="review-comments">
            {commentsList}
            <ReviewSendComment reviewId={props.item._id} setShowComments={setShowComments}/>
        </div>
    }

    return (
        <>
            <div className="review-item">
                <div className="review-container">
                    <div className="review-user">
                        <img className="review-user__photo" src={img}/>
                        <div className="review-user__data">
                            <p className="user-name">{props.item.user.name}</p>
                            <p className="publish-date">Publicado el {moment(props.item.date).format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="review-user__report">
                            <img src={reportIcon.default} onClick={handleClick}/>
                        </div>
                    </div>
                    <ReactStars
                        count={5}
                        value={props.item.rating}
                        edit={false}
                        isHalf={true}
                        size={40}
                        activeColor="#ffd700"
                    />
                    <div className="review-text">
                        <p className="review-title">{props.item.title?props.item.title:''}</p>
                        <p className="review-description">{props.item.description?props.item.description:''}</p>
                    </div>
                    <div className="review-footer">
                        <div className="review-footer__item">
                            <img onClick={onLikeClick} src={isLiked? likeFill.default: likeOutline.default}/>
                            <p>{props.item.countLike}</p>
                        </div>
                        <div className="review-footer__item">
                            <img onClick={clickShowComments} src={commentIcon.default} />
                            <p>{props.item.countComments}</p>
                        </div>
                    </div>
                    {commentSection}
                </div>
            </div>
        </>
    )
}

export default ReviewItem;