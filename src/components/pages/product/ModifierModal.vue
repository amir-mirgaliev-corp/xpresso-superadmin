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
						<label for="modifier-name-ru" class="form__label">Название на русском</label>
						<input
							type="text"
							class="form__input"
							name="modifier-name-ru"
							placeholder="Большой"
							v-model="modifier.name.ru"
							:class="{ error: v$.modifier.name.ru.$error }"
						/>
					</div>

					<div class="form__field">
						<label for="modifier-name-en" class="form__label">Название на английском</label>
						<input
							type="text"
							class="form__input"
							name="modifier-name-en"
							placeholder="Katta"
							v-model="modifier.name.en"
							:class="{ error: v$.modifier.name.en.$error }"
						/>
					</div>

					<div class="form__field">
						<label for="modifier-name-uz" class="form__label">Название на узбекском</label>
						<input
							type="text"
							class="form__input"
							name="modifier-name-uz"
							placeholder="Big"
							v-model="modifier.name.uz"
							:class="{ error: v$.modifier.name.uz.$error }"
						/>
					</div>

					<div class="form__field">
						<label for="modifier-name-uz" class="form__label">Цена (сум)</label>
						<input
							type="text"
							class="form__input"
							name="modifier-price"
							placeholder="20 000"
							v-model="formattedPrice"
							:class="{ error: v$.modifier.price.$error }"
							@input="handleInput"
						/>
					</div>

					<CustomButton class="mt-4 h-14" :loading="loading">{{ submitText }}</CustomButton>
				</form>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/CustomButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import formatNumberWithSpaces from "@/utils/formatNumbers";

import categories from "@/api/categories";

export default {
	emits: ["close"],
	props: {
		category: {
			type: String,
			required: true,
		},
		initialData: {
			type: Object || null,
			default: null,
		},
	},

	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	validations() {
		return {
			modifier: {
				price: { required },
				name: {
					ru: { required },
					uz: { required },
					en: { required },
				},
			},
		};
	},

	data() {
		return {
			loading: false,
			modifier: {
				price: "",
				name: {
					ru: "",
					uz: "",
					en: "",
				},
			},
		};
	},

	computed: {
		modalTitle() {
			return this.initialData ? "Редактирование модификатора" : "Создание модификатора";
		},

		submitText() {
			return this.initialData ? "Сохранить" : "Создать";
		},

		formattedPrice() {
			return formatNumberWithSpaces(this.modifier.price);
		},
	},

	methods: {
		async createModifier() {
			const category_id = this.category === "size" ? "1" : "2";

			const params = {
				category_id,
				price: this.modifier.price,
				name_la: this.modifier.name.uz,
				name_ru: this.modifier.name.ru,
				name_en: this.modifier.name.en,
				is_global: false,
			};

			this.loading = true;
			const response_status = await categories.createModificator(params);
			this.loading = false;

			if (response_status === 200) {
			}
		},

		async updateModifier() {
			const category_id = +this.initialData.id;

			const params = {
				...this.category,
				description_la: " ",
				description_ru: " ",
				description_en: " ",
			};

			this.loading = true;
			const response_status = await categories.updateModifier(category_id, params);
			this.loading = false;

			if (response_status === 200) location.reload();
		},

		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				if (this.initialData) {
					this.updateModifier();
				} else {
					this.createModifier();
				}
			}
		},

		handleInput(event) {
			let value = event.target.value.replace(/\D/g, "");
			value = value.replace(/^0+(?=\d)/, "");
			this.product.price = value;
		},
	},

	mounted() {
		if (this.initialData) {
			this.modifier.name.ru = this.initialData.name.ru;
			this.modifier.name.uz = this.initialData.name.uz;
			this.modifier.name.en = this.initialData.name.en;
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
