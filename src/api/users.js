import api from "./axios";

export default {
	async getUsers(filter, pagination) {
		try {
			const params = {
				limit: pagination?.limit || 10,
				page: pagination?.page || 1,
				transport_mark: filter?.transport_mark,
				transport_model: filter?.transport_model,
				orders: filter?.orders_count_sort,
				search: filter?.search,
			};

			const response = await api.get("/admin-users", { params });

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getUserProfile(id) {
		try {
			const response = await api.get(`/admin-user-statistic-by-id/${id}`);
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
			const response = await api.put(`/admin-user-edit/${id}`, data);
			return response.status;
		} catch (error) {
			console.log(error);
			error.status;
		}
	},

	async deleteUser(id) {
		try {
			const response = await api.delete(`/user/${id}`);
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async banUser(data) {
		try {
			const banedUser = await api.put(`/admin/user/ban`, data);
			return banedUser.status;
		} catch (error) {
			console.log(error);
		}
	},
};
