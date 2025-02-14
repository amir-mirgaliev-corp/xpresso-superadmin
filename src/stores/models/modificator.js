import modificators from "@/api/modificators";

export default {
    state: {
        modificators: [],
        modificator: {}
    },

    actions: {
        async fetchModificators(context, {id, params}) {
            const resModificators = await modificators.getModificators(id, params);
            context.commit('setModificators', resModificators);
        },

        async fetchOneModificatorById(context, id) {
            const resModificator = await modificators.getOneModificator(id);
            context.commit('setOneModificator', resModificator);
        },
    },

    mutations: {
        setModificators(state, modificators) {
            state.modificators = modificators;
        },

        setOneModificator(state, modificator) {
            state.modificator = modificator;
        },
    },

    getters: {
        getModificators(state) {
            return state.modificators;
        },

        getOneModificator(state) {
            return state.modificator;
        },
    }
};
