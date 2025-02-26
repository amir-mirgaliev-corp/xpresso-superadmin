<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal !max-w-[1000px]">
				<h2 class="text-center mb-4 text-2xl">{{ title }}</h2>

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
										error: v$.formData.question_ru.$errors.length,
									},
								]"
								v-model="formData.question_ru"
							/>
							<span v-if="v$.formData.question_ru.$errors.length" class="form__error"
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
										error: v$.formData.answer_ru.$errors.length,
									},
								]"
								v-model="formData.answer_ru"
							></textarea>
							<span v-if="v$.formData.answer_ru.$errors.length" class="form__error">Введите ответ</span>
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
										error: v$.formData.question_uz.$errors.length,
									},
								]"
								v-model="formData.question_uz"
							/>
							<span v-if="v$.formData.question_uz.$errors.length" class="form__error"
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
										error: v$.formData.answer_uz.$errors.length,
									},
								]"
								v-model="formData.answer_uz"
							></textarea>
							<span v-if="v$.formData.answer_uz.$errors.length" class="form__error">Введите ответ</span>
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
										error: v$.formData.question_en.$errors.length,
									},
								]"
								v-model="formData.question_en"
							/>
							<span v-if="v$.formData.question_en.$errors.length" class="form__error"
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
										error: v$.formData.answer_en.$errors.length,
									},
								]"
								v-model="formData.answer_en"
							></textarea>
							<span v-if="v$.formData.answer_en.$errors.length" class="form__error">Введите ответ</span>
						</div>
					</div>
				</form>

				<div class="modal__actions grid grid-cols-2 gap-4 mt-6">
					<CustomButton class="h-12" @click="submitForm" :loading="loading">{{ submitText }}</CustomButton>
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
	emits: ["update", "close"],

	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	components: { CustomButton },

	props: {
		initialFormData: {
			type: Object,
			required: true,
			default: null,
		},
	},

	data: () => ({
		formData: {
			question_ru: "",
			question_uz: "",
			question_en: "",
			answer_ru: "",
			answer_uz: "",
			answer_en: "",
		},
		loading: false,
	}),

	validations() {
		return {
			formData: {
				question_ru: { required },
				question_uz: { required },
				question_en: { required },
				answer_ru: { required },
				answer_uz: { required },
				answer_en: { required },
			},
		};
	},

	computed: {
		title() {
			return this.initialFormData && Object.keys(this.initialFormData).length
				? "Редактирование вопроса"
				: "Создание вопроса";
		},

		submitText() {
			return this.initialFormData && Object.keys(this.initialFormData).length ? "Сохранить" : "Создать";
		},
	},

	methods: {
		async submitForm() {
			const isValid = await this.v$.$validate();
			if (!isValid) return;

			this.initialFormData && Object.keys(this.initialFormData).length
				? this.updateQuestion()
				: this.createQuestion();
		},

		async createQuestion() {
			this.loading = true;
			const status = await faq.createQuestion(this.formData);
			this.loading = false;
			if (status === 201) this.$emit("update");
		},

		async updateQuestion() {
			this.loading = true;
			const status = await faq.updateQuestion(this.initialFormData.id, this.formData);
			this.loading = false;
			if (status === 200) this.$emit("update");
		},

		setFormData() {
			this.formData.question_ru = this.initialFormData?.question_ru;
			this.formData.question_uz = this.initialFormData?.question_uz;
			this.formData.question_en = this.initialFormData?.question_en;
			this.formData.answer_ru = this.initialFormData?.answer_ru;
			this.formData.answer_uz = this.initialFormData?.answer_uz;
			this.formData.answer_en = this.initialFormData?.answer_en;
		},
	},

	mounted() {
		if (this.initialFormData) this.setFormData();
	},
};
</script>

<style>
.form__error {
	margin-top: 0;
}
</style>
