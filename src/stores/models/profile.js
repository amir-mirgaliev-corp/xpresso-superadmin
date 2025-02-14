import auth from "@/api/auth"

export default {
    state: {
        profile: {},
    },

    actions: {
        async fetchProfile(context, userId) {
            const resProfile = await auth.profile(userId);
            context.commit('setProfile', resProfile);
        }
    },

    mutations: {
        setProfile(state, profileData) {
            state.profile = profileData;
        }
    },

    getters: {
        getProfile(state) {
            return state.profile;
        }
    }
}
