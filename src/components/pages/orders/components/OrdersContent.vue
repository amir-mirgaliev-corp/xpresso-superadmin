<template>
	<div class="orders__content mt-4">
		<div v-if="orders.length" class="orders__grid" :class="layout">
			<OrderCard v-for="order in orders" :order="order" :key="order.orderId" :layout="layout" />
		</div>

		<div v-else class="p-6 bg-white border rounded-[12px]">
			<p>Нет заказов</p>
		</div>

		<div v-if="!$route.query.branch_id" class="p-6 bg-white border rounded-[12px]">
			<p>Выберите сеть и филиал что бы увидеть заказы</p>
		</div>
	</div>
</template>

<script>
import OrderCard from "./OrderCard.vue";
import { mapActions, mapGetters } from "vuex";
import orders from "@/api/orders";

export default {
	data() {
		return {
			orders: [],
		};
	},

	props: {
		layout: String,
	},

	computed: {
		...mapGetters(["getGlobalOrders"]),
	},

	methods: {
		...mapActions(["fetchGlobalOrders"]),

		async getOrders() {
			const status = this.$route.query.status;
			const to_date = this.$route.query.to_date;

			const params = { to_date };
			if (status && status !== "all") params.status = status;

			await this.fetchGlobalOrders(params);
			this.orders = this.sortedOrders(this.getGlobalOrders.orders);
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
	},

	watch: {
		"$route.query": {
			deep: true,
			immediate: true,

			async handler() {
				await this.getOrders();
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

	components: { OrderCard },
};
</script>

<style lang="scss" scoped>
.orders {
	&__grid {
		display: grid;
		grid-gap: 1rem;
		&.compact {
			grid-template-columns: repeat(4, 1fr);
		}
		&.vertical {
			grid-template-columns: repeat(5, 1fr);
		}
		&.row {
			grid-template-columns: 1fr;
		}
	}
}
</style>
