import { useToast } from "vue-toastification";
import api from "../../axios";

const toast = useToast();

export const transportModelApi = {
	async getTransportModelList(make_id) {
		try {
			const response = await api.get(`/vehicle/models/${make_id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getTransportModelById(model_id) {
		try {
			const response = await api.get(`/vehicle/model/${model_id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createTransportModel(data) {
		try {
			const response = await api.post("/superuser/vehicle/model/", data);
			toast.success("Модель транспорта создана успешно");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании модели транспорта");
			console.log(error);
		}
	},

	async updateTransportModel(model_id, data) {
		try {
			const response = await api.patch(`/superuser/vehicle/model/${model_id}`, data);
			toast.success("Модель транспорта успешно обновлена");
			return response.status;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при обновлении модели");
		}
	},

	async deleteTransportModel(model_id) {
		try {
			const response = await api.delete(`/superuser/vehicle/model/${model_id}`);
			toast.success("Модель транспорта успешно удалена");
			return response.status;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при удалении модели");
		}
	},
};
