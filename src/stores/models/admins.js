import admins from "@/api/admins";

export default {
	state: {
		branches: [],
		branch: {},
	},

	actions: {
		async fetchChainAdmins(context, data) {
			const result = await admins.getChainAdmins(data.chain_id, data.filters);
			context.commit("setChainAdmins", result);
		},

		async fetchBranchAdmins(context, data) {
			const result = await admins.getBranchAdmins(data.branch_id, data.filters);
			context.commit("setBranchAdmins", result);
		},
	},

	mutations: {
		setChainAdmins(state, admins) {
			state.chain_admins = admins;
		},

		setBranchAdmins(state, admins) {
			state.branch_admins = admins;
		},
	},

	getters: {
		getChainAdmins(state) {
			return state.chain_admins;
		},

		getBranchAdmins(state) {
			return state.branch_admins;
		},
	},
};
