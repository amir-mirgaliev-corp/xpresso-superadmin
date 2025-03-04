<template>
	<div class="bg-white gap-[16px] py-4 px-6 rounded-[12px] border-[1px] w-full max-sm:px-3 max-sm:py-3">
		<div class="flex gap-x-6 max-sm:gap-x-3">
			<h2 class="table-title">FAQ</h2>

			<CustomButton
				icon="fi-br-plus"
				class="width-fit h-12 mb-6 ml-auto max-sm:!w-[160px]"
				@click="questionModalOpen = true"
			>
				Создать
			</CustomButton>
		</div>

		<div v-if="questionsList?.length">
			<ContentFAQQuestionCard
				v-for="question in questionsList"
				:key="question.id"
				:content="question?.answer_ru"
				:title="question?.question_ru"
				:id="question.id"
				@openEditModal="openEditModal"
				@onDeleteClick="onDeleteClick"
			/>
		</div>

		<div v-else>
			<p>Нет созданных вопросов</p>
		</div>

		<DangerModal
			v-if="questionDeleteModalOpen"
			@close="closeModal"
			@confirm="deleteQuestion"
			title="Вы уверены что хотите удалить вопрос?"
		/>

		<ContentFAQQuestionModal
			v-if="questionModalOpen"
			@update="handleQuestionUpdate"
			@close="closeModal"
			:initialFormData="questionData"
		/>
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
			this.questionDeleteId = null;
		},

		onDeleteClick(id) {
			this.questionDeleteId = id;
			this.questionDeleteModalOpen = true;
		},

		handleQuestionUpdate() {
			this.clearOneQuestion();
			this.questionModalOpen = false;
			this.questionDeleteModalOpen = false;
			this.fetchQuestions();
		},

		async deleteQuestion() {
			this.deleteLoading = true;
			const status = await faq.deleteQuestion(this.questionDeleteId);

			if (status === 204) {
				this.questionDeleteId = null;
				this.questionDeleteModalOpen = false;
				this.fetchQuestions();
			}
		},
	},

	async mounted() {
		await this.fetchQuestions();
	},
};
</script>

<style></style>
