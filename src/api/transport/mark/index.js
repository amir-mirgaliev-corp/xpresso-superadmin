import { useToast } from "vue-toastification";
import api from "../../axios";

const toast = useToast();

export const transportMakeApi = {
	async getTransportMakeList() {
		try {
			const response = await api.get("/vehicle/make");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	async getTransportMakeById(make_id) {
		try {
			const response = await api.get(`/vehicle/make${make_id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createTransportMake(data) {
		try {
			const response = await api.post("/superuser/vehicle/make", data);
			toast.success("Марка транспорта создана успешно");
			return response.status;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при создании марки");
		}
	},

	async updateTransportMake(params, data) {
		try {
			const response = await api.patch(`/superuser/vehicle/make/${params.make_id}`, data, {
				params: {
					name: params.name,
				},
			});
			toast.success("Марка транспорта обновлена успешно");
			return response.status;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при обновлении марки");
		}
	},

	async deleteTransportMake(make_id) {
		try {
			const response = await api.delete(`/superuser/vehicle/make/${make_id}`, {
				params: { make_id },
			});
			toast.success("Марка транспорта успешно удалена");
			return response.status;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при удалении марки");
		}
	},
};
