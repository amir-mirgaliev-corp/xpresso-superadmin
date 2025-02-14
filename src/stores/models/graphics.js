import graph from "@/api/graph";
const env = import.meta.env;

export default {
    state: {
        graphics: {
            profit: {},
            product: {}
        },
    },

    actions: {
        async fetchProfitGraphicData(context, params) {
            const profitData = await graph.getProfitGraphics(params);
            context.commit('setProfitGraphicData', profitData);
        },

        async fetchProductGraphicData(context, params) {
            const productData = await graph.getProductGraphics(params);
            context.commit('setProductGraphicData', productData);
        }
    },

    mutations: {
        setProfitGraphicData(state, profitData) {
            state.graphics.profit = profitData;
        },

        setProductGraphicData(state, productData) {
            state.graphics.product = productData;
        }
    },

    getters: {
        getProfitGraph(state) {
            return state.graphics.profit;
        },

        getProductGraph(state) {
            return state.graphics.product;
        }
    }
}
