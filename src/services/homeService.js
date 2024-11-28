import { apiService } from "./apiService";

const mainService = '/main-service/api'

export const getTypeOfPlace= async (type) => {
    try{
        const response = await apiService.get(`${mainService}/top-places/${type}`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}