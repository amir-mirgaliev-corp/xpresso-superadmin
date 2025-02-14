<template>
	<div class="transactions-filters bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full mb-4">
		<div class="client__content-container flex items-end gap-4">
			<div class="client__filter-container flex gap-4">
				<CustomSelect
					v-for="filter in filters"
					:key="filter.id"
					:queryName="filter.queryName"
					:options="filter.options"
					:label="filter.label"
					:sort="filter?.sort"
					selectClass="w-[250px] h-[46px]"
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

			<div class="ml-auto">
				<Calendar />
			</div>
		</div>
	</div>
</template>

<script>
import Calendar from "@/components/shared/Calendar.vue";
import CustomButton from "../../shared/CustomButton.vue";
import CustomSelect from "../../shared/CustomSelect.vue";

export default {
	components: {
		CustomButton,
		CustomSelect,
		Calendar,
	},

	computed: {
		hasAppliedFilters() {
			return this.filters.some(filter => Object.keys(this.$route.query).includes(filter.queryName));
		},
	},

	data: () => ({
		filters: [
			{
				id: 0,
				queryName: "search_field",
				label: "Параметр для поиска",
				options: [
					{
						title: "Имя пользователя",
						name: "user_name",
					},
					{
						title: "ID Заказа",
						name: "order_id",
					},
				],
			},
		],
	}),

	methods: {
		clearFilters() {
			const updatedQuery = { ...this.$route.query };
			this.filters.forEach(filter => {
				delete updatedQuery[filter.queryName];
			});

			this.$router.replace({ query: updatedQuery });
		},
	},
};
</script>
