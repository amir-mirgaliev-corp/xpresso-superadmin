import auth from "@/api/auth";

export default {
	state: {
		profile: {},
	},

	actions: {
		async fetchProfile(context) {
			const resProfile = await auth.getProfile();
			context.commit("setProfile", resProfile);
		},
	},

	mutations: {
		setProfile(state, profileData) {
			state.profile = profileData;
		},
	},

	getters: {
		getProfile(state) {
			return state.profile;
		},
	},
};
