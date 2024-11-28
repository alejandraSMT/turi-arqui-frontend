import { apiService } from './apiService';

const userServiceEndpoint = "/user-service/api";

export const registerUser = async (userData) => {
    try {
        const response = await apiService.post(`${userServiceEndpoint}/register`, userData);
        return response.data; // Devuelve la respuesta si es exitosa
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        throw error; // Lanza el error para manejarlo en la llamada
    }
};

export const validateRole = async () => {
    try{
        const response = await apiService.get(`${userServiceEndpoint}`);
        return response.data;
    }catch(error) {
        console.error(error);
        throw error;
    }
}
