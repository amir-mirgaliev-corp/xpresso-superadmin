import api from './axios';

export default {
    async createDocument (data) {
        try {
            const response = await api.post('/docs', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
}