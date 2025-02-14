import products from "@/api/products";

export default {
    state: {
        products: [],
        product: {}
    },

    actions: {
        async fetchBranchProducts(context, id) {
            const resProducts = await products.getBranchProducts(id);
            context.commit('setProducts', resProducts);
        },

        async fetchOneProductById(context, id) {
            const resProduct = await products.getOneProduct(id);
            context.commit('setOneProduct', resProduct);
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products;
        },

        setOneProduct(state, product) {
            state.product = product;
        }
    },

    getters: {
        getBranchProducts(state) {
            return state.products;
        },

        getOneProduct(state) {
            return state.product;
        }
    }
};
