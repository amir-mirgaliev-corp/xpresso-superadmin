import { useToast } from "vue-toastification";
import api from "./axios";

const toast = useToast();

export default {
	async getPublications(filters) {
		try {
			const params = {
				search: filters?.search,
				from_date: filters?.from_date,
				to_date: filters?.to_date,
				page: filters?.page || 1,
				size: filters?.limit || 10,
			};

			const response = await api.get("/news/", { params });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getPublicationByID(id) {
		try {
			const response = await api.get(`/news/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async updatePublication(id, data) {
		try {
			const response = await api.put(`/superuser/faq/${id}`, data);
			toast.success("Вопрос был успешно обновлен");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при обновлении вопроса");
			console.log(error);
		}
	},

	async createPublication(data) {
		try {
			const response = await api.post("/superuser/news/", data);
			toast.success("Новость была успешно создана");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании новости");
			console.log(error);
		}
	},

	async deletePublication(id) {
		try {
			const response = await api.delete(`/superuser/news/${id}`);
			toast.success("Новость была успешно удалена");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при удалении новости");
			console.log(error);
		}
	},
};
