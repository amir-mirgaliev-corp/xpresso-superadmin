import api from "./axios"

export default {
    async getProfitGraphics (filter) {
        try {
            const response = await api.get('/statistic-profit-branch', {
                params: filter
            });

            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },
    
    async getProductGraphics (filter) {
        try {
            const response = await api.get('/statistic-profit-product', {
                params: filter
            });

            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}