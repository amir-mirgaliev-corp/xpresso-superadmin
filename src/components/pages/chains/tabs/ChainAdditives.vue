<template>
	<div class="flex justify-end mt-[-63px] mb-6 max-lg:mt-0 max-lg:justify-start">
		<CustomButton icon="fi-br-plus" class="h-12 width-fit" @click="additiveModalOpen = true">
			Создать добавку
		</CustomButton>
	</div>

	<div v-if="additives.length">
		<TableLayout
			:table-options="tableOptions"
			:pagination-options="paginationOptions"
			@update:page="handlePageChange"
			@action="handleAction"
		>
			<template #title>
				<h2 class="table-title">Список добавок</h2>
			</template>
		</TableLayout>
	</div>

	<div v-else class="p-6 bg-white border rounded-[12px]">
		<p>У этой сети еще нет добавок</p>
	</div>

	<AdditiveModal
		v-if="additiveModalOpen"
		:initial-data="additiveUnderAction"
		@update="loadAdditives"
		@close="closeAdditiveModal"
	/>

	<DangerModal v-if="deleteModalOpen" @confirm="deleteAdditive(additiveUnderAction.id)" @close="closeDeleteModal" />
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import AdditiveModal from "../components/AdditiveModal.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import additives from "@/api/additives";

import { mapActions, mapGetters } from "vuex";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

export default {
	data: () => ({
		additiveModalOpen: false,
		deleteModalOpen: false,
		additiveUnderAction: null,
		additives: [],
		paginationOptions: {
			page: 1,
			limit: 10,
			count: 0,
		},
		tableOptions: {
			thead: ["№", "Название на русском", "Название на узб.", "Название на англ.", "Цена", "Действия"],
			content: [],
			actions: [
				{ name: "edit", title: "Редактировать", icon: "fi-rs-file-edit" },
				{ name: "delete", title: "Удалить", icon: "fi-rr-trash" },
			],
		},
	}),

	components: {
		TableLayout,
		CustomButton,
		AdditiveModal,
		DangerModal,
	},

	computed: {
		...mapGetters(["getAdditives"]),
	},

	methods: {
		...mapActions(["fetchAdditives"]),

		async loadAdditives() {
			const chain_id = this.$route.params.chain_id;

			// pagination
			const { page, limit } = this.paginationOptions;
			const filters = { page, limit };

			await this.fetchAdditives({ chain_id, filters });

			this.setAdditivesTable();
		},

		async deleteAdditive(id) {
			const response_status = await additives.deleteAdditive(id);

			if (response_status === 204) {
				this.loadAdditives();
				this.closeDeleteModal();
			}
		},

		setAdditivesTable() {
			this.tableOptions.content = this.additives.map((additive, i) => {
				return {
					index: i + 1,
					name_ru: additive.name_ru,
					name_uz: additive.name_uz,
					name_en: additive.name_en,
					price: formatNumberWithSpaces(additive.price) + " сум",
					id: additive.id,
					actions: true,
				};
			});
		},

		handleAction(data) {
			this.additiveUnderAction = this.additives.find(add => add.id === add.id);

			if (data.action === "edit") {
				this.additiveModalOpen = true;
			} else if (data.action === "delete") {
				this.deleteModalOpen = true;
			}
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},

		closeAdditiveModal() {
			this.additiveModalOpen = false;
			this.additiveUnderAction = null;
		},

		closeDeleteModal() {
			this.deleteModalOpen = false;
			this.additiveUnderAction = null;
		},
	},

	mounted() {
		this.loadAdditives();
	},

	watch: {
		getAdditives: {
			deep: true,
			handler(newValue) {
				if (newValue) {
					this.additives = newValue.items;
					this.paginationOptions.count = newValue.total;
					this.setAdditivesTable();
				}
			},
		},

		"paginationOptions.page": {
			handler() {
				this.loadCategories();
			},
		},
	},
};
</script>
