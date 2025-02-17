<template>
	<OrdersFilters @change-layout="handleLayoutChange" />
	<OrdersContent :layout="layout" />
</template>

<script>
import OrdersFilters from "./components/OrdersFilters.vue";
import OrdersContent from "./components/OrdersContent.vue";

export default {
	data() {
		return {
			layout: "",
		};
	},

	methods: {
		handleLayoutChange(newLayout) {
			this.layout = newLayout;
		},
	},

	components: { OrdersContent, OrdersFilters },
};
</script>
