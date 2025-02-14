import commission from "@/api/commission"

export default {
    state: {
        commission: {},
    },

    actions: {
        async fetchCommission(context, params) {
            const resCommission = await commission.getCommission(params);
            context.commit('setCommission', resCommission);
        }
    },

    mutations: {
        setCommission(state, commissionData) {
            state.commission = commissionData;
        }
    },

    getters: {
        getCommission(state) {
            return state.commission;
        }
    }
}
