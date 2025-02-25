import api from "./axios";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getChainProducts(chain_id, filters) {
		try {
			const params = {
				name: filters?.search,
				page: filters?.page || 1,
				size: filters?.limit || 10,
			};

			const response = await api.get(`/superuser/products/by_chain/${chain_id}`, { params });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneProduct(id) {
		try {
			const response = await api.get(`/product/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createProduct(data) {
		try {
			const response = await api.post("/superuser/product/", data);
			toast.success("Продукт был успешно создан");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании продукта");
			console.log(error);
		}
	},

	async updateProduct(id, data) {
		try {
			const response = await api.patch(`/superuser/product/${id}`, data);
			toast.success("Продукт был успешно обновлен");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при обновлении продукта");
			console.log(error);
		}
	},

	async deleteProduct(product_id) {
		try {
			const response = await api.delete(`/superuser/product/${product_id}`);
			toast.success("Продукт был успешно удален");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при удалении продукта");
			console.log(error);
		}
	},
};
