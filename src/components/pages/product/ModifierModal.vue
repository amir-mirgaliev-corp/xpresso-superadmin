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
							v-model="modifier.name.name_ru"
							:class="{ error: v$.modifier.name.name_ru.$error }"
						/>
					</div>

					<div class="form__field">
						<label for="modifier-name-en" class="form__label">Название на английском</label>
						<input
							type="text"
							class="form__input"
							name="modifier-name-en"
							placeholder="Katta"
							v-model="modifier.name.name_en"
							:class="{ error: v$.modifier.name.name_en.$error }"
						/>
					</div>

					<div class="form__field">
						<label for="modifier-name-uz" class="form__label">Название на узбекском</label>
						<input
							type="text"
							class="form__input"
							name="modifier-name-uz"
							placeholder="Big"
							v-model="modifier.name.name_uz"
							:class="{ error: v$.modifier.name.name_uz.$error }"
						/>
					</div>

					<div class="form__field">
						<label for="modifier-price" class="form__label">Цена (сум)</label>
						<input
							type="text"
							class="form__input"
							name="modifier-price"
							placeholder="20 000"
							v-model="formattedPrice"
							@input="handleInput"
							:class="{ error: v$.modifier.price.$error }"
						/>
					</div>

					<!-- <div v-if="modifier.price" class="form__field">
						<label for="additive-en" class="form__label">ИКПУ код:</label>
						<input v-model="modifier.ofd" type="text" class="form__input" placeholder="Введите код ИКПУ" />
					</div> -->

					<CustomButton class="mt-4 h-14" :loading="loading">{{ submitText }}</CustomButton>
				</form>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

import categories from "@/api/categories";

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
		};
	},

	validations() {
		return {
			modifier: {
				price: { required },
				name: {
					name_ru: { required },
					name_uz: { required },
					name_en: { required },
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
					name_ru: "",
					name_uz: "",
					name_en: "",
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
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.$emit("update", {
					modifier: this.modifier,
					modifier_index: this.initialData ? this.initialData.modifier_index : null,
				});
			}
		},

		handleInput(event) {
			let value = event.target.value.replace(/\D/g, "");

			if (value === "") {
				this.modifier.price = "";
				return;
			}

			value = value.replace(/^0+(?=\d)/, "");
			this.modifier.price = +value;
		},
	},

	mounted() {
		if (this.initialData) {
			this.modifier.name.name_ru = this.initialData.name?.name_ru;
			this.modifier.name.name_uz = this.initialData.name?.name_uz;
			this.modifier.name.name_en = this.initialData.name?.name_en;
			this.modifier.price = this.initialData?.price;
		}
	},

	components: { CustomButton },
};
</script>

<style lang="scss" scoped>
.form__field {
	&:not(:last-child) {
		margin-bottom: 0.75rem;
	}
}
</style>
