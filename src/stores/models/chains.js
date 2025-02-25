import chains from "@/api/chains";

export default {
	state: {
		chains: [],
		chain: {},
	},

	actions: {
		async fetchChains(context, filters) {
			const resChains = await chains.getChains(filters);
			context.commit("setChains", resChains.items);
		},

		async fetchOneChainById(context, id) {
			const resChain = await chains.getOneChain(id);
			context.commit("setOneChain", resChain);
		},
	},

	mutations: {
		setChains(state, chains) {
			state.chains = chains;
		},

		setOneChain(state, chain) {
			state.chain = chain;
		},
	},

	getters: {
		getChains(state) {
			return state.chains;
		},

		getOneChain(state) {
			return state.chain;
		},
	},
};
