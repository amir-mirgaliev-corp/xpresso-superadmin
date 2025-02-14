import api from "./axios.js";

export default {
	async login(login, password) {
		try {
			const response = await api.post("/admin/auth", {
				login,
				password,
			});

			return response.data;
		} catch (error) {
			console.log(error);
			return error.status;
		}
	},

	async registration() {
		try {
			const response = await api.get("/admin/auth");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async profile() {
		try {
			const response = await api.get("/admin-profile");
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
};
