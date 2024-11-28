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

export const placesByName = async (name) => {
    try{
        const response = await apiService.get(`${mainService}/searchPlace?name=${name}`);
        return response
    }catch(error){
        console.error(error);
        throw error;
    }
}