import { apiService } from './apiService';

const authServiceEndpoint = "/auth-service/api";

export const loginUser = async (credentials) => {
    try {
        const response = await apiService.post(`${authServiceEndpoint}/login`, credentials);
        return response.data; // Devuelve los datos (como el JWT)
    } catch (error) {
        console.error("Error en el inicio de sesión:", error.response?.data || error.message);
        throw error.response?.data || error; // Lanza un error más claro
    }
};
