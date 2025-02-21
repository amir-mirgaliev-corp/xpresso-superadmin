import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
	baseURL: base_url,
	withCredentials: false,
	headers: {
		Authorization: localStorage.getItem("accessToken"),
	},
	validateStatus: status => {
		return (status >= 200 && status < 300) || status === 304;
	},
});

export default api;
