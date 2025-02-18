import api from "./axios";

export default {
    async getQuestions () {
        try {
            const response = await api.get('/faq');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getOneQuestion (id) {
        try {
            const response = await api.get(`/faq/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async deleteQuestion (id) {
        try {
            const deleted = await api.delete(`/faq/${id}`);
            return deleted.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async updateQuestion (id, data) {
        try {
            const updateQuestion = await api.put(`/faq/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return updateQuestion.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async createQuestion (data) {
        try {
            const newQuestion = await api.post('/daq', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return newQuestion.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}