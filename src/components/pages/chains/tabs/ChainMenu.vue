<template>
	<div class="flex justify-end mt-[-63px] mb-6">
		<CustomButton
			icon="fi-br-plus"
			class="h-12 width-fit"
			@click="$router.push(`/product/create/${$route.params.chain_id}`)"
		>
			Добавить продукт
		</CustomButton>
	</div>

	<div v-if="menu.length">
		<TableLayout :table-options="tableOptions" :pagination-options="paginationOptions">
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

import products from "@/api/products";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

const env = import.meta.env;

export default {
	data() {
		return {
			menu: [],
			tableOptions: {
				editLink: "/product/edit",
				thead: ["№", "Картинка", "Название", "ID", "Цена"],
				content: [],
			},
			paginationOptions: {
				count: null,
				limit: 10,
				page: 1,
			},
		};
	},

	methods: {
		async getMenu() {
			const chain_id = this.$route.params.chain_id;
			const response = await products.getChainProducts(chain_id);
			this.menu = response.menuData;
			console.log(response);

			this.tableOptions.content = this.menu.map((product, i) => {
				return {
					index: i + 1,
					avatar: env.VITE_APP_STATIC_URL + product.photo,
					name: product.name.ru,
					id: product.id,
					price: formatNumberWithSpaces(product.price) + " сум",
				};
			});
		},
	},

	mounted() {
		this.getMenu();
	},

	components: {
		TableLayout,
		CustomButton,
		CustomSelect,
	},
};
</script>
