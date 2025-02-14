import api from "./axios"

export default {
    async getLeaders () {
        try {
            const response = await api.get('/top-rating');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}