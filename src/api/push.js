import { useToast } from "vue-toastification";
import api from "./axios";

const toast = useToast();

export default {
	async getNotifications(filters) {
		try {
			const params = {
				search: filters?.search || null,
				from_date: filters?.from_date,
				to_date: filters?.to_date,
				page: filters?.page || 1,
				size: filters?.limit || 10,
			};

			const response = await api.get("/superuser/push-notifications/", { params });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getNotificationByID(id) {
		try {
			const response = await api.get(`/superuser/push-notification/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async updateNotification(id, data) {
		try {
			const response = await api.patch(`/superuser/push-notification/${id}`, data);
			toast.success("Уведомление успешно обновлено");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при обновлении уведомления");
			console.log(error);
		}
	},

	async createNotification(data) {
		try {
			const response = await api.post("/superuser/push-notification/", data);
			toast.success("Уведомление успешно создано");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании уведомления");
			console.log(error);
		}
	},

	async deleteNotification(id) {
		try {
			const response = await api.delete(`/superuser/push-notification/${id}`);
			toast.success("Уведомление успешно удалено");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при удалении уведомления");
			console.log(error);
		}
	},
};
