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
							v-model="category.name_uz"
							type="text"
							class="form__input"
							placeholder="Issiq ichimliklar"
							id="category-uz"
							:class="{ error: v$.category.name_uz.$errors.length }"
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
			toast: useToast(),
		};
	},

	validations() {
		return {
			category: {
				name_ru: { required },
				name_uz: { required },
				name_en: { required },
			},
		};
	},

	data() {
		return {
			loading: false,
			category: {
				name_ru: "",
				name_uz: "",
				name_en: "",
			},
		};
	},

	computed: {
		modalTitle() {
			return this.initialData ? "Редактирование категории" : "Создание категории";
		},
	},

	methods: {
		async createCategory() {
			const chain_id = this.$route.params.chain_id;

			this.loading = true;
			const response_status = await categories.createCategory({ chain_id, ...this.category });
			this.loading = false;

			if (response_status === 201) {
				this.$emit("update");
				this.$emit("close");
			}
		},

		async updateCategory() {
			const category_id = this.initialData.id;
			const updatedFields = {};

			Object.keys(this.category).forEach(key => {
				if (this.category[key] !== this.initialData[key]) {
					updatedFields[key] = this.category[key];
				}
			});

			if (Object.keys(updatedFields).length > 0) {
				this.loading = true;
				const response_status = await categories.updateCategory(category_id, updatedFields);
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
				this.initialData ? this.updateCategory() : this.createCategory();
			}
		},

		setCategoryData() {
			this.category.name_ru = this.initialData.name_ru;
			this.category.name_uz = this.initialData.name_uz;
			this.category.name_en = this.initialData.name_en;
		},

		cancelEdit() {
			this.setCategoryData;
			this.$emit("close");
		},
	},

	mounted() {
		if (this.initialData) {
			this.setCategoryData();
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
