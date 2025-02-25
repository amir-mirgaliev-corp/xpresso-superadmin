<template>
	<div class="flex justify-end mt-[-63px] mb-6 max-lg:mt-0 max-lg:justify-start">
		<CustomButton
			icon="fi-br-plus"
			class="h-12 width-fit"
			@click="$router.push(`/branch/create/${$route.params.chain_id}`)"
		>
			Добавить филиал
		</CustomButton>
	</div>

	<div v-if="branches.length">
		<TableLayout
			:table-options="tableOptions"
			:pagination-options="paginationOptions"
			@update:page="handlePageChange"
			@action="handleAction"
		>
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

import defaultAvatar from "@/assets/images/coffee_avatar.svg";

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
		...mapGetters(["getBranches"]),
	},

	methods: {
		...mapActions(["fetchBranches"]),

		async loadBranches() {
			const chain_id = this.$route.params.chain_id;

			// pagination
			const { page, limit } = this.paginationOptions;
			const filters = { page, limit };

			await this.fetchBranches({ chain_id, filters });

			this.setBranchesTable();
		},

		setBranchesTable() {
			this.tableOptions.content = this.branches.map((branch, i) => {
				return {
					index: i + 1,
					avatar: branch.chain_logo || defaultAvatar,
					name: branch.full_name,
					phone: branch.phone_number,
					id: branch.id,
				};
			});
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},
	},

	mounted() {
		this.loadBranches();
	},

	watch: {
		getBranches: {
			deep: true,
			handler(newValue) {
				if (newValue) {
					this.branches = newValue.items;
					this.paginationOptions.count = newValue.total;
					this.setBranchesTable();
				}
			},
		},

		"paginationOptions.page": {
			handler() {
				this.loadBranches();
			},
		},
	},
};
</script>
