import api from "./axios";

export default {
    async getAvatars () {
        try {
            const response = await api.get('/avatars/');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async deleteAvatar (id) {
        try {
            const deleted = await api.delete(`/avatars/${id}`);
            return deleted;
        }
        catch (error) {
            console.log(error);
        }
    },

    async updateAvatar (id, data) {
        try {
            const updateAvatar = await api.put(`/avatars/${id}`, data)

            return updateAvatar.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async createAvatar (data) {
        try {
            const newAvatar = await api.post('/avatars/', data)

            return newAvatar;
        }
        catch (error) {
            console.log(error);
        }
    }
}