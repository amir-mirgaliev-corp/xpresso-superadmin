import api from "./axios";

export default {
	async getCategories(chain_id) {
		try {
			const response = await api.get(`/products/category?chain_id=${chain_id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createCategory(data) {
		try {
			const response = await api.post("/products/category", data);
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateCategory(category_id, data) {
		try {
			const response = await api.patch(`/products/category/${category_id}`, data);
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteCategory(category_id) {
		try {
			const response = await api.delete(`/products/category/${category_id}`);
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},
};
