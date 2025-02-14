import api from "./axios"

export default {
    async getCommission () {
        try {
            const response = await api.get('/work-service');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}