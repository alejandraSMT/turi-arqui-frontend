import { apiService } from './apiService';

const reviewsService = "/reviews-service/api";

export const fetchReviews = async (placeId) => {
  try {
    const response = await apiService.get(`${reviewsService}/reviews/${placeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postReview = async (body) => {
    try{
        await apiService.post(`${reviewsService}/postReview`, body)
        .then((response) => {
            console.log(response)
            return response.data;
        })
        .catch((error) => {
            console.error(error)
            return error;
        });

    }catch(error){
        throw error;
    }
}

export const getComments = async (reviewId) => {
    try{
        const response = await apiService.get(`${reviewsService}/getComments/${reviewId}`);
        return response;
    }catch(error){
        throw error;
    }
}

export const postComment = async (reviewId, body) => {
    try{
        await apiService.post(`${reviewsService}/postCommentToReview/${reviewId}`, body)
        .then((response) => {
            console.log(response);
            return response.data
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
    }catch(error){
        throw error;
    }
}

export const likeReview = async (reviewId, token) => {
    try{
        const response = await apiService.put(`${reviewsService}/likeReview/${reviewId}/${token}`);
        return response;
    }catch(error){
        console.error(error)
        throw error
    }
}

export const checkLike = async (reviewId, token) => {
    try{
        const response = await apiService.get(`${reviewsService}/checkLike/${reviewId}/${token}`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}