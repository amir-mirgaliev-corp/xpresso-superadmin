import axios from "axios";
import convertKeysToCamelCase from "@/utils/translateToCamelCase";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
	baseURL: base_url,
	withCredentials: false,
	//timeout: 1500,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	},
	validateStatus: status => {
		return (status >= 200 && status < 300) || status === 304;
	},
});

api.interceptors.response.use(
	response => {
		if (response.data) {
			response.data = convertKeysToCamelCase(response.data);
		}

		return response;
	},
	error => Promise.reject(error),
);

export default api;
