<template>
	<section class="transactions">
		<TransactionsFilters @filter="handleFilter" />
		<AllTransactions :filters="filters" />
	</section>
</template>

<script>
import TransactionsFilters from "@/components/pages/transactions/TransactionsFilters.vue";
import AllTransactions from "@/components/pages/transactions/AllTransactions.vue";

export default {
	components: {
		TransactionsFilters,
		AllTransactions,
	},

	data() {
		return {
			filters: [],
		};
	},

	methods: {
		handleFilter(data) {
			this.filters = data;
		},
	},
};
</script>
