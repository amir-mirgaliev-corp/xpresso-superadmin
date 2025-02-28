import { useToast } from "vue-toastification";
import api from "./axios";

const toast = useToast();

export default {
	async getDocuments() {
		try {
			const response = await api.get("/docs/");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneDocument(id) {
		try {
			const response = await api.get(`/doc/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	async createDocument(data) {
		try {
			const response = await api.post("/superuser/doc/", data);
			toast.success("Документ был успешно создан");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании документа");
			console.error(error);
		}
	},
	async updateDocument(id, data) {
		try {
			const response = await api.patch(`/superuser/doc/${id}`, data);
			toast.success("Документ был успешно обновлен");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при обновлении документа");
			console.error(error);
		}
	},
	async deleteDocument(id) {
		try {
			const response = await api.delete(`/superuser/doc/${id}`);
			toast.success("Документ был успешно удален");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при удалении документа");
			console.error(error);
		}
	},
};
