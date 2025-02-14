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
						<label for="category-ru" class="form__label">Название на русском:</label>
						<input
							v-model="category.name_ru"
							type="text"
							class="form__input"
							placeholder="Горячие напитки"
							id="category-ru"
							:class="{ error: v$.category.name_ru.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="category-uz" class="form__label">Название на узбекском:</label>
						<input
							v-model="category.name_la"
							type="text"
							class="form__input"
							placeholder="Issiq ichimliklar"
							id="category-uz"
							:class="{ error: v$.category.name_la.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="category-en" class="form__label">Название на английском:</label>
						<input
							v-model="category.name_en"
							type="text"
							class="form__input"
							placeholder="Hot drinks"
							id="category-en"
							:class="{ error: v$.category.name_en.$errors.length }"
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

import categories from "@/api/categories";

export default {
	emits: ["close"],
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
				name_ru: { required },
				name_la: { required },
				name_en: { required },
			},
		};
	},

	data() {
		return {
			loading: false,
			category: {
				name_ru: "",
				name_la: "",
				name_en: "",
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
		async createCategory() {
			const params = {
				chain_id: +this.$route.params.chain_id,
				...this.category,
				description_la: " ",
				description_ru: " ",
				description_en: " ",
			};

			this.loading = true;
			const response_status = await categories.createCategory(params);
			this.loading = false;

			if (response_status === 200) location.reload();
		},

		async updateCategory() {
			const category_id = +this.initialData.id;

			const params = {
				...this.category,
				description_la: " ",
				description_ru: " ",
				description_en: " ",
			};

			this.loading = true;
			const response_status = await categories.updateCategory(category_id, params);
			this.loading = false;

			if (response_status === 200) location.reload();
		},

		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				if (this.initialData) {
					this.updateCategory();
				} else {
					this.createCategory();
				}
			}
		},
	},

	mounted() {
		if (this.initialData) {
			this.category.name_ru = this.initialData.name.ru;
			this.category.name_la = this.initialData.name.uz;
			this.category.name_en = this.initialData.name.en;
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
