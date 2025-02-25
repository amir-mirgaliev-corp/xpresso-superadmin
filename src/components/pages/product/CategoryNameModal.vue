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
						<label for="modifier-category-ru" class="form__label">Название на русском:</label>
						<input
							v-model="category.title_ru"
							type="text"
							class="form__input"
							placeholder="Объем"
							id="category-ru"
							:class="{ error: v$.category.title_ru.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="modifier-category-uz" class="form__label">Название на узбекском:</label>
						<input
							v-model="category.title_uz"
							type="text"
							class="form__input"
							placeholder="Hajmi"
							id="category-uz"
							:class="{ error: v$.category.title_uz.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="modifier-category-en" class="form__label">Название на английском:</label>
						<input
							v-model="category.title_en"
							type="text"
							class="form__input"
							placeholder="Size"
							id="category-en"
							:class="{ error: v$.category.title_en.$errors.length }"
						/>
					</div>

					<CustomButton class="mt-4 h-14">{{ submitText }}</CustomButton>
				</form>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
			category: {
				title_ru: { required },
				title_uz: { required },
				title_en: { required },
			},
		};
	},

	data() {
		return {
			loading: false,
			categoryID: "",
			category: {
				title_ru: "",
				title_uz: "",
				title_en: "",
			},
		};
	},

	computed: {
		modalTitle() {
			return this.initialData ? "Редактирование категории" : "Создание категории";
		},

		submitText() {
			return this.initialData ? "Сохранить" : "Создать";
		},
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.$emit("update", { id: this.categoryID, category: this.category });
			}
		},
	},

	mounted() {
		if (this.initialData) {
			this.categoryID = this.initialData.id;
			this.category.title_ru = this.initialData.title.title_ru;
			this.category.title_uz = this.initialData.title.title_uz;
			this.category.title_en = this.initialData.title.title_en;
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
