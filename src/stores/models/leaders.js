import leaders from "@/api/leaders";

export default {
    state: {
        leaders: {},
    },

    actions: {
        async fetchLeaders(context, params) {
            const resLeaders = await leaders.getLeaders(params);
            context.commit('setLeaders', resLeaders);
        }
    },

    mutations: {
        setLeaders(state, leaders) {
            state.leaders = leaders;
        }
    },

    getters: {
        getLeaders(state) {
            return state.leaders;
        }
    }
}