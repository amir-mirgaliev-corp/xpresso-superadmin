<template>
	<section class="dashboard__table-oreder w-full mb-6">
		<ContentContainer>
			<template #title>
				<h2 class="table-title">Популярные заведения</h2>
			</template>

			<template #content>
				<Table :content="table" />
			</template>

			<template #paginate>
				<Pagination :page="page" :limit="limit" :count="count" @update:page="handlePageChange" />
			</template>
		</ContentContainer>
	</section>
</template>

<script>
import Table from "@/components/shared/ui/Table.vue";
import Pagination from "@/components/shared/ui/Pagination.vue";
import ContentContainer from "@/components/ui/ContentContainer.vue";
import { mapActions, mapGetters } from "vuex";
import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

export default {
	data: () => ({
		page: 1,
		limit: 10,
		totalPages: 10,
		count: 10,
		table: {
			thead: ["№", "Заведение", "Количество заказов", "Общая сумма"],
			content: [],
		},
	}),

	methods: {
		...mapActions(["fetchTopBranches"]),

		async setTopBranches() {
			await this.fetchTopBranches();

			this.table.content = this.getTopBranches.result.branches.map((branch, index) => {
				return {
					id: (index += 1),
					restaurant: branch.restaurantName,
					order: branch.restaurantOrders,
					amount: formatNumberWithSpaces(branch.restaurantProfit) + " UZS",
				};
			});
		},

		handlePageChange(newPage) {
			this.page = newPage;
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
		Table,
		Pagination,
		ContentContainer,
	},
};
</script>
