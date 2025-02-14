import api from "./axios";

export default {
	async getChainProducts(chain_id) {
		try {
			const response = await api.get(`/menu/${chain_id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getOneProduct(id) {
		try {
			const response = await api.get(`/product/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async createProduct(data) {
		try {
			const newProduct = await api.post("/product", data);
			return newProduct.status;
		} catch (error) {
			console.log(error);
		}
	},

	async updateProduct(id, data) {
		try {
			const updatedProduct = await api.patch(`/product/${id}`, data);
			return updatedProduct.status;
		} catch (error) {
			console.log(error);
		}
	},

	async deleteProduct(product_id, chain_id) {
		try {
			const deletedProduct = await api.delete(`/product?id=${product_id}&chain_id=${chain_id}`);
			return deletedProduct.status;
		} catch (error) {
			console.log(error);
		}
	},
};
