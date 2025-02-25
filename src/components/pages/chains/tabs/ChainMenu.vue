<template>
	<div class="flex justify-end mt-[-63px] mb-6 max-lg:mt-0 max-lg:justify-start">
		<CustomButton
			icon="fi-br-plus"
			class="h-12 width-fit"
			@click="$router.push(`/product/create/${$route.params.chain_id}`)"
		>
			Добавить продукт
		</CustomButton>
	</div>

	<div v-if="menu.length">
		<TableLayout
			:table-options="tableOptions"
			:pagination-options="paginationOptions"
			@update:page="handlePageChange"
			@action="handleAction"
		>
			<template #title>
				<h2 class="table-title">Список продуктов</h2>
			</template>
		</TableLayout>
	</div>

	<div v-else class="p-6 bg-white border rounded-[12px]">
		<p>У этой сети еще нет продуктов</p>
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import CustomSelect from "@/components/shared/ui/CustomSelect.vue";
import TableLayout from "@/components/shared/TableLayout.vue";

import { mapActions, mapGetters } from "vuex";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

export default {
	data() {
		return {
			menu: [],
			tableOptions: {
				editLink: "/product/edit",
				thead: ["№", "Картинка", "Название", "Цена"],
				content: [],
			},
			paginationOptions: {
				count: null,
				limit: 10,
				page: 1,
			},
		};
	},

	computed: {
		...mapGetters(["getProducts"]),
	},

	methods: {
		...mapActions(["fetchProducts"]),

		async loadMenu() {
			const chain_id = this.$route.params.chain_id;

			// pagination
			const { page, limit } = this.paginationOptions;
			const filters = { page, limit };

			await this.fetchProducts({ chain_id, filters });

			this.setProductsTable();
		},

		setProductsTable() {
			this.tableOptions.content = this.menu.map((product, i) => {
				return {
					index: i + 1,
					avatar: product.img,
					name: product.name_ru,
					price: formatNumberWithSpaces(product.price) + " сум",
					id: product.id,
				};
			});
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},
	},

	mounted() {
		this.loadMenu();
	},

	watch: {
		getProducts: {
			deep: true,
			handler(newValue) {
				if (newValue) {
					this.menu = newValue.items;
					this.paginationOptions.count = newValue.total;
					this.setProductsTable();
				}
			},
		},

		"paginationOptions.page": {
			handler() {
				this.loadMenu();
			},
		},
	},

	components: {
		TableLayout,
		CustomButton,
		CustomSelect,
	},
};
</script>
