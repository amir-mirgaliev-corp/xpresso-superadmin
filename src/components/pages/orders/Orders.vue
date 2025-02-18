<template>
	<OrdersFilters @change-layout="handleLayoutChange" @clear="handleFiltersClear" />
	<OrdersContent ref="ordersContent" :layout="layout" />
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

		handleFiltersClear() {
			this.$nextTick(() => {
				if (this.$refs.ordersContent) {
					this.$refs.ordersContent.clearOrders();
				}
			});
		},
	},

	components: { OrdersContent, OrdersFilters },
};
</script>
