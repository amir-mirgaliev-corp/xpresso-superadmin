<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<h2 class="text-center mb-8 text-2xl">{{ modalTitle }}</h2>

				<form class="form" @submit.prevent="submitForm">
					<div class="form__field">
						<label for="additive-ru" class="form__label">Название на русском:</label>
						<input
							v-model="additive.name_ru"
							type="text"
							class="form__input"
							placeholder="Сироп"
							id="additive-ru"
							:class="{ error: v$.additive.name_ru.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="additive-uz" class="form__label">Название на узбекском:</label>
						<input
							v-model="additive.name_uz"
							type="text"
							class="form__input"
							placeholder="Sirop"
							id="additive-uz"
							:class="{ error: v$.additive.name_uz.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="additive-en" class="form__label">Название на английском:</label>
						<input
							v-model="additive.name_en"
							type="text"
							class="form__input"
							placeholder="Syrup"
							id="additive-en"
							:class="{ error: v$.additive.name_en.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="additive-price" class="form__label">Цена добавки:</label>
						<input
							v-model="formattedPrice"
							type="text"
							class="form__input"
							placeholder="Введите цену"
							id="additive-price"
							@input="handleInput"
						/>
					</div>

					<CustomButton v-if="!initialData" class="mt-4 h-14" :loading="loading">Создать</CustomButton>

					<div v-else class="grid grid-cols-2 gap-2 mt-2">
						<CustomButton class="h-14" type="secondary" btn-type="button" @click="cancelEdit">
							Отменить
						</CustomButton>

						<CustomButton class="h-14" :loading="loading">Сохранить</CustomButton>
					</div>
				</form>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import additives from "@/api/additives";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

export default {
	emits: ["close", "update"],
	props: {
		initialData: {
			type: Object || null,
			default: null,
		},
	},

	setup() {
		return {
			v$: useVuelidate(),
			toast: useToast(),
		};
	},

	validations() {
		return {
			additive: {
				name_ru: { required },
				name_uz: { required },
				name_en: { required },
			},
		};
	},

	data() {
		return {
			loading: false,
			additive: {
				name_ru: "",
				name_uz: "",
				name_en: "",
				price: "",
			},
		};
	},

	computed: {
		modalTitle() {
			return this.initialData ? "Редактирование добавки" : "Создание добавки";
		},

		formattedPrice() {
			return formatNumberWithSpaces(this.additive.price);
		},
	},

	methods: {
		async createAdditive() {
			const chain_id = this.$route.params.chain_id;

			this.loading = true;
			const response_status = await additives.createAdditive({ chain_id, ...this.additive });
			this.loading = false;

			if (response_status === 201) {
				this.$emit("update");
				this.$emit("close");
			}
		},

		async updateAdditive() {
			const additive_id = this.initialData.id;
			const updatedFields = {};

			Object.keys(this.additive).forEach(key => {
				if (this.additive[key] !== this.initialData[key]) {
					updatedFields[key] = this.additive[key];
				}
			});

			if (Object.keys(updatedFields).length > 0) {
				this.loading = true;
				const response_status = await additives.updateAdditive(additive_id, updatedFields);
				this.loading = false;

				if (response_status === 200) {
					this.$emit("update");
					this.$emit("close");
				}
			} else {
				this.toast.info("Нет изменений для обновления");
				return;
			}
		},

		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.initialData ? this.updateAdditive() : this.createAdditive();
			}
		},

		handleInput(event) {
			let value = event.target.value.replace(/\D/g, "");

			if (value === "") {
				this.additive.price = "";
				return;
			}

			value = value.replace(/^0+(?=\d)/, "");
			this.additive.price = +value;
		},

		setAdditiveData() {
			this.additive.name_ru = this.initialData.name_ru;
			this.additive.name_uz = this.initialData.name_uz;
			this.additive.name_en = this.initialData.name_en;
			this.additive.price = this.initialData.price;
		},

		cancelEdit() {
			this.setAdditiveData();
			this.$emit("close");
		},
	},

	mounted() {
		if (this.initialData) {
			this.setAdditiveData();
		}
	},

	components: {
		CustomButton,
	},
};
</script>

<style lang="scss" scoped>
.form__field {
	&:not(:last-child) {
		margin-bottom: 0.75rem;
	}
}
</style>
