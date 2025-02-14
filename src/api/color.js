import api from "./axios";

export default {
    async getColor () {
        try {
            const response = await api.get('/color');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getOneColor (id) {
        try {
            const response = await api.get(`/color/${id}`)
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async createColor (data) {
        try {
            const newColor = await api.post('/color', data);
            return newColor.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async updateColor (id, data) {
        try {
            const response = await api.patch(`/color/${id}`, data);
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async deleteColor (id) {
        try {
            const response = await api.delete(`/color/${id}`,);
            return response.status; 
        }
        catch (error) {
            console.log(error);
        }
    },
}