export default {
	state: {
		isSidebarShown: false,
	},

	mutations: {
		setIsSidebarShown(state, value) {
			state.isSidebarShown = value;
		},
	},

	getters: {
		getIsSidebarShown(state) {
			return state.isSidebarShown;
		},
	},
};
