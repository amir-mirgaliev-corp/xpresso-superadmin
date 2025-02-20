<template>
	<div class="bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<div class="flex gap-x-6">
			<h2 class="table-title">FAQ</h2>
			<CustomButton icon="fi-br-plus" class="width-fit h-12 mb-6 ml-auto" @click="questionModalOpen = true">
				Создать
			</CustomButton>
		</div>
		<div v-if="questionsList?.length">
			<ContentFAQQuestionCard
				v-for="question in questionsList"
				:key="question.id"
				:content="question?.answer?.ru"
				:title="question?.question?.ru"
				:id="question.id"
				@openEditModal="openEditModal"
				@onDeleteClick="onDeleteClick"
			/>
		</div>
		<div v-else>
			<p>Нет созданных вопросов</p>
		</div>
		<!-- <ContentFAQQuestionCard @openEditModal="openEditModal" @onDeleteClick="onDeleteClick" /> -->
		<DangerModal
			v-if="questionDeleteModalOpen"
			@close="closeModal"
			@confirm="deleteQuestion"
			title="Вы уверены что хотите удалить вопрос?"
		/>
		<ContentFAQQuestionModal v-if="questionModalOpen" @close="closeModal" :initialFormData="questionData" />
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ContentFAQQuestionCard from "./ContentFAQQuestionCard.vue";
import ContentFAQQuestionModal from "./ContentFAQQuestionModal.vue";
import { mapActions, mapGetters } from "vuex";
import faq from "@/api/faq";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

export default {
	components: { CustomButton, ContentFAQQuestionCard, ContentFAQQuestionModal, DangerModal },
	data: () => ({
		questionModalOpen: false,
		questionDeleteModalOpen: false,
		questionDeleteId: null,
		deleteLoading: false,
	}),
	computed: {
		...mapGetters(["getQuestions", "getOneQuestion"]),
		questionsList() {
			return this.getQuestions;
		},
		questionData() {
			return this.getOneQuestion;
		},
	},
	methods: {
		...mapActions(["fetchQuestions", "fetchOneQuestionById", "clearOneQuestion"]),
		async openEditModal(id) {
			await this.fetchOneQuestionById(id);
			this.questionModalOpen = true;
		},
		closeModal() {
			this.clearOneQuestion();
			this.questionModalOpen = false;
			this.questionDeleteModalOpen = false;
		},
		onDeleteClick(id) {
			console.log('delete emit works')
			this.questionDeleteId = id;
			this.questionDeleteModalOpen = true;
		},
		async deleteQuestion() {
			try {
				this.deleteLoading = true;
				const status = await faq.deleteQuestion(this.questionDeleteId);
				if (status === 201) this.$router.push("/content");
			} catch (err) {
				console.log("Error creating avatar: ", err);
			} finally {
				this.deleteLoading = false;
			}
		},
	},
	async mounted() {
		await this.fetchQuestions();
	},
};
</script>

<style></style>
