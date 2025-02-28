<template>
	<div class="bg-white gap-[16px] py-4 px-6 rounded-[12px] border-[1px] w-full max-sm:px-3 max-sm:py-3">
		<div class="flex gap-x-6 max-sm:gap-x-3">
			<h2 class="table-title">Документы</h2>
			<CustomButton
				icon="fi-br-plus"
				class="width-fit h-12 mb-6 ml-auto max-sm:!w-[160px]"
				@click="documentModalOpen = true"
			>
				Загрузить
			</CustomButton>
		</div>

		<div v-if="documentsList?.length" class="flex flex-col gap-y-2">
			<ContentDocumentCard
				v-for="document in documentsList"
				:key="document.id"
				:document="document"
				@openEditModal="openEditModal"
				@onDeleteClick="onDeleteClick"
			/>
		</div>

		<div v-else>
			<p>Нет загруженных документов</p>
		</div>

		<ContentDocumentsModal
			v-if="documentModalOpen"
			@update="handleUpdate"
			@close="closeModal"
			:initialFormData="documentData"
		/>

		<DangerModal
			v-if="documentDeleteModalOpen"
			@close="closeModal"
			@confirm="deleteDocument"
			title="Вы уверены что хотите удалить документ?"
		/>
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ContentDocumentsModal from "./ContentDocumentsModal.vue";
import ContentDocumentCard from "./ContentDocumentCard.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import { mapActions, mapGetters } from "vuex";
import docs from "@/api/docs";

export default {
	components: {
		CustomButton,
		ContentDocumentsModal,
		ContentDocumentCard,
		DangerModal,
	},

	data: () => ({
		documentModalOpen: false,
		documentDeleteModalOpen: false,
		delete_id: "",
		deleteLoading: false,
	}),

	computed: {
		...mapGetters(["getDocuments", "getOneDocument"]),

		documentsList() {
			return this.getDocuments;
		},

		documentData() {
			return this.getOneDocument;
		},
	},
	methods: {
		...mapActions(["fetchDocuments", "fetchOneDocumentByID", "clearOneDocument"]),

		async openEditModal(id) {
			await this.fetchOneDocumentByID(id);
			this.documentModalOpen = true;
		},

		closeModal() {
			this.documentModalOpen = false;
			this.documentDeleteModalOpen = false;
			this.delete_id = null;
			this.clearOneDocument();
		},

		handleUpdate() {
			this.closeModal();
			this.fetchDocuments();
		},

		onDeleteClick(id) {
			this.delete_id = id;
			this.documentDeleteModalOpen = true;
		},

		async deleteDocument() {
			const status = await docs.deleteDocument(this.delete_id);

			if (status === 204) {
				this.closeModal();
				this.fetchDocuments();
			}
		},
	},

	async mounted() {
		await this.fetchDocuments();
	},
};
</script>

<style></style>
