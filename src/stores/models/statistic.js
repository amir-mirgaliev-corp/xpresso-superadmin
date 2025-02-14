import stats from "@/api/stats";
const env = import.meta.env;

export default {
    state: {
        statistics: {},
    },

    actions: {
        async fetchStatistics(context, params) {
            const statics = await stats.statistic(params);
            context.commit('setStatistics', statics);
        }
    },

    mutations: {
        setStatistics(state, statistics) {
            state.statistics = statistics;
        }
    },

    getters: {
        getStatistics(state) {
            return state.statistics;
        }
    }
}