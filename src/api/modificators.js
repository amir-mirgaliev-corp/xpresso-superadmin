import api from "./axios";

export default {
	async getModificators(id, params) {
		try {
			const response = await api.get(`/modificators/${id}`, {
				params,
			});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneModificator(id) {
		try {
			const response = await api.get(`/modificator/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createModificator(data) {
		try {
			const response = await api.post("/modificator", data);
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateModificators(id, data) {
		try {
			const updatedModificator = await api.patch(`/modificator/${id}`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			return updatedModificator.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteModificator(id) {
		try {
			const response = await api.delete(`/modificator/${id}`);
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},
};
