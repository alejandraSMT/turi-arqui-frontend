import React from "react";
import "../../../style/review/ReviewComment.css";
import moment from "moment";
let reportIcon = require("../../../assets/icons/report.svg");

function ReviewComment(props){
    
    const img = 'https://preview.redd.it/men-in-kpop-appreciation-post-kim-mingyu-v0-4nzziy7l0n8d1.jpg?width=640&crop=smart&auto=webp&s=05f8b3d552289f9505ada2552918a6ae74f8a66d';

    return(
        <>
            <div className="comment-item">
                <div className="review-user">
                        <img className="review-user__photo" src={img}/>
                        <div className="review-user__data">
                            <p className="user-name">{props.comment.user.name}</p>
                            <p className="publish-date">Escrito el {moment(props.comment.publishDate).format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="review-user__report">
                            <img src={reportIcon.default}/>
                        </div>
                </div>
                <div className="comment-content">
                    <p>{props.comment.comment?props.comment.comment:''}</p>
                </div>
            </div>
        </>
    )
}

export default ReviewComment;