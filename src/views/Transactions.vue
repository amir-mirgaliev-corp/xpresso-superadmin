<template>
	<div class="mb-4 bg-white rounded-[0.5rem] sm:hidden">
		<HeaderSearch />
	</div>
	<section class="transactions">
		<TransactionsFilters @filter="handleFilter" />
		<AllTransactions :filters="filters" />
	</section>
</template>

<script>
import TransactionsFilters from "@/components/pages/transactions/TransactionsFilters.vue";
import AllTransactions from "@/components/pages/transactions/AllTransactions.vue";
import HeaderSearch from "@/components/layouts/content_layout/header-ui/HeaderSearch.vue";

export default {
	components: {
		TransactionsFilters,
		AllTransactions,
		HeaderSearch
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
