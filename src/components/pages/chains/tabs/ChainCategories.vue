<template>
	<div class="flex justify-end mt-[-63px] mb-6 max-lg:mt-0 max-lg:justify-start">
		<CustomButton icon="fi-br-plus" class="h-12 width-fit" @click="categoryModalOpen = true">
			Добавить категорию
		</CustomButton>
	</div>

	<div v-if="categories.length">
		<TableLayout :table-options="tableOptions" @action="handleAction">
			<template #title>
				<h2 class="table-title">Список категорий</h2>
			</template>
		</TableLayout>
	</div>

	<div v-else class="p-6 bg-white border rounded-[12px]">
		<p>У этой сети еще нет категорий</p>
	</div>

	<CategoryModal
		v-if="categoryModalOpen"
		:initial-data="categoryUnderAction"
		@update="loadCategories"
		@close="closeCategoryModal"
	/>

	<DangerModal v-if="deleteModalOpen" @confirm="deleteCategory(categoryUnderAction.id)" @close="closeDeleteModal" />
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import CategoryModal from "../components/CategoryModal.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import categories from "@/api/categories";

export default {
	data: () => ({
		categoryModalOpen: false,
		deleteModalOpen: false,
		categoryUnderAction: null,
		categories: [],
		tableOptions: {
			thead: ["№", "Название на русском", "Название на узб.", "Название на англ.", "Действия"],
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
		CategoryModal,
		DangerModal,
	},

	methods: {
		async loadCategories() {
			const chaid_id = this.$route.params.chain_id;

			const response = await categories.getCategories(chaid_id);

			if (response && response.length) {
				this.categories = response;
			} else {
				this.categories = [];
			}

			this.tableOptions.content = this.categories.map((category, i) => {
				return {
					index: i + 1,
					name_ru: category.name_ru,
					name_uz: category.name_uz,
					name_en: category.name_en,
					id: category.id,
					actions: true,
				};
			});
		},

		async deleteCategory(id) {
			const response_status = await categories.deleteCategory(id);

			if (response_status === 204) {
				this.loadCategories();
				this.closeDeleteModal();
			}
		},

		handleAction(data) {
			this.categoryUnderAction = this.categories.find(cat => cat.id === data.id);

			if (data.action === "edit") {
				this.categoryModalOpen = true;
			} else if (data.action === "delete") {
				this.deleteModalOpen = true;
			}
		},

		closeCategoryModal() {
			this.categoryModalOpen = false;
			this.categoryUnderAction = null;
		},

		closeDeleteModal() {
			this.deleteModalOpen = false;
			this.categoryUnderAction = null;
		},
	},

	mounted() {
		this.loadCategories();
	},
};
</script>
