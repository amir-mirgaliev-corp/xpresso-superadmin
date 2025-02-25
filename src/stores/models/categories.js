import categories from "@/api/categories";

export default {
	state: {
		categories: [],
	},

	actions: {
		async fetchCategories(context, data) {
			const result = await categories.getCategories(data.chain_id, data.filters);
			context.commit("setCategories", result);
		},
	},

	mutations: {
		setCategories(state, categories) {
			state.categories = categories;
		},
	},

	getters: {
		getCategories(state) {
			return state.categories;
		},
	},
};
