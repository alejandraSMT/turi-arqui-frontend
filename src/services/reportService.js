import { apiService } from './apiService';

const repostService = "/reports-service/api";

export const sendReport = async (body) => {
    try{
        await apiService.post(`${repostService}/postReport/`, body)
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