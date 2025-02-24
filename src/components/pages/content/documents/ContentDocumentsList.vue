<template>
	<div class="bg-white gap-[16px] py-4 px-6 rounded-[12px] border-[1px] w-full max-sm:px-3 max-sm:py-3">
		<div class="flex gap-x-6 max-sm:gap-x-3">
			<h2 class="table-title">Документы</h2>
			<CustomButton icon="fi-br-plus" class="width-fit h-12 mb-6 ml-auto max-sm:!w-[160px]" @click="documentModalOpen = true">
				Загрузить
			</CustomButton>
		</div>
		<div v-if="documentsList?.length" class="flex flex-col gap-y-2">
			<ContentDocumentCard
				v-for="document in documentsList"
				:key="document?.id"
				:links="document?.links"
				:name="document?.name"
				@openEditModal="openEditModal"
				@onDeleteClick="onDeleteClick"
			/>
		</div>
		<div v-else>
			<p>Нет загруженных документов</p>
		</div>
		<!-- <ContentDocumentCard @openEditModal="openEditModal" @deleteQuestion="deleteQuestion" /> -->
		<ContentDocumentsModal v-if="documentModalOpen" @close="closeModal" :initialFormData="documentData" />
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
import { mapActions, mapGetters } from "vuex";
import ContentDocumentCard from "./ContentDocumentCard.vue";
import docs from "@/api/docs";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

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
		deleteName: "",
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
		...mapActions(["fetchDocuments", "fetchOneDocumentByName", "clearOneDocument"]),
		async openEditModal(name) {
			await this.fetchOneDocumentByName(name);
			this.documentModalOpen = true;
		},
		closeModal() {
			this.documentModalOpen = false;
			this.documentDeleteModalOpen = false;
			this.clearOneDocument();
		},
		onDeleteClick(name) {
			this.deleteName = name;
			this.documentDeleteModalOpen = true;
		},
		async deleteDocument() {
			try {
				this.deleteLoading = true;
				const status = await docs.deleteDocument(this.deleteName);
				if (status === 201) this.$router.push("/content");
			} catch (err) {
				console.log("Error creating avatar: ", err);
			} finally {
				this.deleteLoading = false;
			}
		},
	},
	async mounted() {
		await this.fetchDocuments();
	},
};
</script>

<style></style>
