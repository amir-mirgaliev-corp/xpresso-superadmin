<template>
	<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/news?tab=publications')">
		Назад
	</CustomButton>

	<div class="bg-white p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<h2 class="table-title">{{ title }}</h2>

		<h4 v-if="scheduledTime" class="flex items-center gap-2 font-bold my-4">
			<i class="fi fi-rr-calendar-clock"></i>
			Дата публикации: {{ scheduledTime }}
		</h4>

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
								v-model="formData.title_ru"
								class="form__input"
								name="news-title-ru"
								placeholder="Введите заголовок новости"
								:class="{ error: v$.formData.title_ru.$error }"
							/>
						</div>

						<div class="form__field">
							<input
								v-model="formData.title_uz"
								class="form__input"
								name="news-title-uz"
								placeholder="Yangilik nomini kiriting"
								:class="{ error: v$.formData.title_uz.$error }"
							/>
						</div>

						<div class="form__field">
							<input
								v-model="formData.title_en"
								class="form__input"
								name="news-title-en"
								placeholder="Enter news title"
								:class="{ error: v$.formData.title_en.$error }"
							/>
						</div>
					</div>

					<h3 class="text-lg mt-6 mb-2">Текст новости:</h3>

					<div class="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
						<div class="form__field">
							<textarea
								v-model="formData.description_ru"
								class="form__input"
								name="news-description-ru"
								placeholder="Введите текст новости"
								:class="{ error: v$.formData.description_ru.$error }"
							/>
						</div>

						<div class="form__field">
							<textarea
								v-model="formData.description_uz"
								class="form__input"
								name="news-description-uz"
								placeholder="Yangilik tavsifini kiriting"
								:class="{ error: v$.formData.description_uz.$error }"
							/>
						</div>

						<div class="form__field">
							<textarea
								v-model="formData.description_en"
								class="form__input"
								name="news-description-en"
								placeholder="Enter news description"
								:class="{ error: v$.formData.description_en.$error }"
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

	<ScheduleModal v-if="scheduleModalOpen" @select="schedulePublication" @close="scheduleModalOpen = false" />
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import ImageUploader from "@/components/shared/ui/ImageUploader.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ScheduleModal from "./ScheduleModal.vue";

import news from "@/api/news";
import { formatDate } from "@/utils/formatters/formatDate";

export default {
	emits: ["update", "cancel-edit"],

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
				title_ru: "",
				title_en: "",
				title_uz: "",
				description_ru: "",
				description_en: "",
				description_uz: "",
			},
		};
	},

	validations() {
		return {
			formData: {
				image: { required: requiredIf(() => !this.initialData) },
				scheduled_time: { required: requiredIf(() => this.scheduleModalOpen) },
				title_ru: { required },
				title_en: { required },
				title_uz: { required },
				description_ru: { required },
				description_en: { required },
				description_uz: { required },
			},
		};
	},

	computed: {
		title() {
			return this.initialData ? "Редактирование публикации" : "Создание публикации";
		},

		scheduledTime() {
			if (this.initialData && this.formData.scheduled_time) {
				return formatDate(this.formData.scheduled_time || this.formData?.created_at, true);
			}
		},
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.initialData ? this.updatePublication() : this.createPublication();
			}
		},

		async handleScheduleClick() {
			const result = await this.v$.$validate();
			if (result) this.scheduleModalOpen = true;
		},

		async createPublication() {
			const formData = new FormData();

			const { image, ...dataWithoutImage } = this.formData;
			if (!dataWithoutImage.scheduled_time) delete dataWithoutImage.scheduled_time;

			formData.append("data", JSON.stringify(dataWithoutImage));
			formData.append("image", image);

			this.loading = true;
			const response_status = await news.createPublication(formData);
			this.loading = false;

			if (response_status === 201) {
				setTimeout(() => {
					this.$router.push("/news");
				}, 1000);
			}
		},

		schedulePublication(time) {
			this.formData.scheduled_time = time;

			if (this.formData.scheduled_time && !this.v$.$error) {
				this.scheduleModalOpen = false;
				this.initialData ? this.updatePublication() : this.createPublication();
			}
		},

		cancelEdit() {
			this.setPublicationData();
			this.$emit("cancel-edit");
		},

		setPublicationData() {
			this.photoPreview = this.initialData.image;
			this.formData.image = null;
			this.formData.scheduled_time = this.initialData.scheduled_time;
			this.formData.title_ru = this.initialData.title_ru;
			this.formData.title_en = this.initialData.title_en;
			this.formData.title_uz = this.initialData.title_uz;
			this.formData.description_ru = this.initialData.description_ru;
			this.formData.description_en = this.initialData.description_uz;
			this.formData.description_uz = this.initialData.description_uz;
		},
	},

	mounted() {
		if (this.initialData) this.setPublicationData();
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
