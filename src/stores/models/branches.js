import branches from "@/api/branches";

export default {
	state: {
		branches: [],
		branch: {},
	},

	actions: {
		async fetchBranches(context, data) {
			const resBranches = await branches.getBranchesByChain(data.chain_id, data.filters);
			context.commit("setBranches", resBranches);
		},

		async fetchOneBranch(context, id) {
			const resBranch = await branches.getOneBranch(id);
			context.commit("setOneBranch", resBranch);
		},
	},

	mutations: {
		setBranches(state, branches) {
			state.branches = branches;
		},

		setOneBranch(state, branch) {
			state.branch = branch;
		},
	},

	getters: {
		getBranches(state) {
			return state.branches;
		},

		getOneBranch(state) {
			return state.branch;
		},

		getTopBranches(state) {
			return state.topBranches;
		},
	},
};
