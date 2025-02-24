import api from "./axios";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getCategories(chain_id) {
		try {
			const response = await api.get(`/superuser/categories/by_chain/${chain_id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createCategory(data) {
		try {
			const response = await api.post("/superuser/category/", data);
			toast.success("Категория была успешно создана");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateCategory(category_id, data) {
		try {
			const response = await api.patch(`/superuser/category/${category_id}`, data);
			toast.success("Категория была успешно обновлена");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteCategory(category_id) {
		try {
			const response = await api.delete(`/superuser/category/${category_id}`);
			toast.success("Категория была успешно удалена");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},
};
