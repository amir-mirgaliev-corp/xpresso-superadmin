import api from "./axios";

export default {
    async updateMyAdminAccount (id, data) {
        try {
            const response = await api.put(`/admin/${id}`, data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}