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
				@deleteQuestion="deleteQuestion"
			/>
		</div>
		<div v-else>
			<p>Нет созданных вопросов</p>
		</div>
		<!-- <ContentFAQQuestionCard @openEditModal="openEditModal" @deleteQuestion="deleteQuestion" /> -->

		<ContentFAQQuestionModal v-if="questionModalOpen" @close="closeModal" :initialFormData="questionData" />
		<ContentFAQDeleteModal v-if="questionDeleteModalOpen" @close="closeModal" :id="questionDeleteId" />
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ContentFAQQuestionCard from "./ContentFAQQuestionCard.vue";
import ContentFAQQuestionModal from "./ContentFAQQuestionModal.vue";
import { mapActions, mapGetters } from "vuex";
import faq from "@/api/faq";

export default {
	components: { CustomButton, ContentFAQQuestionCard, ContentFAQQuestionModal },
	data: () => ({
		questionModalOpen: false,
		questionDeleteModalOpen: false,
		questionDeleteId: null,
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
		deleteQuestion(id) {
			this.questionDeleteId = id;
			this.questionDeleteModalOpen = true;
		},
	},
	async mounted() {
		await this.fetchQuestions();
	},
};
</script>

<style></style>
