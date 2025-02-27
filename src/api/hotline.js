import api from "./axios";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getHotline() {
		try {
			const response = await api.get("/superuser/hotline/");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async updateHotline(data) {
		try {
			const response = await api.put("/superuser/hotline/", data);
			toast.success("Номер был успешно обновлен");
			return response.status;
		} catch (error) {
			if (error.status === 422) {
				toast.error("Неправильный формат телефона");
			} else {
				toast.error("Ошибка при обновлении номера");
			}
			console.log(error);
		}
	},
};
