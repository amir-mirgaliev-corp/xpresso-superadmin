import { useToast } from "vue-toastification";
import api from "../../axios";

const toast = useToast();

export const transportColorApi = {
	async getTransportColorList() {
		try {
			const response = await api.get("/superuser/vehicle/color");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getTransportColorById(color_id) {
		try {
			const response = await api.get(`/superuser/vehicle/color/${color_id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createTransportColor(data) {
		try {
			const response = await api.post("/superuser/vehicle/color", data);
			toast.success("Цвет транспорта создана успешно");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании цвета");
			console.log(error);
		}
	},

	async updateTransportColor(color_id, data) {
		try {
			const response = await api.patch(`/superuser/vehicle/color/${color_id}`, data);
			toast.success("Цвет транспорта обновлен успешно");
			return response.status;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при обновлении цвета");
		}
	},

	async deleteTransportColor(color_id) {
		try {
			const response = await api.delete(`/superuser/vehicle/color/${color_id}`, {
				params: { color_id },
			});
			toast.success("Цвет транспорта успешно удален");
			return response.status;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при удалении цвета");
		}
	},
};
