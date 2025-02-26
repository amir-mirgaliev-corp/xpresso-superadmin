import api from "./axios.js";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async login(login, password) {
		try {
			const response = await api.post("/superuser/auth/login", {
				login,
				password,
			});

			return response.data;
		} catch (error) {
			console.log(error);
			return error.status;
		}
	},

	async getProfile() {
		try {
			const response = await api.get("/superuser/auth/profile");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async changePassword(data) {
		try {
			const response = await api.put("/superuser/auth/change-password", data);
			toast.success("Пароль был успешно обновлен");
			return response.status;
		} catch (error) {
			if (error.status === 400) {
				toast.error("Неправильный старый пароль");
			} else {
				toast.error("Произошла ошибка, попробуйте позже");
			}

			console.log(error);
			return error.status;
		}
	},
};
