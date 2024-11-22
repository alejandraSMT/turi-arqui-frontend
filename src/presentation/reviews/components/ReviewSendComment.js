import React, { useState } from "react";
import "../../../style/review/ReviewSendComment.css";
import { postComment } from "../../../services/reviewService";

function ReviewSendComment(props) {

    const user = {
        name: "Alejandra San Martin",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiGoQIeSv1tJwbjk_log0w7PWeYDfLiXHd_A&s"
    }

    const [commentText, setCommentText] = useState("");
    async function postAComment() {
        try {
            const body = {
                name: "Alejandra San Martin",
                comment: commentText
            }
          const result = await postComment(props.reviewId, body);
          console.log(result);
          return result;
        } catch (error) {
          console.error('Error commenting on review:', error);
          return error;
        }
    }

    function onCancel() {
        setCommentText('');
        props.setShowComments(false);
    }

    function onSubmit() {
        const response = postAComment();
        if(response.status !== 500){
            window.location.reload();
            setCommentText('');
        };
    }


    return (
        <>
            <div className="my-comment-container">
                <div className="review-user">
                        <img className="review-user__photo" src={user.photo}/>
                        <div className="review-user__data">
                            <p className="user-name">{user.name}</p>
                        </div>
                </div>
                <textarea
                    typeof="text"
                    value={commentText}
                    onInput={(e) => setCommentText(e.target.value)}
                    placeholder="Ingresa tu comentario"
                    maxLength={1200}
                />
                <div className="comment-footer">
                    <button onClick={onCancel} className="secondary-button">Cancelar</button>
                    <button onClick={onSubmit} className="primary-button">Enviar</button>
                </div>
            </div>
        </>
    )
}

export default ReviewSendComment;