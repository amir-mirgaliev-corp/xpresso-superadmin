<template>
	<OrderGridType :active-layout="layout" @setLayout="updateLayout" />

	<div v-if="orders.length" class="orders__wrapper">
		<RecycleScroller
			ref="scroller"
			:items="orders"
			:item-size="itemSize"
			:grid-items="gridColumns"
			:item-secondary-size="itemSecondarySize"
			key-field="orderId"
			class="orders__grid"
		>
			<template #default="{ item }">
				<OrderCard :order="item" :key="item.orderId" :layout="layout" :status="$route.query.status" />
			</template>
		</RecycleScroller>
	</div>

	<div v-else>
		<p>Нет заказов</p>
	</div>
</template>

<script>
import OrderGridType from "./OrderGridType.vue";
import OrderCard from "./OrderCard.vue";
import { mapActions, mapGetters } from "vuex";
import { RecycleScroller } from "vue-virtual-scroller";

import orders from "@/api/orders";

export default {
	data: () => ({
		orders: [],
		layout: localStorage.getItem("orders_layout") || "grid",
		windowWidth: window.innerWidth,
		containerWidth: 0,
	}),

	computed: {
		...mapGetters(["getGlobalOrders"]),

		gridColumns() {
			let cols;

			switch (this.layout) {
				case "grid":
					cols = this.windowWidth >= 1260 ? 4 : 3;
					break;
				case "column":
					switch (true) {
						case this.windowWidth >= 1500:
							cols = 5;
							break;
						case this.windowWidth >= 1200:
							cols = 4;
							break;
						case this.windowWidth >= 700:
							cols = 3;
							break;
						default:
							cols = 2;
					}

					break;
				case "line":
					cols = 1;
					break;
				default:
					break;
			}

			return cols;
		},

		itemSize() {
			let size;

			switch (this.layout) {
				case "grid":
					size = 150;
					break;
				case "column":
					size = 270;
					break;
				case "line":
					size = 140;
					break;
				default:
					break;
			}

			return size;
		},

		itemSecondarySize() {
			return (this.containerWidth - (this.gridColumns - 1)) / this.gridColumns;
		},
	},

	methods: {
		...mapActions(["fetchGlobalOrders"]),

		async getOrders() {
			const status = this.$route.query.status;
			const from_date = this.$route.query.from_date;
			const to_date = this.$route.query.to_date;

			const params = { from_date, to_date };
			if (status && status !== "all") params.status = status;

			console.log(params);

			await this.fetchGlobalOrders(params);
			this.orders = this.sortedOrders(this.getGlobalOrders.orders);
			console.log(this.orders);
		},

		sortedOrders(orders) {
			return orders.slice().sort((a, b) => {
				const aEnded = a.orderEndedAt ? new Date(a.orderEndedAt) : null;
				const bEnded = b.orderEndedAt ? new Date(b.orderEndedAt) : null;
				const aCurrent = new Date(a.orderCurrentTime);
				const bCurrent = new Date(b.orderCurrentTime);

				// Просроченные заказы (orderEndedAt < orderCurrentTime)
				const aExpired = aEnded && aEnded < aCurrent;
				const bExpired = bEnded && bEnded < bCurrent;

				// 1. В начале идут заказы со статусом "processing"
				if (a.orderStatus === "processing" && b.orderStatus !== "processing") {
					return -1;
				}
				if (b.orderStatus === "processing" && a.orderStatus !== "processing") {
					return 1;
				}

				// 2. В начале идут просроченные заказы
				if (aExpired !== bExpired) {
					return bExpired - aExpired;
				}

				// 3. Если оба просрочены, сортируем по orderEndedAt (более старые идут раньше)
				if (aExpired && bExpired) {
					return aEnded - bEnded;
				}

				// 4. Если оба НЕ просрочены, сортируем по orderEndedAt (кто ближе к просрочке)
				if (aEnded && bEnded) {
					return aEnded - bEnded;
				}

				// 5. Если у одного из заказов нет orderEndedAt, они идут в конце
				if (aEnded && !bEnded) {
					return -1;
				}
				if (bEnded && !aEnded) {
					return 1;
				}

				return 0; // Если ничего не изменилось, оставляем порядок
			});
		},

		updateWidth() {
			this.containerWidth = this.$refs.scroller.$el.clientWidth;
			this.windowWidth = window.innerWidth;
		},

		updateLayout(newLayout) {
			this.layout = newLayout;
			localStorage.setItem("orders_layout", newLayout);
		},
	},

	watch: {
		"$route.query": {
			deep: true,
			immediate: true,

			async handler() {
				await this.getOrders();
				this.updateWidth();
			},
		},

		getGlobalOrders: {
			deep: true,

			async handler(newValue) {
				if (newValue.orders && newValue.orders.length) {
					this.orders = this.sortedOrders(newValue.orders);
				}
			},
		},
	},

	mounted() {
		window.addEventListener("resize", this.updateWidth);
	},

	beforeDestroy() {
		window.removeEventListener("resize", this.updateWidth);
	},

	components: {
		OrderGridType,
		OrderCard,
		RecycleScroller,
	},
};
</script>

<style lang="scss" scoped>
.orders {
	&__wrapper {
		height: 100%;
	}
	&__grid {
		height: 100%;
		overflow-y: auto;
	}
}
</style>
