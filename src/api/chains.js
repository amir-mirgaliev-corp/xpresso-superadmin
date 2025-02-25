import api from "./axios";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getChains(filters) {
		try {
			const params = {
				name: filters?.search,
				page: filters?.page || 1,
				size: filters?.limit || 10,
			};

			const response = await api.get("/superuser/chains/", { params });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneChain(id) {
		try {
			const response = await api.get(`/superuser/chain/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createChain(data) {
		try {
			const response = await api.post("/superuser/chain/", data);
			toast.success("Сеть была успешно создана");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteChain(id) {
		try {
			const response = await api.delete(`/superuser/chain/${id}`);
			toast.success("Сеть была успешно удалена");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateChain(id, data) {
		try {
			const response = await api.patch(`/superuser/chain/${id}`, data);
			toast.success("Сеть была успешно обновлена");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},
};
