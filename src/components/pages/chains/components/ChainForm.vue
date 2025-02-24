<template>
	<form class="form create-chain" @submit.prevent="submitForm">
		<fieldset :disabled="!editEnabled">
			<div class="bg-white p-[24px_32px] rounded-[12px] border-[1px]">
				<div class="flex items-center gap-8">
					<div>
						<ImageUploader
							:image="logoPreview"
							:disabled="!editEnabled"
							@update:image="logoPreview = $event"
							@send:file="formData.logo = $event"
						/>

						<span v-if="v$.formData.logo.$errors.length" class="form__error max-w-[150px] text-center">
							Загрузите логотип
						</span>
					</div>

					<div class="form__field">
						<input
							type="text"
							name="new-chain"
							v-model="formData.name"
							placeholder="Введите название сети"
							class="form__input chain-name"
							:class="{ error: v$.formData.name.$errors.length }"
						/>

						<span v-if="v$.formData.name.$errors.length" class="form__error">Введите имя</span>
					</div>
				</div>

				<div class="grid grid-cols-3 gap-4 my-6">
					<div class="form__field">
						<label for="chain-info" class="form__label">Дополнительная информация:</label>
						<input
							type="text"
							name="chain-info"
							id="chain-info"
							v-model="formData.additional_info"
							placeholder="OOO 'Coffee'"
							class="form__input"
							:class="{ error: v$.formData.additional_info.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="chain-iiko" class="form__label">API Login IIKO:</label>
						<input
							type="text"
							name="chain-iiko"
							id="chain-iiko"
							v-model="formData.api_login_iiko"
							placeholder="Введите IIKO логин"
							class="form__input"
							:class="{ error: v$.formData.api_login_iiko.$errors.length }"
						/>
					</div>
				</div>

				<div class="grid grid-cols-3 gap-4">
					<div class="form__field">
						<label for="chain-description-ru" class="form__label">Описание сети</label>
						<textarea
							type="text"
							name="chain-description-ru"
							id="chain-description-ru"
							v-model="formData.description_ru"
							placeholder="Введите описание сети"
							class="form__input"
							:class="{ error: v$.formData.description_ru.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="chain-description-en" class="form__label">Chain description</label>
						<textarea
							type="text"
							name="chain-description-en"
							id="chain-description-en"
							v-model="formData.description_en"
							placeholder="Enter chain description"
							class="form__input"
							:class="{ error: v$.formData.description_en.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="chain-description-uz" class="form__label">Kofe do'konining tavsifi</label>
						<textarea
							type="text"
							name="chain-description-uz"
							id="chain-description-uz"
							v-model="formData.description_uz"
							placeholder="Qahvaxona tavsifini kiriting"
							class="form__input"
							:class="{ error: v$.formData.description_uz.$errors.length }"
						/>
					</div>
				</div>

				<div v-if="!initialData && editEnabled" class="max-w-72 mt-6">
					<CustomButton class="h-14 text-lg">Содать сеть заведение</CustomButton>
				</div>

				<div
					v-if="initialData && editEnabled"
					class="user-profile__controls grid grid-cols-2 gap-4 mt-4 max-w-[400px]"
				>
					<CustomButton type="secondary" btn-type="button" class="h-12" @click="cancelEdit">
						Отменить
					</CustomButton>

					<CustomButton class="h-12" :loading="loading">Сохранить</CustomButton>
				</div>
			</div>
		</fieldset>
	</form>
</template>

<script>
import { toRaw } from "vue";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ImageUploader from "@/components/shared/ui/ImageUploader.vue";
import chains from "@/api/chains";

export default {
	emits: ["cancel-edit", "update"],

	setup() {
		return {
			v$: useVuelidate(),
			toast: useToast(),
		};
	},

	props: {
		editEnabled: Boolean,
		initialData: {
			type: Object || null,
			required: false,
			default: null,
		},
	},

	data: () => ({
		loading: false,
		logoPreview: null,
		formData: {
			logo: null,
			name: "",
			additional_info: "",
			description_ru: "",
			description_uz: "",
			description_en: "",
			api_login_iiko: "",
		},
	}),

	validations() {
		return {
			formData: {
				logo: { required: requiredIf(() => !this.initialData) },
				name: { required },
				additional_info: { required },
				description_ru: { required },
				description_en: { required },
				description_uz: { required },
				api_login_iiko: { required },
			},
		};
	},

	computed: {
		submitText() {
			return this.initialData ? "Сохранить" : "Создать сеть";
		},
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.initialData ? this.updateChain() : this.createChain();
			}
		},

		async createChain() {
			const fd = new FormData();

			const { logo, ...dataWithoutLogo } = this.formData;
			fd.append("data", JSON.stringify(dataWithoutLogo));
			fd.append("logo", logo);

			this.loading = true;
			const status = await chains.createChain(fd);
			this.loading = false;

			if (status === 201) {
				this.$router.push("/chains");
			}
		},

		async updateChain() {
			const fd = new FormData();
			const chainId = this.$route.params.chain_id;
			const updatedFields = {};

			Object.keys(this.formData).forEach(key => {
				if (key !== "logo" && this.formData[key] !== this.initialData[key]) {
					updatedFields[key] = this.formData[key];
				}
			});

			if (Object.keys(updatedFields).length > 0) {
				fd.append("data", JSON.stringify(updatedFields));
			}

			if (this.formData.logo) {
				fd.append("logo", this.formData.logo);
			}

			if (!fd.has("data") && !fd.has("logo")) {
				this.toast.info("Нет изменений для обновления");
				return;
			}

			this.loading = true;
			const status = await chains.updateChain(chainId, fd);
			this.loading = false;

			if (status === 200) {
				this.$emit("update");
				this.$emit("cancel-edit");
			}
		},

		cancelEdit() {
			this.logoPreview = this.initialData.logo;
			this.formData = structuredClone(toRaw(this.initialData));
			this.formData.logo = null;
			this.$emit("cancel-edit");
		},
	},

	mounted() {
		if (this.initialData) {
			this.logoPreview = this.initialData.logo;
			this.formData = structuredClone(toRaw(this.initialData));
			this.formData.logo = null;
		}
	},

	components: { CustomButton, ImageUploader },
};
</script>

<style lang="scss" scoped>
.create-chain {
	.chain-name {
		padding: 1.25rem;
		font-size: 1.5rem;
		height: 4.5rem;
		max-width: 600px;
		border-width: 2px;
	}
	textarea.form__input {
		height: 140px;
		font-size: 1rem;
		resize: none;
	}
}
</style>
