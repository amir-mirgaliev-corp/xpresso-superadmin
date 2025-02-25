import products from "@/api/products";

export default {
	state: {
		products: [],
		product: {},
	},

	actions: {
		async fetchProducts(context, data) {
			const resProducts = await products.getChainProducts(data.chain_id, data.filters);
			context.commit("setProducts", resProducts);
		},

		async fetchOneProductById(context, id) {
			const resProduct = await products.getOneProduct(id);
			context.commit("setOneProduct", resProduct);
		},
	},

	mutations: {
		setProducts(state, products) {
			state.products = products;
		},

		setOneProduct(state, product) {
			state.product = product;
		},
	},

	getters: {
		getProducts(state) {
			return state.products;
		},

		getOneProduct(state) {
			return state.product;
		},
	},
};
