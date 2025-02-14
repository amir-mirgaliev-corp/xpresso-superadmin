import api from "./axios";

export default {
	async getBranches(id, params) {
		try {
			const response = await api.get(`/chain-with-branchs/${id}`, {
				params,
			});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getTopBranches(params) {
		try {
			const response = await api.get("/top-branches", {
				params,
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneBranch(id) {
		try {
			const response = await api.get(`/branch/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createBranch(data) {
		try {
			const newBranch = await api.post("/branch", data);
			return newBranch.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateBranch(id, data) {
		try {
			const updatedBranch = await api.patch(`/branch/${id}`, data);
			return updatedBranch.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteBranch(id) {
		try {
			const deletedBranch = await api.delete(`/branch/${id}`);
			return deletedBranch.status;
		} catch (error) {
			console.log(error);
		}
	},
};
