<template>
	<section class="client__table">
		<TableLayout
			:table-options="tableOptions"
			:pagination-options="paginationOptions"
			@update:page="handlePageChange"
		>
			<template #title>
				<h2 class="table-title">История заказов</h2>
			</template>

			<template #filter>
				<Calendar class="mt-[-64px]" />
			</template>
		</TableLayout>
	</section>
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";
import Calendar from "@/components/shared/Calendar.vue";

import formatNumberWithSpaces from "@/utils/formatNumbers";

import { mapActions, mapGetters } from "vuex";
import { formatDate } from "@/utils/formatDate";

export default {
	data: () => ({
		orders: [],
		tableOptions: {
			thead: ["№", "Филиал", "Дата заказа", "Продукты (шт)", "Модификаторы", "Общая цена", "Статус"],
			content: [],
		},
		paginationOptions: {
			page: 1,
			limit: 10,
			count: 0,
		},
	}),

	computed: {
		...mapGetters(["getUserOrders"]),
	},

	methods: {
		...mapActions(["fetchUserOrders"]),

		async getUserOrdersLocal() {
			const userId = this.$route.params.user_id;

			// pagination
			const { page, limit } = this.paginationOptions;

			// filters
			const from_date = this.$route.query.from_date;
			const to_date = this.$route.query.to_date;
			const filter = { from_date, to_date };

			await this.fetchUserOrders({ userId, pagination: { page, limit }, filter });

			this.orders = this.getUserOrders.result;
			this.paginationOptions.count = this.getUserOrders.count;
		},

		async setOrderToUserTable() {
			const statusTranslation = {
				received: "Принято",
				pending: "Обработка",
				processing: "Готовится",
				completed: "Готова",
				canceled: "Отменено",
			};

			this.tableOptions.content = this.getUserOrders.result.map((order, index) => {
				const modificators = order.orderModificators?.length
					? order.orderModificators.map(mod => mod.modificator?.name).join(", ")
					: "Не указан";

				return {
					id: index + 1,
					restaurant: order.orderRestaurant,
					date: formatDate(order.orderDate),
					products: order.orderCount,
					modificators,
					price: formatNumberWithSpaces(order.orderPrice) + " UZS",
					status: statusTranslation[order.orderStatus],
				};
			});
		},

		handlePageChange(newPage) {
			this.page = newPage;
		},
	},

	async mounted() {
		await this.getUserOrdersLocal();
		await this.setOrderToUserTable();
	},

	watch: {
		page: {
			deep: true,

			async handler() {
				await this.getUserOrdersLocal();
				await this.setOrderToUserTable();
			},
		},

		getUserOrders: {
			deep: true,

			async handler() {
				await this.setOrderToUserTable();
			},
		},

		"$route.query": {
			deep: true,
			immediate: true,

			async handler() {
				await this.getUserOrdersLocal();
				this.setOrderToUserTable();
			},
		},
	},

	components: {
		TableLayout,
		Calendar,
	},
};
</script>
