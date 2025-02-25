<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal !max-w-[1000px]">
				<h2 class="text-center mb-4 text-2xl">
					{{
						initialFormData && Object.keys(initialFormData).length
							? "Редактирование вопроса"
							: "Создание вопроса"
					}}
				</h2>

				<form @submit.prevent="submitForm" class="grid grid-cols-3 gap-x-4">
					<div>
						<div class="flex flex-col gap-y-1">
							<label for="question_ru" class="text-sm">Вопрос на рус.:</label>
							<input
								type="text"
								id="question_ru"
								placeholder="Введите вопрос"
								:class="[
									'form__input',
									{
										error: v$.formData.question.en.$errors.length,
									},
								]"
								v-model="formData.question.ru"
							/>
							<span v-if="v$.formData.question.ru.$errors.length" class="form__error"
								>Введите вопрос</span
							>
						</div>
						<div class="flex flex-col gap-y-1 mt-3">
							<label for="answer_ru" class="text-sm">Ответ на рус.:</label>
							<textarea
								id="answer_ru"
								placeholder="Введите ответ"
								:class="[
									'form__input resize-none min-h-[120px]',
									{
										error: v$.formData.question.en.$errors.length,
									},
								]"
								v-model="formData.answer.ru"
							></textarea>
							<span v-if="v$.formData.answer.ru.$errors.length" class="form__error">Введите ответ</span>
						</div>
					</div>
					<div>
						<div class="flex flex-col gap-y-1">
							<label for="question_uz" class="text-sm">Вопрос на узб.:</label>
							<input
								type="text"
								id="question_uz"
								placeholder="Savolni kiriting"
								:class="[
									'form__input',
									{
										error: v$.formData.question.en.$errors.length,
									},
								]"
								v-model="formData.question.uz"
							/>
							<span v-if="v$.formData.question.uz.$errors.length" class="form__error"
								>Введите вопрос</span
							>
						</div>
						<div class="flex flex-col gap-y-1 mt-3">
							<label for="answer_uz" class="text-sm">Ответ на узб.:</label>
							<textarea
								id="answer_uz"
								placeholder="Javobni kiriting"
								:class="[
									'form__input resize-none min-h-[120px]',
									{
										error: v$.formData.question.en.$errors.length,
									},
								]"
								v-model="formData.answer.uz"
							></textarea>
							<span v-if="v$.formData.answer.uz.$errors.length" class="form__error">Введите ответ</span>
						</div>
					</div>
					<div>
						<div class="flex flex-col gap-y-1">
							<label for="question_en" class="text-sm">Вопрос на англ.:</label>
							<input
								type="text"
								id="question_en"
								placeholder="Enter question"
								:class="[
									'form__input',
									{
										error: v$.formData.question.en.$errors.length,
									},
								]"
								v-model="formData.question.en"
							/>
							<span v-if="v$.formData.question.en.$errors.length" class="form__error"
								>Введите вопрос</span
							>
						</div>
						<div class="flex flex-col gap-y-1 mt-3">
							<label for="answer_en" class="text-sm">Ответ на англ.:</label>
							<textarea
								id="answer_en"
								placeholder="Enter answer"
								:class="[
									'form__input resize-none min-h-[120px]',
									{
										error: v$.formData.question.en.$errors.length,
									},
								]"
								v-model="formData.answer.en"
							></textarea>
							<span v-if="v$.formData.answer.en.$errors.length" class="form__error">Введите ответ</span>
						</div>
					</div>
				</form>

				<div class="modal__actions grid grid-cols-2 gap-4 mt-6">
					<CustomButton class="h-12" @click="submitForm" :disabled="loading">{{
						loading ? "Загрузка..." : "Создать"
					}}</CustomButton>
					<CustomButton class="h-12" @click="$emit('close')" type="secondary-filled">Закрыть</CustomButton>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import { required } from "@vuelidate/validators";
import faq from "@/api/faq";
import useVuelidate from "@vuelidate/core";

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},
	components: {
		CustomButton,
	},
	props: {
		initialFormData: {
			type: Object,
			required: true,
			default: null,
		},
	},
	data: () => ({
		formData: {
			question: {
				ru: "",
				uz: "",
				en: "",
			},
			answer: {
				ru: "",
				uz: "",
				en: "",
			},
		},
		loading: false,
	}),
	validations() {
		return {
			formData: {
				question: {
					ru: { required },
					uz: { required },
					en: { required },
				},

				answer: {
					ru: { required },
					uz: { required },
					en: { required },
				},
			},
		};
	},
	methods: {
		async submitForm() {
			const isValid = await this.v$.$validate();
			if (!isValid) return;

			this.initialFormData && Object.keys(this.initialFormData).length ? this.updateQuestion() : this.createQuestion();
		},

		async createQuestion() {
			const fd = new FormData();
			fd.append("question", JSON.stringify(this.formData.question));
			fd.append("answer", JSON.stringify(this.formData.answer));

			try {
				this.loading = true;
				const response = await faq.createQuestion(fd);
				if (response.status === 201) {
					this.$router.push("/content");
				}
			} catch (err) {
				console.error("Ошибка создания вопроса:", err);
			} finally {
				this.loading = false;
			}
		},

		async updateQuestion() {
			const fd = new FormData();
			fd.append("question", JSON.stringify(this.formData.question));
			fd.append("answer", JSON.stringify(this.formData.answer));

			try {
				this.loading = true;
				const response = await faq.updateQuestion(this.initialFormData.id, fd);
				if (response.status === 200) {
					this.$router.push("/content");
				}
			} catch (err) {
				console.error("Ошибка обновления вопроса:", err);
			} finally {
				this.loading = false;
			}
		},
		setFormData() {
			this.formData.question.ru = this.initialFormData?.question?.ru;
			this.formData.question.uz = this.initialFormData?.question?.uz;
			this.formData.question.en = this.initialFormData?.question?.en;
			this.formData.answer.ru = this.initialFormData?.answer?.ru;
			this.formData.answer.uz = this.initialFormData?.answer?.uz;
			this.formData.answer.en = this.initialFormData?.answer?.en;
		},
	},
	mounted() {
		if (this.initialFormData) {
			this.setFormData();
		}
	},
};
</script>

<style></style>
