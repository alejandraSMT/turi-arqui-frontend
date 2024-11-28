import { apiService } from "./apiService";

const blogService = '/blog-service/api/';

export const fetchComments = async () => {
    try{
        const response = await apiService.get(
            `${blogService}/getComentarios`
          );
          return response.data;
    }catch(error){
        console.error('Error fetching blog comments: ', error);
        throw error;
    }
}

export const createComment = async (body) => {
    try{
        const response = await apiService.post(
            `${blogService}/createComentario`, body
        )
        return response;
    }catch(error){
        console.error('Error posting comment in blog: ', error);
        throw error;
    }
}