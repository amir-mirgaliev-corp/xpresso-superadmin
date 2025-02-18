<template>
	<section
		class="flex justify-between items-end bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full"
	>
		<div class="flex gap-4 items-end">
			<CustomSelect
				v-for="filter in filters"
				:key="filter.id"
				:queryName="filter.queryName"
				:options="filter.options"
				:label="filter.label"
				:sort="filter?.sort"
				selectClass="w-[220px] h-[46px]"
			/>

			<CustomButton
				v-if="hasAppliedFilters"
				icon="fi-rr-cross-small"
				class="h-[46px] width-fit"
				@click="clearFilters"
			>
				Очистить
			</CustomButton>
		</div>

		<Calendar :initial-date="new Date()" clear-disabled range-disabled />
	</section>

	<section class="orders__filters flex items-center justify-between mt-4">
		<div class="orders__filters-tabs">
			<div class="tabs__header">
				<div
					v-for="status in statuses"
					:key="status.value"
					class="tabs__header-item"
					:class="{ active: status.value === activeStatus }"
					@click="setActiveStatus(status.value)"
				>
					{{ status.name }}
				</div>
			</div>
		</div>

		<OrderGridType :active-layout="layout" @setLayout="updateLayout" />
	</section>
</template>

<script>
import CustomSelect from "@/components/shared/ui/CustomSelect.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import OrderGridType from "./OrderGridType.vue";
import Calendar from "@/components/shared/ui/Calendar.vue";

import chains from "@/api/chains";
import branches from "@/api/branches";

export default {
	data() {
		return {
			statuses,
			activeStatus: "all",
			layout: localStorage.getItem("orders_layout") || "compact",
			filters: [
				{
					id: 0,
					queryName: "chain_id",
					label: "Сеть:",
					options: [],
				},
			],
		};
	},

	computed: {
		hasAppliedFilters() {
			return this.$route.query.chain_id || this.$route.query.branch_id;
		},
	},

	methods: {
		setActiveStatus(status) {
			this.activeStatus = status;
		},

		updateLayout(newLayout) {
			this.layout = newLayout;
			this.$emit("change-layout", newLayout);
			localStorage.setItem("orders_layout", newLayout);
		},

		async getChains() {
			const response = await chains.getChains();
			const chain_filter = this.filters.find(filter => filter.queryName === "chain_id");

			chain_filter.options = response.rows.map(chain => {
				return { name: chain.id, title: chain.name };
			});
		},

		async getBranches() {
			const response = await branches.getBranches(this.$route.query.chain_id);
			const branch_filter = this.filters.find(filter => filter.queryName === "branch_id");

			branch_filter.options = response.data.branches.map(branch => {
				return { name: branch.id, title: branch.name };
			});
		},

		clearFilters() {
			this.filters = this.filters.filter(filter => filter.queryName !== "branch_id");
			this.$router.replace({ query: { ...this.$route.query, chain_id: undefined, branch_id: undefined } });
		},
	},

	mounted() {
		const initialStatus = this.$route.query.status;
		if (initialStatus) this.activeStatus = initialStatus;
		this.getChains();
		this.$emit("change-layout", this.layout);
	},

	watch: {
		activeStatus: {
			immediate: true,
			handler(newStatus) {
				this.$router.replace({ query: { ...this.$route.query, status: newStatus } });
			},
		},

		"$route.query.chain_id": {
			deep: true,
			immediate: true,
			handler(newChainID) {
				if (newChainID) {
					if (!this.filters.some(f => f.queryName === "branch_id")) {
						this.filters.push({
							id: 1,
							queryName: "branch_id",
							label: "Филиал:",
							options: [],
						});
					}

					this.getBranches();
				} else {
					this.clearFilters();
				}
			},
		},
	},

	components: { Calendar, OrderGridType, CustomSelect, CustomButton },
};

const statuses = [
	{ name: "Все", value: "all" },
	{ name: "Новый", value: "received" },
	{ name: "Отложенные", value: "processing" },
	{ name: "Готовится", value: "processing" },
	{ name: "Готов к выдаче", value: "pending" },
	{ name: "Завершен", value: "completed" },
	{ name: "Отменен", value: "canceled" },
];
</script>
