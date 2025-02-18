<template>
	<div class="bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<div class="flex gap-x-6">
			<h2 class="table-title">Документы</h2>
			<CustomButton icon="fi-br-plus" class="width-fit h-12 mb-6 ml-auto" @click="documentModalOpen = true">
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
				@deleteQuestion="deleteQuestion"
			/>
		</div>
		<div v-else>
			<p>Нет загруженных документов</p>
		</div>
		<!-- <ContentDocumentCard @openEditModal="openEditModal" @deleteQuestion="deleteQuestion" /> -->
		<ContentDocumentsModal v-if="documentModalOpen" @close="closeModal" :initialFormData="documentData" />
		<ContentDocumentDeleteModal v-if="documentDeleteModalOpen" @close="closeModal" :name="deleteName" />
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ContentFAQQuestionCard from "./ContentFAQQuestionCard.vue";
import ContentDocumentsModal from "./ContentDocumentsModal.vue";
import { mapActions, mapGetters } from "vuex";
import ContentDocumentCard from "./ContentDocumentCard.vue";
import ContentDocumentDeleteModal from "./ContentDocumentDeleteModal.vue";
// import documents from "@/api/docs";

export default {
	components: {
		CustomButton,
		ContentFAQQuestionCard,
		ContentDocumentsModal,
		ContentDocumentCard,
		ContentDocumentDeleteModal,
	},
	data: () => ({
		documentModalOpen: false,
		documentDeleteModalOpen: false,
		deleteName: "",
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
		deleteQuestion(name) {
			this.deleteName = name;
			this.documentDeleteModalOpen = true;
		},
	},
	async mounted() {
		await this.fetchDocuments();
	},
};
</script>

<style></style>
