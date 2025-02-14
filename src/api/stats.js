import api from './axios.js';

export default {
    async statistic (filter) {
        try {
            const response = await api.get('/statistic-total', {
                params: filter
            });
    
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}