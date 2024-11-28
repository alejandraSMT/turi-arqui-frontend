import { apiService } from "./apiService";

const itineraryService = '/itinerary-service/api'

export const getItinerary = async () => {
    try{
        const response = await apiService.get(`${itineraryService}/itinerary/101`);
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
}