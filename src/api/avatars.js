import api from "./axios";

export default {
    async getAvatars () {
        try {
            const response = await api.get('/avatars');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getOneAvatar (id) {
        try {
            const response = await api.get(`/avatars/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async deleteAvatar (id) {
        try {
            const deleted = await api.delete(`/avatars/${id}`);
            return deleted.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async updateAvatar (id, data) {
        try {
            const updateAvatar = await api.patch(`/avatars/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return updateAvatar.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async createAvatar (data) {
        try {
            const newAvatar = await api.post('/avatars', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return newAvatar.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}