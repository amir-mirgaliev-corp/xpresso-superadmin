<template>
	<div class="flex justify-end mt-[-63px] mb-6">
		<CustomButton
			icon="fi-br-plus"
			class="h-12 width-fit"
			@click="$router.push(`/branch/create/${$route.params.chain_id}`)"
		>
			Добавить филиал
		</CustomButton>
	</div>

	<div v-if="branches.length">
		<TableLayout :table-options="tableOptions" :pagination-options="paginationOptions">
			<template #title>
				<h2 class="table-title">Список филиалов</h2>
			</template>
		</TableLayout>
	</div>

	<div v-else class="p-6 bg-white border rounded-[12px]">
		<p>У этой сети еще нет заведений</p>
	</div>
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import { mapActions, mapGetters } from "vuex";

const env = import.meta.env;

export default {
	data: () => ({
		branches: [],
		tableOptions: {
			editLink: "/branch",
			thead: ["№", "Логотип", "Название", "ID", "Номер телефона"],
			content: [],
		},
		paginationOptions: {
			count: null,
			limit: 10,
			page: 1,
		},
	}),

	components: {
		TableLayout,
		CustomButton,
	},

	computed: {
		...mapGetters(["getBranches", "getOneChain"]),
	},

	methods: {
		...mapActions(["fetchBranches", "fetchOneChainById"]),

		async loadBranches() {
			const id = this.$route.params.chain_id;

			await this.fetchBranches({ id });
			this.branches = this.getBranches.data.branches;

			this.tableOptions.content = this.branches.map((branch, i) => {
				return {
					index: i + 1,
					avatar: env.VITE_APP_STATIC_URL + branch.logo,
					name: branch.name,
					id: branch.id,
					phone: branch.phone,
				};
			});
		},

		async getPageName() {
			const id = this.$route.params.chain_id;
			await this.fetchOneChainById(id);

			this.$route.meta.page = this.getOneChain.name;
		},
	},

	watch: {
		getBranches: {
			deep: true,

			handler() {
				this.branches = this.getBranches.data.branches;
			},
		},
	},

	async mounted() {
		await this.loadBranches();
		await this.getPageName();
	},
};
</script>
