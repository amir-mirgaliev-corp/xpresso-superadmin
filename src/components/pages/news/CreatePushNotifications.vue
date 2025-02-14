<template>
	<div class="bg-white p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<h2 class="table-title">Создание PUSH уведомления</h2>

		<form class="form" @submit.prevent="submitForm">
			<div class="mt-4">
				<h3 class="text-lg mb-2">Название уведомления:</h3>

				<div class="grid grid-cols-3 gap-4">
					<div class="form__field">
						<input
							v-model="formData.title.ru"
							class="form__input"
							name="notification-title-ru"
							placeholder="Введите название уведомления"
							:class="{ error: v$.formData.title.ru.$error }"
						/>
					</div>

					<div class="form__field">
						<input
							v-model="formData.title.la"
							class="form__input"
							name="notification-title-uz"
							placeholder="Bildirishnoma nomini kiriting"
							:class="{ error: v$.formData.title.la.$error }"
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

				<h3 class="text-lg mt-6 mb-2">Описание уведомления:</h3>

				<div class="grid grid-cols-3 gap-4">
					<div class="form__field">
						<textarea
							v-model="formData.description.ru"
							class="form__input"
							name="notification-description-ru"
							placeholder="Введите описание уведомления"
							:class="{ error: v$.formData.description.ru.$error }"
						/>
					</div>

					<div class="form__field">
						<textarea
							v-model="formData.description.la"
							class="form__input"
							name="notification-description-uz"
							placeholder="Bildirishnoma tavsifini kiriting"
							:class="{ error: v$.formData.description.la.$error }"
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

			<div class="mt-4 w-[200px]">
				<CustomButton class="h-12">Создать</CustomButton>
			</div>
		</form>
	</div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	validations() {
		return {
			formData: {
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
		CustomButton,
	},

	data() {
		return {
			formData: {
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
				this.createNotification();
			}
		},

		async createNotification() {
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
