<template>
	<section class="product-edit">
		<ProductForm
			v-if="product"
			:initial-product-data="product"
			:edit-enabled="editEnabled"
			@update="getProduct"
			@cancel-edit="editEnabled = false"
		/>

		<div v-if="!editEnabled" class="flex justify-end gap-4 mt-4">
			<CustomButton icon="fi-rr-file-edit" class="h-12 width-fit purple" @click="toggleEdit">
				Редактировать
			</CustomButton>

			<CustomButton icon="fi-rr-trash" class="h-12 width-fit" @click="toggleDelete">Удалить продукт</CustomButton>
		</div>
	</section>

	<DangerModal v-if="deleteModalOpen" @confirm="deleteProduct" @close="deleteModalOpen = false" />
</template>

<script>
import ProductForm from "@/components/pages/product/ProductForm.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";
import products from "@/api/products";

export default {
	components: {
		ProductForm,
		CustomButton,
		DangerModal,
	},

	data() {
		return {
			product: null,
			editEnabled: false,
			deleteModalOpen: false,
		};
	},

	methods: {
		async getProduct() {
			const product_id = this.$route.params.product_id;
			const response = await products.getOneProduct(product_id);
			this.product = response;
		},

		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		toggleDelete() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},

		async deleteProduct() {
			const product_id = this.$route.params.product_id;
			const response_status = await products.deleteProduct(product_id);

			if (response_status === 204) {
				this.$router.push(`/chain/${this.product.chain_id}?tab=menu`);
			}
		},
	},

	mounted() {
		this.getProduct();
	},
};
</script>
