<template>
	<section class="mb-6">
		<TableLayout
			:table-options="tableOptions"
			:pagination-options="paginationOptions"
			@update:page="handlePageChange"
		>
			<template #title>
				<h2 class="table-title">Активные заказы</h2>
			</template>
		</TableLayout>
	</section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";
import TableLayout from "@/components/shared/TableLayout.vue";

export default {
	data: () => ({
		paginationOptions: {
			page: 1,
			limit: 10,
			count: 0,
			totalPages: 10,
		},
		tableOptions: {
			thead: ["Позиция (Заведение)", "Количество товаров", "Статус", "Стоимость", "Номер заказа"],
			content: [],
		},
	}),

	components: {
		TableLayout,
	},

	computed: {
		...mapGetters(["getDashboardOrders"]),
	},

	methods: {
		...mapActions(["fetchDashboardOrders"]),

		async setOrderToTable() {
			const { page, limit } = this.paginationOptions;

			await this.fetchDashboardOrders({ page, limit });

			const statusTranslation = {
				received: "Принято",
				pending: "Обработка",
				processing: "Готовится",
				completed: "Готова",
				canceled: "Отменено",
			};

			this.paginationOptions.count = this.getDashboardOrders.count;

			this.tableOptions.content = this.getDashboardOrders.orders
				.map((order) => ({
					branch: order.orderBranches.orderBranchName,
					productCount: order.orderProductsCount,
					status: statusTranslation[order.orderStatus] || "Неизвестно",
					amount: formatNumberWithSpaces(order.orderAmount) + " UZS",
					orderId: `#${order.orderId}`,
				}))
				.sort((a, b) => a.id - b.id);
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},
	},

	watch: {
		"paginationOptions.page": {
			deep: true,
			async handler() {
				await this.setOrderToTable();
			},
		},
	},

	async mounted() {
		await this.setOrderToTable();
	},
};
</script>
