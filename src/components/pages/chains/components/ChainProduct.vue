<template>
	<div class="chain-product">
		<div class="chain-product__photo">
			<img :src="product.photo" alt="product photo" />
		</div>

		<h3 class="chain-product__name" v-text="product.name.ru" />

		<div class="chain-product__info">
			<p class="chain-product__info-item">
				<i class="fi fi-rr-clock-three"></i>
				Время приготовления: {{ product.prepareTime }}
			</p>
		</div>

		<h4 class="chain-product__price">Цена: {{ product.price }}</h4>

		<CustomButton icon="h-12">Изменить</CustomButton>
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

export default {
	props: {
		product: {
			type: Object,
			required: true,
		},
	},

	components: {
		CustomButton,
	},
};
</script>
