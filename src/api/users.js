import api from "./axios";

import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getUsers(filters) {
		try {
			const params = {
				size: filters?.limit || 10,
				page: filters?.page || 1,
				make_id: filters?.make_id,
				model_id: filters?.model_id,
				sort_by_orders: filters?.sort_by_orders,
				gender: filters?.gender,
				search: filters?.search,
			};

			const response = await api.get("/superuser/users/", { params });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getUserProfile(id) {
		try {
			const response = await api.get(`/superuser/user/profile/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getUserHistory(id, filter, pagination) {
		try {
			const response = await api.get(`/user_actions`, {
				params: {
					limit: pagination?.limit || 10,
					page: pagination?.page || 1,
					user_id: id,
					actionType: filter?.actionType,
				},
			});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getUserOrders(id, filter, pagination) {
		try {
			const response = await api.get(`/admin-user-by-order/${id}`, {
				params: {
					limit: pagination?.limit || 10,
					page: pagination?.page || 1,
					search: filter?.search,
					from_date: filter?.from_date,
					to_date: filter?.to_date,
				},
			});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async updateUserProfile(id, data) {
		try {
			const response = await api.patch(`/superuser/user/profile/${id}`, data);
			toast.success("Профиль успешно обновлен");
			return response.status;
		} catch (error) {
			console.log(error);

			if (error.status === 409) {
				toast.error("Данный логин уже используется");
			} else {
				toast.error("Произошла ошибка, попробуйте позже");
			}
		}
	},

	async blockUser(id) {
		try {
			const response = await api.post(`/superuser/user/block/${id}`);
			toast.success("Пользователь был заблокирован");
			return response.status;
		} catch (error) {
			toast.error("Произошла ошибка, попробуйте позже");
			console.log(error);
		}
	},

	async unblockUser(id) {
		try {
			const response = await api.post(`/superuser/user/unblock/${id}`);
			toast.success("Пользователь был разблокирован");
			return response.status;
		} catch (error) {
			toast.error("Произошла ошибка, попробуйте позже");
			console.log(error);
		}
	},

	async deleteUser(id) {
		try {
			const response = await api.delete(`/superuser/user/${id}`);
			toast.success("Пользователь был успешно удален");
			return response.status;
		} catch (error) {
			toast.error("Произошла ошибка, попробуйте позже");
			console.log(error);
		}
	},
};
