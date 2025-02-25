<template>
	<section
		class="flex justify-between items-end bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full max-sm:flex-col max-sm:items-start"
	>
		<div class="flex gap-4 items-end max-lg:flex-col max-sm:w-full max-sm:items-start">
			<CustomSelect
				v-for="filter in filters"
				:key="filter.id"
				:queryName="filter.queryName"
				:options="filter.options"
				:label="filter.label"
				:sort="filter?.sort"
				selectClass="w-[220px] h-[46px] max-sm:w-full"
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

	<section class="orders__filters flex items-center justify-between mt-4  max-sm:flex-col max-sm:gap-y-3 max-sm:items-start">
		<div class="orders__filters-tabs max-sm:w-full">
			<div class="tabs__header">
				<template v-if="screenWidth > 1024">
					<div
						v-for="status in statuses"
						:key="status.name"
						class="tabs__header-item"
						:class="{ active: status.name === activeStatus }"
						@click="setActiveStatus(status.name)"
					>
						{{ status.title }}
					</div>
				</template>
				<template v-else>
					<CustomSelect
						:options="statuses"
						v-model="activeStatus"
						selectClass="w-[240px] h-[46px] bg-white max-sm:w-full"
						placeholder="Выберите статус заказа"
						queryName="status"
					/>
				</template>
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
	emits: ["change-layout", "clear"],
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
		screenWidth() {
			return window.screen.width;
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
			this.$emit("clear");
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
				console.log(newStatus);
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
	{ title: "Все", name: "all" },
	{ title: "Новый", name: "received" },
	{ title: "Отложенные", name: "scheduled" },
	{ title: "Готовится", name: "processing" },
	{ title: "Готов к выдаче", name: "pending" },
	{ title: "Завершен", name: "completed" },
	{ title: "Отменен", name: "canceled" },
];
</script>
