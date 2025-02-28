<template>
	<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/news?tab=push')">
		Назад
	</CustomButton>

	<div class="bg-white p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<h2 class="table-title">{{ title }}</h2>

		<h4 v-if="scheduledTime" class="flex items-center gap-2 font-bold my-4">
			<i class="fi fi-rr-calendar-clock"></i>
			Дата: {{ scheduledTime }}
		</h4>

		<form class="form" @submit.prevent="submitForm">
			<fieldset :disabled="!editEnabled">
				<div class="mt-4">
					<h3 class="text-lg mb-2">Заголовок уведомления:</h3>

					<div class="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
						<div class="form__field">
							<input
								v-model="formData.title_ru"
								class="form__input"
								name="notification-title-ru"
								placeholder="Введите заголовок уведомления"
								:class="{ error: v$.formData.title_ru.$error }"
							/>
						</div>

						<div class="form__field">
							<input
								v-model="formData.title_uz"
								class="form__input"
								name="notification-title-uz"
								placeholder="Bildirishnoma nomini kiriting"
								:class="{ error: v$.formData.title_uz.$error }"
							/>
						</div>

						<div class="form__field">
							<input
								v-model="formData.title_en"
								class="form__input"
								name="notification-title-en"
								placeholder="Enter notification title"
								:class="{ error: v$.formData.title_en.$error }"
							/>
						</div>
					</div>

					<h3 class="text-lg mt-6 mb-2">Текст уведомления:</h3>

					<div class="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
						<div class="form__field">
							<textarea
								v-model="formData.description_ru"
								class="form__input"
								name="notification-description-ru"
								placeholder="Введите текст уведомления"
								:class="{ error: v$.formData.description_ru.$error }"
							/>
						</div>

						<div class="form__field">
							<textarea
								v-model="formData.description_uz"
								class="form__input"
								name="notification-description-uz"
								placeholder="Bildirishnoma tavsifini kiriting"
								:class="{ error: v$.formData.description_uz.$error }"
							/>
						</div>

						<div class="form__field">
							<textarea
								v-model="formData.description_en"
								class="form__input"
								name="notification-description-en"
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

	<ScheduleModal v-if="scheduleModalOpen" @select="scheduleNotification" @close="scheduleModalOpen = false" />
</template>

<script>
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";

import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ScheduleModal from "./ScheduleModal.vue";

import { formatDate } from "@/utils/formatters/formatDate";

import push from "@/api/push";

export default {
	setup() {
		return {
			v$: useVuelidate(),
			toast: useToast(),
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
			return this.initialData ? "Редактирование PUSH уведомления" : "Создание PUSH уведомления";
		},

		scheduledTime() {
			if (this.initialData) {
				if (this.initialData.scheduled_time) {
					return formatDate(this.initialData.scheduled_time, true);
				} else {
					return formatDate(this.initialData.created_at, true);
				}
			}
		},
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.initialData ? this.updateNotification() : this.createNotification();
			}
		},

		async handleScheduleClick() {
			const result = await this.v$.$validate();
			if (result) this.scheduleModalOpen = true;
		},

		async createNotification() {
			const request_body = { ...this.formData };
			if (!request_body.scheduled_time) delete request_body.scheduled_time;

			this.loading = true;
			const status = await push.createNotification(request_body);
			this.loading = false;

			if (status === 201) {
				setTimeout(() => {
					this.$router.push("/news?tab=push");
				}, 1000);
			}
		},

		async updateNotification() {
			const updatedFields = Object.fromEntries(
				Object.entries(this.formData).filter(([key, value]) => value !== this.initialData[key]),
			);

			if (!Object.keys(updatedFields).length) {
				this.toast.info("Нет изменений для обновления");
				return;
			}

			this.loading = true;
			const status = await push.updateNotification(this.$route.params.notification_id, updatedFields);
			this.loading = false;

			if (status === 200) this.$emit("update");
		},

		scheduleNotification(time) {
			this.formData.scheduled_time = time;

			if (this.formData.scheduled_time && !this.v$.$error) {
				this.scheduleModalOpen = false;
				this.createNotification();
			}
		},

		cancelEdit() {
			this.setNotificationData();
			this.$emit("cancel-edit");
		},

		setNotificationData() {
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
		if (this.initialData) this.setNotificationData();
	},
};
</script>

<style lang="scss" scoped>
textarea.form__input {
	height: 130px;
	resize: none;
}
</style>
