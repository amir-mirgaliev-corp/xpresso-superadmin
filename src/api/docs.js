import api from "./axios";

export default {
	async getDocuments() {
		try {
			const response = await api.get("/docs");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneDocument(id) {
		try {
			const response = await api.get(`/docs/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	async createDocument(data, name) {
		try {
			const response = await api.post(`/docs/${name}`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	async updateDocument(data, name) {
		try {
			const response = await api.put(`/docs/${name}`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	async deleteDocument(name) {
		try {
			const response = await api.delete(`/docs/${name}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
};
