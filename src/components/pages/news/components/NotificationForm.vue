<template>
	<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/news?tab=push')">
		Назад
	</CustomButton>

	<div class="bg-white p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<h2 class="table-title">{{ title }}</h2>

		<form class="form" @submit.prevent="submitForm">
			<fieldset :disabled="!editEnabled">
				<div class="mt-4">
					<h3 class="text-lg mb-2">Заголовок уведомления:</h3>

					<div class="grid grid-cols-3 gap-4">
						<div class="form__field">
							<input
								v-model="formData.title.ru"
								class="form__input"
								name="notification-title-ru"
								placeholder="Введите заголовок уведомления"
								:class="{ error: v$.formData.title.ru.$error }"
							/>
						</div>

						<div class="form__field">
							<input
								v-model="formData.title.uz"
								class="form__input"
								name="notification-title-uz"
								placeholder="Bildirishnoma nomini kiriting"
								:class="{ error: v$.formData.title.uz.$error }"
							/>
						</div>

						<div class="form__field">
							<input
								v-model="formData.title.en"
								class="form__input"
								name="notification-title-en"
								placeholder="Enter notification title"
								:class="{ error: v$.formData.title.en.$error }"
							/>
						</div>
					</div>

					<h3 class="text-lg mt-6 mb-2">Текст уведомления:</h3>

					<div class="grid grid-cols-3 gap-4">
						<div class="form__field">
							<textarea
								v-model="formData.description.ru"
								class="form__input"
								name="notification-description-ru"
								placeholder="Введите текст уведомления"
								:class="{ error: v$.formData.description.ru.$error }"
							/>
						</div>

						<div class="form__field">
							<textarea
								v-model="formData.description.uz"
								class="form__input"
								name="notification-description-uz"
								placeholder="Bildirishnoma tavsifini kiriting"
								:class="{ error: v$.formData.description.uz.$error }"
							/>
						</div>

						<div class="form__field">
							<textarea
								v-model="formData.description.en"
								class="form__input"
								name="notification-description-en"
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

	components: { CustomButton, ScheduleModal },

	data() {
		return {
			scheduleModalOpen: false,
			formData: {
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
			return this.initialData ? "Редактирование PUSH уведомления" : "Создание PUSH уведомления";
		},
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.createNotification();
			}
		},

		async handleScheduleClick() {
			const result = await this.v$.$validate();
			if (result) this.scheduleModalOpen = true;
		},

		async createNotification() {
			console.log(this.formData);
		},
	},

	watch: {
		"formData.scheduled_time"(newValue) {
			if (newValue && !this.v$.$error) this.createNotification();
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
