import additives from "@/api/additives";

export default {
	state: {
		additives: [],
	},

	actions: {
		async fetchAdditives(context, data) {
			const result = await additives.getAdditives(data.chain_id, data.filters);
			context.commit("setAdditives", result);
		},
	},

	mutations: {
		setAdditives(state, additives) {
			state.additives = additives;
		},
	},

	getters: {
		getAdditives(state) {
			return state.additives;
		},
	},
};
