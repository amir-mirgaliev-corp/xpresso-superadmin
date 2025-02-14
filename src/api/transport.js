import api from "./axios";

export default {
    async getTransport (params) {
        try {
            const response = await api.get('/transport', {
                params
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getTransportModel (params) {
        try {
            const response = await api.get('/transports/model', {
                params
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getTransportCategory (params) {
        try {
            const response = await api.get('/transports/category');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getOneTransport (id) {
        try {
            const response = await api.get(`/transport/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }   
    },

    async getOneTransportModel (id) {
        try {
            const response = await api.get(`/transports/model/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getOneTransportCategory (id) {
        try {
            const response = await api.get(`/transports/category/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async createTransport (data) {
        try {
            const response = await api.post('/transport', data);
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async createTransportModel (data) {
        try {
            const response = await api.post('/transports/model', data);
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async createTransportCategory (data) {
        try {
            const response = await api.post('/transports/category', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async updateTransport (data, id) {
        try {
            const response = await api.patch(`/transport/${id}`, data);
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async updateTransportModel (data, id) {
        try {
            const response = await api.patch(`/transports/model/${id}`, data);
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async updateTransportCategory (data, id) {
        try {
            const response = await api.patch(`/transports/category/${id}`, data);
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async deleteTransport (id) {
        try {
            const response = await api.delete(`/transport/${id}`,);
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async deleteTransportModel (id) {
        try {
            const response = await api.delete(`/transports/model/${id}`,);
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    },

    async deleteTransportCategory (id) {
        try {
            const response = await api.delete(`/transports/category/${id}`,);
            return response.status; 
        }
        catch (error) {
            console.log(error);
        }
    },
}