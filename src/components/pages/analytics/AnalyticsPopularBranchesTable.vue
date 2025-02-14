<template>
	<section class="dashboard__table-oreder w-full mb-6">
		<TableLayout :table-options="tableOptions">
			<template #title>
				<h2 class="table-title">Популярные заведения</h2>
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
		tableOptions: {
			thead: ["№", "Заведение", "Количество заказов", "Общая сумма"],
			content: [],
		},
	}),

	methods: {
		...mapActions(["fetchTopBranches"]),

		async setTopBranches() {
			await this.fetchTopBranches();

			this.tableOptions.content = this.getTopBranches.result.branches.map((branch, index) => {
				return {
					index: (index += 1),
					restaurant: branch.restaurantName,
					order: branch.restaurantOrders,
					amount: formatNumberWithSpaces(branch.restaurantProfit) + " UZS",
				};
			});
		},
	},

	computed: {
		...mapGetters(["getTopBranches"]),
	},

	async mounted() {
		await this.setTopBranches();
	},

	watch: {
		page: {
			deep: true,
			async handler() {
				await this.setOrderToTable();
			},
		},
	},

	components: {
		TableLayout,
	},
};
</script>
