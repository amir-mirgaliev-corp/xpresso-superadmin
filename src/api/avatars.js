import { useToast } from "vue-toastification";
import api from "./axios";

const toast = useToast();

export default {
	async getAvatars() {
		try {
			const response = await api.get("/avatars/");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteAvatar(id) {
		try {
			const deleted = await api.delete(`/superuser/avatars/${id}`);
			toast.success("Аватарка успешно удалена");
			return deleted;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при удалении аватарки");
		}
	},

	async updateAvatar(id, data) {
		try {
			const updateAvatar = await api.put(`/superuser/avatars/${id}`, data);
			toast.success("Аватарка успешно обновлена");
			return updateAvatar.data;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при обновлении аватарки");
		}
	},

	async createAvatar(data) {
		try {
			const newAvatar = await api.post("/superuser/avatars/", data);
			toast.success("Аватарка создана успешно");
			return newAvatar;
		} catch (error) {
			console.log(error);
			toast.error("Ошибка при создании аватарки");
		}
	},
};
