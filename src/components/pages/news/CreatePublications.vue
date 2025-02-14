<template>
	<div class="bg-white p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<h2 class="table-title">Создание публикации</h2>

		<form class="form" @submit.prevent="submitForm">
			<h3 class="text-lg mb-2">Фотография новости:</h3>

			<ImageUploader
				width="400px"
				height="175px"
				border-radius="16px"
				:image="photoPreview"
				@update:image="photoPreview = $event"
				@send:file="formData.photo = $event"
			/>

			<span v-if="v$.formData.photo.$error" class="form__error max-w-[250px]">Загрузите фото для новости</span>

			<h3 class="text-lg mb-2">Тег новости:</h3>

			<CustomSelect />

			<div class="mt-4">
				<h3 class="text-lg mb-2">Название новости:</h3>

				<div class="grid grid-cols-3 gap-4">
					<div class="form__field">
						<input
							v-model="formData.title.ru"
							class="form__input"
							name="news-title-ru"
							placeholder="Введите название новости"
							:class="{ error: v$.formData.title.ru.$error }"
						/>
					</div>

					<div class="form__field">
						<input
							v-model="formData.title.la"
							class="form__input"
							name="news-title-uz"
							placeholder="Yangilik nomini kiriting"
							:class="{ error: v$.formData.title.la.$error }"
						/>
					</div>

					<div class="form__field">
						<input
							v-model="formData.title.en"
							class="form__input"
							name="news-title-en"
							placeholder="Enter news title"
							:class="{ error: v$.formData.title.en.$error }"
						/>
					</div>
				</div>

				<h3 class="text-lg mt-6 mb-2">Описание новости:</h3>

				<div class="grid grid-cols-3 gap-4">
					<div class="form__field">
						<textarea
							v-model="formData.description.ru"
							class="form__input"
							name="news-description-ru"
							placeholder="Введите описание новости"
							:class="{ error: v$.formData.description.ru.$error }"
						/>
					</div>

					<div class="form__field">
						<textarea
							v-model="formData.description.la"
							class="form__input"
							name="news-description-uz"
							placeholder="Yangilik tavsifini kiriting"
							:class="{ error: v$.formData.description.la.$error }"
						/>
					</div>

					<div class="form__field">
						<textarea
							v-model="formData.description.en"
							class="form__input"
							name="news-description-en"
							placeholder="Enter news description"
							:class="{ error: v$.formData.description.en.$error }"
						/>
					</div>
				</div>
			</div>

			<div class="mt-4 w-[200px]">
				<CustomButton class="h-12">Создать</CustomButton>
			</div>
		</form>
	</div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import ImageUploader from "@/components/shared/ImageUploader.vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import CustomSelect from "@/components/shared/CustomSelect.vue";

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	validations() {
		return {
			formData: {
				photo: { required },
				title: {
					la: { required },
					ru: { required },
					en: { required },
				},
				description: {
					la: { required },
					ru: { required },
					en: { required },
				},
			},
		};
	},

	components: {
		ImageUploader,
		CustomButton,
		CustomSelect,
	},

	data() {
		return {
			photoPreview: null,
			options: [],
			formData: {
				photo: null,
				title: {
					ru: "",
					la: "",
					en: "",
				},
				description: {
					ru: "",
					la: "",
					en: "",
				},
			},
		};
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.createPublication();
			}
		},

		async createPublication() {
			console.log(this.formData);
		},
	},
};
</script>

<style lang="scss" scoped>
textarea.form__input {
	height: 130px;
	resize: none;
}
</style>
