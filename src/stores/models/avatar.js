import avatars from "@/api/avatars";

export default {
    state: {
        avatars: [],
        avatar: {}
    },

    actions: {
        async fetchAvatars(context, params) {
            const resAvatars = await avatars.getAvatars(params);
            context.commit('setAvatars', resAvatars);
        },

        async fetchOneAvatarById(context, id) {
            const resAvatar = await avatars.getOneAvatar(id);
            context.commit('setOneAvatar', resAvatar);
        }
    },

    mutations: {
        setAvatars(state, avatars) {
            state.avatars = avatars;
        },

        setOneAvatar(state, avatar) {
            state.avatar = avatar;
        }
    },

    getters: {
        getAvatars(state) {
            return state.avatars;
        },

        getOneAvatar(state) {
            return state.avatar;
        }
    }
};
