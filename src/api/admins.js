import api from "./axios";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getChainAdmins(id, filters) {
		try {
			const params = {
				name: filters?.search,
				page: filters?.page || 1,
				size: filters?.limit || 10,
			};

			const response = await api.get(`/superuser/administrators/chain/${id}`, { params });
			return response.data;
		} catch (error) {
			console.log(error);
			return error.status;
		}
	},

	async getBranchAdmins(id, filters) {
		try {
			const params = {
				name: filters?.search,
				page: filters?.page || 1,
				size: filters?.limit || 10,
			};

			const response = await api.get(`/superuser/administrators/branch/${id}`, { params });
			return response.data;
		} catch (error) {
			console.log(error);
			return error.status;
		}
	},

	async createChainAdmin(data) {
		try {
			const response = await api.post("/superuser/administrator/chain/", data);
			toast.success("Администратор был успешно создан");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании администратора");
			console.log(error);
		}
	},

	async createBranchAdmin(data) {
		try {
			const response = await api.post("/superuser/administrator/branch/", data);
			toast.success("Администратор был успешно создан");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при создании администратора");
			console.log(error);
		}
	},

	async updateAdmin(data) {
		try {
			const { id, ...restData } = data;
			const response = await api.put(`/superuser/administrator/${id}`, restData);
			toast.success("Администратор был успешно обновлен");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при обновлении администратора");
			console.log(error);
		}
	},

	async updateAdminPassword(id, newPassword) {
		try {
			const response = await api.patch(`/superuser/administrator/update_password/${id}`, {
				password: newPassword,
			});
			toast.success("Пароль был успешно обновлен");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при обновлении пароля");
			console.log(error);
		}
	},

	async deleteAdmin(id) {
		try {
			const response = await api.delete(`/superuser/administrator/${id}`);
			toast.success("Администратор был успешно удален");
			return response.status;
		} catch (error) {
			toast.error("Ошибка при удалении администратора");
			console.log(error);
		}
	},
};
