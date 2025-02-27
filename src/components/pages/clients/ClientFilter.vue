<template>
	<section class="client__filter bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<div class="client__content-container flex items-end gap-4 max-sm:flex-col max-sm:items-start max-sm:w-full">
			<div class="client__filter-container flex gap-4 max-sm:flex-col max-sm:w-full">
				<CustomSelect
					v-for="filter in filters"
					:key="filter.id"
					:queryName="filter.queryName"
					:options="filter.options"
					:label="filter.label"
					:sort="filter?.sort"
					selectClass="w-[220px] h-[46px] max-sm:w-full"
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
		...mapGetters(["getTransportMakeList", "getTransportModelList"]),

		hasAppliedFilters() {
			return this.filters.some(filter => Object.keys(this.$route.query).includes(filter.queryName));
		},
	},

	data: () => ({
		transportModels: null,
		filters: [
			{
				id: 0,
				queryName: "make_id",
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
			{
				id: 3,
				sort: false,
				queryName: "gender",
				label: "Пол",
				options: [
					{ name: "MALE", title: "Мужской" },
					{ name: "FEMALE", title: "Женский" },
				],
			},
		],
	}),

	methods: {
		...mapActions(["fetchTransportMakeList", "fetchTransportModelList"]),

		async loadTransportModels() {
			const filterModelIndex = this.filters.findIndex(filter => filter.queryName === "model_id");

			if (filterModelIndex !== -1) {
				this.filters.splice(filterModelIndex, 1);
				const query = Object.assign({}, this.$route.query);
				delete query.model_id;
				this.$router.replace({ query });
			}

			await this.fetchTransportModelList(this.$route.query.make_id);

			if (this.getTransportModelList.length) {
				this.filters.splice(1, 0, {
					id: 1,
					queryName: "model_id",
					label: "Модель автомобиля",
					options: this.getTransportModelList.map(model => {
						return { id: model.id, name: model.id, title: model.name };
					}),
				});
			}
		},

		clearFilters() {
			const updatedQuery = { ...this.$route.query };
			const filterModelIndex = this.filters.findIndex(filter => filter.queryName === "model_id");

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
		await this.fetchTransportMakeList();
		this.filters[0].options = this.getTransportMakeList.map(make => {
			return { id: make.id, name: make.id, title: make.name };
		});
	},

	watch: {
		"$route.query.make_id": {
			immediate: true,

			async handler(newValue) {
				if (newValue) {
					if (!this.getTransportMakeList.length) {
						await this.fetchTransportMakeList();
						this.filters[0].options = this.getTransportMakeList.map(make => {
							return { id: make.id, name: make.id, title: make.name };
						});
					}

					this.loadTransportModels();
				}
			},
		},
	},
};
</script>
