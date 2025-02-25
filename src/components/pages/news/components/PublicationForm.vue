<template>
	<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/news?tab=publications')">
		Назад
	</CustomButton>

	<div class="bg-white p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<h2 class="table-title">{{ title }}</h2>

		<form class="form" @submit.prevent="submitForm">
			<h3 class="text-lg mb-2">Фотография новости:</h3>

			<div class="w-[400px] max-sm:w-full">
				<ImageUploader
					width="100%"
					height="175px"
					border-radius="16px"
					:image="photoPreview"
					:disabled="!editEnabled"
					@update:image="photoPreview = $event"
					@send:file="formData.image = $event"
				/>
			</div>

			<span v-if="v$.formData.image.$error" class="form__error max-w-[250px]">Загрузите фото для новости</span>

			<fieldset :disabled="!editEnabled">
				<div class="mt-4">
					<h3 class="text-lg mb-2">Заголовок новости:</h3>

					<div class="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
						<div class="form__field">
							<input
								v-model="formData.title.ru"
								class="form__input"
								name="news-title-ru"
								placeholder="Введите заголовок новости"
								:class="{ error: v$.formData.title.ru.$error }"
							/>
						</div>

						<div class="form__field">
							<input
								v-model="formData.title.uz"
								class="form__input"
								name="news-title-uz"
								placeholder="Yangilik nomini kiriting"
								:class="{ error: v$.formData.title.uz.$error }"
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

					<h3 class="text-lg mt-6 mb-2">Текст новости:</h3>

					<div class="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
						<div class="form__field">
							<textarea
								v-model="formData.description.ru"
								class="form__input"
								name="news-description-ru"
								placeholder="Введите текст новости"
								:class="{ error: v$.formData.description.ru.$error }"
							/>
						</div>

						<div class="form__field">
							<textarea
								v-model="formData.description.uz"
								class="form__input"
								name="news-description-uz"
								placeholder="Yangilik tavsifini kiriting"
								:class="{ error: v$.formData.description.uz.$error }"
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
			</fieldset>

			<div v-if="!initialData && editEnabled" class="flex gap-4">
				<div class="mt-4 w-[200px]">
					<CustomButton class="h-12">Создать</CustomButton>
				</div>

				<div class="mt-4 w-[200px]">
					<CustomButton type="secondary-red" btn-type="button" class="h-12" @click="handleScheduleClick">
						Отложить
					</CustomButton>
				</div>
			</div>

			<div
				v-if="initialData && editEnabled"
				class="user-profile__controls grid grid-cols-2 gap-4 mt-4 max-w-[400px]"
			>
				<CustomButton type="secondary" btn-type="button" class="h-12" @click="cancelEdit">
					Отменить
				</CustomButton>

				<CustomButton class="h-12">Сохранить</CustomButton>
			</div>
		</form>
	</div>

	<ScheduleModal v-if="scheduleModalOpen" v-model="formData.scheduled_time" @close="scheduleModalOpen = false" />
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import ImageUploader from "@/components/shared/ui/ImageUploader.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ScheduleModal from "./ScheduleModal.vue";

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	props: {
		editEnabled: Boolean,
		initialData: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			photoPreview: null,
			scheduleModalOpen: false,
			formData: {
				image: null,
				scheduled_time: "",
				title: {
					ru: "",
					uz: "",
					en: "",
				},
				description: {
					ru: "",
					uz: "",
					en: "",
				},
			},
		};
	},

	validations() {
		return {
			formData: {
				image: { required },
				title: {
					uz: { required },
					ru: { required },
					en: { required },
				},
				description: {
					uz: { required },
					ru: { required },
					en: { required },
				},
			},
		};
	},

	computed: {
		title() {
			return this.initialData ? "Редактирование публикации" : "Создание публикации";
		},
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.createPublication();
			}
		},

		async handleScheduleClick() {
			const result = await this.v$.$validate();
			if (result) this.scheduleModalOpen = true;
		},

		async createPublication() {
			console.log(this.formData);
		},
	},

	watch: {
		"formData.scheduled_time"(newValue) {
			if (newValue && !this.v$.$error) this.createPublication();
		},
	},

	components: { ImageUploader, CustomButton, ScheduleModal },
};
</script>

<style lang="scss" scoped>
textarea.form__input {
	height: 130px;
	resize: none;
}
</style>
