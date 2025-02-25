import api from "./axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
	async getBranchesByChain(id, filters) {
		try {
			const params = {
				name: filters?.search,
				page: filters?.page || 1,
				size: filters?.limit || 10,
			};

			const response = await api.get(`/superuser/branches/${id}`, { params });
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneBranch(id) {
		try {
			const response = await api.get(`/superuser/branch/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createBranch(chain_id, data) {
		try {
			const response = await api.post(`/superuser/branch/${chain_id}`, data);
			toast.success("Филиал успешно создан");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateBranch(branch_id, data) {
		try {
			const response = await api.patch(`/superuser/branches/${branch_id}`, data);
			toast.success("Филиал успешно обновлен");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteBranch(branch_id) {
		try {
			const response = await api.delete(`/superuser/branch/${branch_id}`);
			toast.success("Филиал успешно удален");
			return response.status;
		} catch (error) {
			console.log(error);
		}
	},
};
