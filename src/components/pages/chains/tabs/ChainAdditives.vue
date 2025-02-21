<template>
	<div class="flex justify-end mt-[-63px] mb-6 max-lg:mt-0 max-lg:justify-start">
		<CustomButton icon="fi-br-plus" class="h-12 width-fit" @click="additiveModalOpen = true">
			Создать добавку
		</CustomButton>
	</div>

	<div v-if="additives.length">
		<TableLayout :table-options="tableOptions" @action="handleAction">
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

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

export default {
	data: () => ({
		additiveModalOpen: false,
		deleteModalOpen: false,
		additiveUnderAction: null,
		additives: [],
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

	methods: {
		async loadAdditives() {
			const chaid_id = this.$route.params.chain_id;

			const response = await additives.getAdditives(chaid_id);

			if (response && response.length) {
				this.additives = response;
			} else {
				this.additives = [];
			}

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

		async deleteAdditive(id) {
			const response_status = await additives.deleteAdditive(id);

			if (response_status === 204) {
				this.loadAdditives();
				this.closeDeleteModal();
			}
		},

		handleAction(data) {
			this.additiveUnderAction = this.additives.find(add => add.id === add.id);

			if (data.action === "edit") {
				this.additiveModalOpen = true;
			} else if (data.action === "delete") {
				this.deleteModalOpen = true;
			}
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
};
</script>
