import api from "./axios";

export default {
	async getAllTransactions(filters, pagination) {
		try {
			const response = await api.get("/transactions", {
				params: {
					limit: pagination?.limit,
					page: pagination?.page,
					search_field: filters?.search_field || "user_name",
					search: filters?.search,
				},
			});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
};
