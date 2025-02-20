import api from "./axios.js";

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
};
