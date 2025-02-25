<template>
	<div class="mb-4 bg-white rounded-[0.5rem] sm:hidden">
		<HeaderSearch />
	</div>
	<OrdersFilters @change-layout="handleLayoutChange" @clear="handleFiltersClear" />
	<OrdersContent ref="ordersContent" :layout="layout" />
</template>

<script>
import OrdersFilters from "./components/OrdersFilters.vue";
import OrdersContent from "./components/OrdersContent.vue";
import HeaderSearch from "@/components/layouts/content_layout/header-ui/HeaderSearch.vue";

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

	components: { OrdersContent, OrdersFilters, HeaderSearch },
};
</script>
