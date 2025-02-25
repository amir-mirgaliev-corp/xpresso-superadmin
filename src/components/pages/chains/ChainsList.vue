<template>
	<div class="chains__content">
		<div class="chains__content-container">
			<CustomButton icon="fi-br-plus" class="width-fit h-12 mb-6 ml-auto" @click="linkToAddChain">
				Добавить сеть
			</CustomButton>

			<TableLayout
				v-if="chains.length"
				:table-options="tableOptions"
				:pagination-options="paginationOptions"
				@update:page="handlePageChange"
			>
				<template #title>
					<h2 class="table-title">Список сетей</h2>
				</template>
			</TableLayout>

			<div v-else class="p-6 bg-white border rounded-[12px]">
				<p>У этой сети еще нет заведений</p>
			</div>
		</div>
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import TableLayout from "@/components/shared/TableLayout.vue";

import { mapActions, mapGetters } from "vuex";

export default {
	data: () => ({
		chains: [],
		paginationOptions: {
			page: 1,
			limit: 10,
			count: 0,
		},
		tableOptions: {
			thead: ["№", "Логотип", "Название", "Дополнительная информация"],
			editLink: "/chain",
			content: [],
		},
	}),

	computed: {
		...mapGetters(["getChains"]),
	},

	methods: {
		...mapActions(["fetchChains"]),

		async loadChains() {
			// pagination
			const { page, limit } = this.paginationOptions;
			const pagination = { page, limit };

			await this.fetchChains(pagination);

			this.chains = this.getChains?.items || [];
			this.setChainsTable();
		},

		setChainsTable() {
			this.tableOptions.content = this.chains.map((chain, index) => {
				return {
					index: (this.paginationOptions.page - 1) * this.paginationOptions.limit + index + 1,
					avatar: chain.logo || "/src/assets/images/coffee_avatar.svg",
					name: chain.name,
					info: chain.additional_info,
					id: chain.id,
				};
			});
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},

		linkToAddChain() {
			this.$router.replace({ path: "/chains/create" });
		},
	},

	mounted() {
		this.loadChains();
	},

	watch: {
		getChains: {
			immediate: true,
			deep: true,
			handler(newValue) {
				// Проверяем, что данные существуют и это массив
				this.chains = newValue?.items || [];
				this.setChainsTable();
			},
		},
	},

	components: { CustomButton, TableLayout },
};
</script>
