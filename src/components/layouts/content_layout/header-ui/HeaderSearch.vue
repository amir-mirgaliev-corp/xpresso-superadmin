<template>
	<form action="" role="search" class="search-form">
		<input type="search" class="search-form__input" placeholder="Поиск" v-model="search" @input="debouncedSearch" />

		<span class="search-form__icon">
			<i v-if="!search" class="fi fi-rr-search"></i>
			<i v-else class="fi fi-rr-cross-small search-form__clear text-xl" @click="clearSearch"></i>
		</span>
	</form>
</template>

<script>
import { useDebounceFn } from "@vueuse/core";

import { mapActions } from "vuex";

export default {
	data: () => ({
		search: "",
		page: 1,
		limit: 10,
	}),

	methods: {
		...mapActions([
			"fetchGlobalOrders",
			"fetchUsers",
			"fetchChains",
			"fetchBranches",
			"fetchUserOrders",
			"fetchTransactions",
		]),

		async searchItemsByPage() {
			const pageName = this.$route.name;
			const { search, page, limit } = this;
			const from_date = this.$route.query.from_date;
			const to_date = this.$route.query.to_date;

			switch (pageName) {
				case "orders":
					await this.fetchGlobalOrders({ from_date, to_date, search });
					break;
				case "clients":
					await this.fetchUsers({
						filter: { search },
						paginate: { page, limit },
					});
					break;
				case "user-profile":
					const id = this.$route.params.user_id;

					await this.fetchUserOrders({
						userId: id,
						filter: { search },
						paginate: { page, limit },
					});
					break;
				case "restaurants":
					await this.fetchChains({
						searchField: "name",
						search,
					});
					break;
				case "restaurants-chain":
					const chainId = this.$route.params.chain_id;

					await this.fetchBranches({
						id: chainId,
						params: {
							search,
						},
					});
					break;
				case "transactions":
					await this.fetchTransactions({
						pagination: { page, limit },
						filters: {
							search_field: this.$route.query.search_field,
							search,
						},
					});
					break;
			}
		},

		clearSearch() {
			this.search = "";
			this.searchItemsByPage();
		},
	},

	created() {
		this.debouncedSearch = useDebounceFn(this.searchItemsByPage, 250);
	},

	watch: {
		$route: {
			immediate: true,
			deep: true,

			handler() {
				this.search = "";
			},
		},
	},
};
</script>
