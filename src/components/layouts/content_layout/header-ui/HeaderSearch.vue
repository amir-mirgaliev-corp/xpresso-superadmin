<template>
	<form action="" role="search" class="header__search">
		<input
			type="search"
			class="header__search-input"
			placeholder="Поиск"
			v-model="search"
			@input="debouncedSearch"
		/>

		<span class="header__search-icon">
			<i v-if="!search" class="fi fi-rr-search"></i>
			<i v-else class="fi fi-rr-cross-small header__search-clear text-xl" @click="clearSearch"></i>
		</span>
	</form>
</template>

<script>
import { debounce } from "@/utils/debounce";

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
		this.debouncedSearch = debounce(this.searchItemsByPage, 250);
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

<style lang="scss" scoped>
.header__search {
	position: relative;
	display: block;
	width: 300px;
	height: 42px;
	&-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		border: 1px solid #cdcdcd;
		border-radius: 0.5rem;
		background-color: transparent;
		padding: 0.75rem 2.75rem 0.75rem 1.25rem;
		font-size: 1rem;
		color: $black;
		outline: none;
		appearance: none;
		transition: all 0.15s ease-in-out;
		&::placeholder {
			color: rgba($color: $black, $alpha: 0.5);
		}
		&:focus {
			border-color: $primary;
			& + .search__icon > i {
				color: $black;
			}
		}
	}
	&-icon {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		z-index: 2;
		& > i {
			color: #cdcdcd;
			transition: all 0.15s ease-in-out;
		}
	}
	&-clear {
		cursor: pointer;
	}
}
</style>
