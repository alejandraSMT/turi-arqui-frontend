import React, { useState } from "react";
import "../../../style/review/ReviewForm.css";
import ReactStars from "react-rating-stars-component";
import { postReview } from "../../../services/reviewService";


function ReviewForm(props) {
    const ratingChanged = (newRating) => {
        setRating(newRating)
        console.log(newRating);
    };
    
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function onCancel(){
        props.closeReviewForm();
        setRating(0);
        setTitle('');
        setDescription('');
    }

    async function postAReview(body) {
        try {
          const result = await postReview(body);
          console.log(result);
          return result;
        } catch (error) {
          console.error('Error posting review:', error);
          return error;
        }
    }

    function onSubmit(){

        const body = {
            placeId: props.placeId,
            rating: rating,
            title: title,
            description: description,
            user: {
                name: "Alejandra"
            }
        }
        const response = postAReview(body);
        if(response.status !== 500){
            window.location.reload();
            onCancel();
        };
    }

    return (
        <div className="review-form">
            <div className="input-element">
                <label>¿Cómo calificarías tu experiencia?</label>
                <ReactStars
                    count={5}
                    value={rating}
                    onChange={ratingChanged}
                    isHalf={true}
                    size={40}
                    activeColor="#ffd700"
                />
            </div>
            <div className="input-element">
                <label htmlFor="title">Título <span>(Opcional)</span></label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onInput={e => setTitle(e.target.value)}
                    placeholder="Ingresa un título a tu review"/>
            </div>
            <div className="input-element">
                <label htmlFor="description">Deja tu comentario <span>(Opcional)</span></label>
                <textarea
                    type="text"
                    id="description"
                    maxLength={1200}
                    value={description}
                    onInput={e => setDescription(e.target.value)}
                    placeholder="Ingresa un comentario..."/>
            </div>
            <div className="footer">
                <button onClick={onCancel} className="secondary-button">Cancelar</button>
                <button onClick={onSubmit} className="primary-button">Enviar reseña</button>
            </div>
        </div>
    )
}

export default ReviewForm;