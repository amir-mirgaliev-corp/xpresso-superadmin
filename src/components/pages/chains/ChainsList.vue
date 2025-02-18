<template>
	<div v-if="chains" class="chains__content">
		<div class="chains__content-container">
			<CustomButton icon="fi-br-plus" class="width-fit h-12 mb-6 ml-auto" @click="linkToAddChain">
				Добавить сеть
			</CustomButton>

			<TableLayout
				:table-options="tableOptions"
				:pagination-options="paginationOptions"
				@update:page="handlePageChange"
			>
				<template #title>
					<h2 class="table-title">Список сетей</h2>
				</template>
			</TableLayout>
		</div>
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import TableLayout from "@/components/shared/TableLayout.vue";

import { mapActions, mapGetters } from "vuex";

const env = import.meta.env;

export default {
	data: () => ({
		chains: null,
		paginationOptions: {
			page: 1,
			limit: 10,
			count: 0,
		},
		tableOptions: {
			thead: ["№", "Логотип", "Название", "ID"],
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
			this.chains = this.getChains;

			this.tableOptions.content = this.chains.rows.map((chain, index) => {
				return {
					index: (this.paginationOptions.page - 1) * this.paginationOptions.limit + index + 1,
					avatar: chain.preview
						? `${env.VITE_APP_STATIC_URL}${chain.preview}`
						: "/src/assets/images/default_avatar.svg",
					name: chain.name,
					id: chain.id,
				};
			});

			console.log(this.chains);
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},

		linkToAddChain() {
			this.$router.replace({ path: "/chains/create" });
		},
	},

	async mounted() {
		await this.loadChains();
	},

	watch: {
		getChains: {
			immediate: true,
			deep: true,

			handler() {
				this.chains = this.getChains;
			},
		},
	},

	components: {
		CustomButton,
		TableLayout,
	},
};
</script>
