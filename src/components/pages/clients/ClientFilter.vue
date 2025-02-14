<template>
	<section class="client__filter bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<div class="client__content-container flex items-end gap-4">
			<div class="client__filter-container flex gap-4">
				<CustomSelect
					v-for="filter in filters"
					:key="filter.id"
					:queryName="filter.queryName"
					:options="filter.options"
					:label="filter.label"
					:sort="filter?.sort"
					selectClass="w-[220px] h-[46px]"
				/>
			</div>

			<CustomButton
				v-if="hasAppliedFilters"
				icon="fi-rr-cross-small"
				class="h-[46px] width-fit"
				@click="clearFilters"
			>
				Очистить
			</CustomButton>
		</div>
	</section>
</template>

<script>
import CustomButton from "../../shared/ui/CustomButton.vue";
import CustomSelect from "../../shared/ui/CustomSelect.vue";

import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		CustomButton,
		CustomSelect,
	},

	computed: {
		...mapGetters(["getTransportCategories", "getTransportModels"]),

		hasAppliedFilters() {
			return this.filters.some(filter => Object.keys(this.$route.query).includes(filter.queryName));
		},
	},

	data: () => ({
		transportModels: null,
		filters: [
			{
				id: 0,
				queryName: "transport_mark",
				label: "Марка автомобиля",
				options: [],
			},
			{
				id: 2,
				sort: true,
				queryName: "orders",
				label: "Количество заказов",
				options: [],
			},
		],
	}),

	methods: {
		...mapActions(["fetchTransportCategories", "fetchTransportModels"]),

		async loadTransportModels() {
			const filterModelIndex = this.filters.findIndex(filter => filter.queryName === "transport_model");
			if (filterModelIndex !== -1) {
				this.filters.splice(filterModelIndex, 1);
				const query = Object.assign({}, this.$route.query);
				delete query.transport_model;
				this.$router.replace({ query });
			}

			await this.fetchTransportModels();

			if (this.getTransportModels.length) {
				const appliedCategory = this.getTransportCategories.find(
					category => category.name === this.$route.query.transport_mark,
				);

				if (!appliedCategory) return;

				this.filters.splice(1, 0, {
					id: 1,
					queryName: "transport_model",
					label: "Модель автомобиля",
					options: this.getTransportModels.filter(model => +model.categoryId === +appliedCategory.id),
				});
			}
		},

		clearFilters() {
			const updatedQuery = { ...this.$route.query };
			const filterModelIndex = this.filters.findIndex(filter => filter.queryName === "transport_model");

			this.filters.forEach(filter => {
				delete updatedQuery[filter.queryName];
			});

			this.$router.replace({ query: updatedQuery });

			if (filterModelIndex !== -1) {
				this.filters.splice(filterModelIndex, 1);
			}
		},
	},
	async mounted() {
		await this.fetchTransportCategories();
		this.filters[0].options = this.getTransportCategories;
	},

	watch: {
		"$route.query.transport_mark": {
			immediate: true,

			async handler(newValue) {
				if (newValue) {
					console.log(newValue);

					if (!this.getTransportCategories.length) {
						await this.fetchTransportCategories();
						this.filters[0].options = this.getTransportCategories;
					}
					this.loadTransportModels();
				}
			},
		},
	},
};
</script>
