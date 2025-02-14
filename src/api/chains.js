import api from "./axios";

export default {
	async getChains(pagination) {
		try {
			const response = await api.get("/chain", {
				params: {
					limit: pagination?.limit || 10,
					page: pagination?.page || 1,
				},
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneChain(id) {
		try {
			const response = await api.get(`/chain/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createChain(data) {
		try {
			const newChain = await api.post("/chain", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return newChain.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteChain(id) {
		try {
			const response = await api.delete(`/chain/${id}`);
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateChain(id, data) {
		try {
			const updatedChain = await api.put(`/chain/${id}`, data);
			return updatedChain.status;
		} catch (error) {
			console.log(error);
		}
	},
};
