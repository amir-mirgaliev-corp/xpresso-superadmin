import api from "@/api/axios";
import users from "@/api/users";

export default {
	state: {
		users: [],
		userProfile: {},
		userHistory: [],
		userOrders: [],
	},

	actions: {
		async fetchUsers(context, { filter, pagination }) {
			const resUsers = await users.getUsers(filter, pagination);
			context.commit("setUsers", resUsers);
		},

		async fetchUserProfile(context, id) {
			const resProfile = await users.getUserProfile(id);
			context.commit("setUserProfile", resProfile);
		},

		async fetchUserHistory(context, { userId, pagination, filter }) {
			const resHistory = await users.getUserHistory(userId, filter, pagination);
			context.commit("setUserHistory", resHistory);
		},

		async fetchUserOrders(context, { userId, filter, pagination }) {
			const resOrders = await users.getUserOrders(userId, filter, pagination);
			context.commit("setUserOrders", resOrders);
		},
	},

	mutations: {
		setUsers(state, users) {
			state.users = users;
		},

		setUserProfile(state, profile) {
			state.userProfile = profile;
		},

		setUserHistory(state, history) {
			state.userHistory = history;
		},

		setUserOrders(state, orders) {
			state.userOrders = orders;
		},
	},

	getters: {
		getUsers(state) {
			return state.users;
		},

		getUserProfile(state) {
			return state.userProfile;
		},

		getUserHistory(state) {
			return state.userHistory;
		},

		getUserOrders(state) {
			return state.userOrders;
		},
	},
};
