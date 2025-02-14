import transactions from "@/api/transactions";

export default {
	state: {
		transactions: [],
	},

	actions: {
		async fetchTransactions(context, { pagination, filters }) {
			const result = await transactions.getAllTransactions(filters, pagination);
			context.commit("setTransactions", result);
		},
	},

	mutations: {
		setTransactions(state, transactions) {
			state.transactions = transactions;
		},
	},

	getters: {
		getTransactions(state) {
			return state.transactions;
		},
	},
};
