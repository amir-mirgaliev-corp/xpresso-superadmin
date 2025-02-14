<template>
	<section class="product-create">
		<ProductForm :edit-enabled="true" />
	</section>
</template>

<script>
import ProductForm from "@/components/pages/product/ProductForm.vue";

export default {
	components: {
		ProductForm,
	},
};
</script>
