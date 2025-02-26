import api from "./axios";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getCommission() {
		try {
			const response = await api.get("/superuser/service_fee/");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async updateCommission(data) {
		try {
			const response = await api.put("/superuser/service_fee/", data);
			toast.success("Комиссия была успешно обновлена");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при обновлении комиссии");
			console.log(error);
		}
	},
};
