import { useToast } from "vue-toastification";
import api from "./axios";

const toast = useToast();

export default {
	async getQuestions() {
		try {
			const response = await api.get("/faq/");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneQuestion(id) {
		try {
			const response = await api.get(`/faq/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteQuestion(id) {
		try {
			const response = await api.delete(`/superuser/faq/${id}`);
			toast.success("Вопрос был успешно удален");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при удалении вопроса");
			console.log(error);
		}
	},

	async updateQuestion(id, data) {
		try {
			const response = await api.put(`/superuser/faq/${id}`, data);
			toast.success("Вопрос был успешно обновлен");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при обновлении вопроса");
			console.log(error);
		}
	},

	async createQuestion(data) {
		try {
			const response = await api.post("/superuser/faq/", data);
			toast.success("Вопрос был успешно создан");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании вопроса");
			console.log(error);
		}
	},
};
