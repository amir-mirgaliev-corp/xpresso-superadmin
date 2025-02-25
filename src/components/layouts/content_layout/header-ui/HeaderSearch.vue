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
			"fetchCategories",
			"fetchAdditives",
			"fetchChainAdmins",
			"fetchBranchAdmins",
			"fetchProducts",
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
				case "chains":
					await this.fetchChains({ search });
					break;
				case "chain":
					const chain_id = this.$route.params.chain_id;

					if (chain_id) {
						switch (this.$route.query.tab) {
							case "branches":
								await this.fetchBranches({ chain_id, filters: { search } });
								break;
							case "categories":
								await this.fetchCategories({ chain_id, filters: { search } });
								break;
							case "additives":
								await this.fetchAdditives({ chain_id, filters: { search } });
								break;
							case "admins":
								await this.fetchChainAdmins({ chain_id, filters: { search } });
								break;
							case "menu":
								await this.fetchProducts({ chain_id, filters: { search } });
								break;
							default:
								break;
						}
					}
					break;
				case "branch":
					if (this.$route.query.tab === "admins") {
						const branch_id = this.$route.params.branch_id;
						await this.fetchBranchAdmins({ branch_id, filters: { search } });
					}
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

<style lang="scss" scoped>
.search-form {
	position: relative;
	display: block;
	width: 300px;
	height: 42px;
	&__input {
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

		@media screen and (max-width: 1024px) {
			padding: 0.75rem 1rem 0.75rem 1rem;
		}
	}
	&__icon {
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
	&__clear {
		cursor: pointer;
	}

	@media screen and (max-width: 1024px) {
		width: 200px;
	}
	@media screen and (max-width: 640px) {
		width: 100%;
	}
}
</style>
