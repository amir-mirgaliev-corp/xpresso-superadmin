<template>
	<section class="dashboard__table-other grid grid-cols-3 gap-6">
		<TableLayout
			v-for="table in tables"
			:key="table.title"
			:table-options="table.tableOptions"
			:pagination-options="paginationOptions"
		>
			<template #title>
				<h2 class="table-title">{{ table.title }}</h2>
			</template>
		</TableLayout>
	</section>
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";

import { mapActions, mapGetters } from "vuex";

export default {
	data: () => ({
		tables: {
			topUsers: {
				title: "Топ пользователей",
				tableOptions: {
					thead: ["№", "Пользователь"],
					content: [],
				},
			},
			topRestaurants: {
				title: "Топ кофеен",
				tableOptions: {
					thead: ["№", "Ресторан"],
					content: [],
				},
			},
			topProducts: {
				title: "Топ товаров",
				tableOptions: {
					thead: ["№", "Продукт"],
					content: [],
				},
			},
		},
	}),

	components: {
		TableLayout,
	},

	computed: {
		...mapGetters(["getLeaders"]),
	},

	methods: {
		...mapActions(["fetchLeaders"]),

		getModel(models) {
			return models.map(model => {
				return { id: model.rank, name: model.name };
			});
		},
	},

	async mounted() {
		await this.fetchLeaders();

		const products = this.getLeaders.data.topCoffees.results;
		const branches = this.getLeaders.data.topBranches.results;
		const users = this.getLeaders.data.topUsers.results;

		this.tables.topProducts.tableOptions.content = this.getModel(products);
		this.tables.topRestaurants.tableOptions.content = this.getModel(branches);
		this.tables.topUsers.tableOptions.content = this.getModel(users);
	},
};
</script>
