import api from "./axios";

export default {
	async getOrderForDashboard(pagination) {
		try {
			const response = await api.get("/admin-orders-for-dashboard", {
				params: pagination,
			});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getAllOrdersByFilter(filter) {
		console.log(filter);

		try {
			const params = {
				limit: 9999999999,
				page: 1,
				status: filter?.status,
				from_date: filter?.from_date,
				to_date: filter?.to_date,
				search: filter?.search || undefined,
			};

			console.log(params);

			const response = await api.get("/admin-orders-by-filter", { params });

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async updateOrder(id, data) {
		try {
			const response = await api.patch(`/order/${id}`, data);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOrderById(id) {
		try {
			const response = await api.get(`/admin-orders/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async changeOrderStatus(id) {
		try {
			const response = await api.patch(`/admin-order-status/${id}`);
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async cancelOrder(id, reason) {
		try {
			const response = await api.put(`/admin-order-cancel/${id}`, { reason });
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},
};
