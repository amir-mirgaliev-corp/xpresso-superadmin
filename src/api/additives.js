import api from "./axios";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getAdditives(chain_id) {
		try {
			const response = await api.get(`/superuser/additives/by_chain/${chain_id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createAdditive(data) {
		try {
			const response = await api.post("/superuser/additive/", data);
			toast.success("Добавка была успешно создана");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateAdditive(additive_id, data) {
		try {
			const response = await api.patch(`/superuser/additive/${additive_id}`, data);
			toast.success("Добавка была успешно обновлена");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteAdditive(additive_id) {
		try {
			const response = await api.delete(`/superuser/additive/${additive_id}`);
			toast.success("Добавка была успешно удалена");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},
};
