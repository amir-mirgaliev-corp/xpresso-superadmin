<template>
	<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/chains')"> Назад </CustomButton>

	<div class="product-form bg-white p-[24px] rounded-[12px] border-[1px]">
		<h2 class="table-title">Новый продукт</h2>

		<form class="form" @submit.prevent="submitForm">
			<div class="flex items-start gap-8 w-full">
				<div>
					<ImageUploader
						width="225px"
						height="300px"
						borderRadius="20px"
						:image="photoPreview"
						:disabled="!editEnabled"
						@update:image="photoPreview = $event"
						@send:file="product.photo = $event"
					/>

					<span v-if="v$.product.photo.$error" class="form__error text-center">Загрузите фото</span>
				</div>

				<fieldset class="flex gap-6 w-full" :disabled="!editEnabled">
					<div class="w-[50%] flex flex-col gap-4">
						<div class="form__field">
							<label for="product-name-ru" class="form__label">Название на русском</label>
							<input
								type="text"
								class="form__input"
								name="product-name-ru"
								id="product-name-ru"
								placeholder="Капучино"
								v-model="product.name_ru"
								:class="{ error: v$.product.name_ru.$error }"
							/>
						</div>

						<div class="form__field">
							<label for="product-description-ru" class="form__label">Описание на русском</label>
							<textarea
								v-model="product.description_ru"
								class="form__input"
								name="product-description-ru"
								id="product-description-ru"
								placeholder="Введите описание продукта"
								:class="{ error: v$.product.description_ru.$error }"
							/>
						</div>

						<div class="form__field">
							<label for="product-name-la" class="form__label">Название на узбекском</label>
							<input
								type="text"
								class="form__input"
								name="product-name-la"
								id="product-name-la"
								placeholder="Kapuchino"
								v-model="product.name_la"
								:class="{ error: v$.product.name_la.$error }"
							/>
						</div>

						<div class="form__field">
							<label for="product-description-la" class="form__label">Описание на узбекском</label>
							<textarea
								v-model="product.description_la"
								class="form__input"
								name="product-description-la"
								id="product-description-la"
								placeholder="Mahsulot tavsifini kiriting"
								:class="{ error: v$.product.description_la.$error }"
							/>
						</div>

						<div class="form__field">
							<label for="product-name-en" class="form__label">Название на английском</label>
							<input
								type="text"
								class="form__input"
								name="product-name-en"
								id="product-name-en"
								placeholder="Cappuccino"
								v-model="product.name_en"
								:class="{ error: v$.product.name_en.$error }"
							/>
						</div>

						<div class="form__field">
							<label for="product-description-en" class="form__label">Описание на английском</label>
							<textarea
								v-model="product.description_en"
								class="form__input"
								name="product-description-en"
								id="product-description-en"
								placeholder="Enter news description"
								:class="{ error: v$.product.description_en.$error }"
							/>
						</div>
					</div>

					<div class="w-[50%] flex flex-col gap-4">
						<div class="form__field">
							<label for="product-category" class="form__label">Категория продукта</label>
							<CustomSelect
								v-model="product.category"
								selectClass="h-[52px]"
								:options="categories"
								:disabled="!editEnabled"
								:showError="v$.product.category.$error"
							/>
						</div>

						<!-- <Modifiers /> -->

						<div class="form__field">
							<label for="product-price" class="form__label">Цена продукта (сум)</label>
							<input
								type="text"
								class="form__input"
								name="product-price"
								id="product-price"
								placeholder="20 000"
								v-model="formattedPrice"
								:class="{ error: v$.product.price.$error }"
								@input="handleInput"
							/>
						</div>
					</div>
				</fieldset>
			</div>

			<div v-if="initialProductData && editEnabled" class="grid grid-cols-2 gap-4 mt-4 max-w-[400px]">
				<CustomButton type="secondary" btn-type="button" class="h-12" @click="cancelEdit">
					Отменить
				</CustomButton>

				<CustomButton class="h-12" :loading="loading">Сохранить</CustomButton>
			</div>

			<div v-else-if="!initialProductData && editEnabled" class="mt-8 max-w-[240px]">
				<CustomButton class="h-12" :loading="loading">Создать продукт</CustomButton>
			</div>
		</form>
	</div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import ImageUploader from "@/components/shared/ImageUploader.vue";
import Modifiers from "./Modifiers.vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import CustomSelect from "@/components/shared/CustomSelect.vue";

import { mapGetters } from "vuex";
import formatNumberWithSpaces from "@/utils/formatNumbers";

import products from "@/api/products";
import categories from "@/api/categories";

export default {
	emits: ["cancelEdit"],

	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	props: {
		initialProductData: Object,
		editEnabled: Boolean,
	},

	computed: {
		...mapGetters(["getProfile"]),

		formattedPrice() {
			return formatNumberWithSpaces(this.product.price);
		},
	},

	data: () => ({
		loading: false,
		photoPreview: null,
		categories: [],
		product: {
			category: null,
			name_ru: "",
			name_la: "",
			name_en: "",
			description_ru: "",
			description_la: "",
			description_en: "",
			photo: null,
			price: "",
		},
	}),

	validations() {
		return {
			product: {
				name_ru: { required },
				name_la: { required },
				name_en: { required },
				description_ru: { required },
				description_la: { required },
				description_en: { required },
				photo: {
					required: requiredIf(() => {
						return !this.initialProductData;
					}),
				},
				price: { required },
				category: { required },
			},
		};
	},

	methods: {
		async createProduct() {
			const chain_id = this.$route.params.chain_id;
			const fd = new FormData();

			fd.append("chain_id", chain_id);
			fd.append("category_id", this.product.category.category_id);
			fd.append("name_la", this.product.name_la);
			fd.append("name_ru", this.product.name_ru);
			fd.append("name_en", this.product.name_en);
			fd.append("description_la", this.product.description_la);
			fd.append("description_ru", this.product.description_ru);
			fd.append("description_en", this.product.description_en);
			fd.append("photo", this.product.photo);
			fd.append("price", this.product.price);

			// static
			fd.append("ml", 300);
			fd.append("min_time", 1);
			fd.append("max_time", 2);
			fd.append("user_id", this.getProfile.admin.id);

			try {
				this.loading = true;
				const status = await products.createProduct(fd);
				if (status === 200) this.$router.push(`/chain/${chain_id}?tab=menu`);
			} catch (err) {
				console.log("Error creating product: ", err);
			} finally {
				this.loading = false;
			}
		},

		async updateProduct() {
			const chain_id = this.initialProductData.chainId;
			const product_id = this.$route.params.product_id;
			const fd = new FormData();

			console.log(chain_id);

			fd.append("chain_id", chain_id);
			fd.append("category_id", this.product.category.category_id);
			fd.append("name_la", this.product.name_la);
			fd.append("name_ru", this.product.name_ru);
			fd.append("name_en", this.product.name_en);
			fd.append("description_la", this.product.description_la);
			fd.append("description_ru", this.product.description_ru);
			fd.append("description_en", this.product.description_en);
			fd.append("price", this.product.price);

			if (this.product.photo) fd.append("photo", this.product.photo);

			// static
			fd.append("ml", 300);
			fd.append("min_time", 1);
			fd.append("max_time", 2);
			fd.append("user_id", this.getProfile.admin.id);

			try {
				this.loading = true;
				const status = await products.updateProduct(product_id, fd);
				if (status === 200) location.reload();
			} catch (err) {
				console.log("Error creating product: ", err);
			} finally {
				this.loading = false;
			}
		},

		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.initialProductData ? this.updateProduct() : this.createProduct();
			}
		},

		async getChainCategories() {
			const chain_id = this.initialProductData ? this.initialProductData.chainId : this.$route.params.chain_id;
			const response = await categories.getCategories(chain_id);

			this.categories = response.map(category => {
				return {
					category_id: category.id,
					name: category.name.ru,
					title: category.name.ru,
				};
			});
		},

		setProductData() {
			console.log(this.initialProductData);

			this.photoPreview = import.meta.env.VITE_APP_STATIC_URL + this.initialProductData.photo;

			this.product = {
				category: this.categories.find(
					category => +category.category_id === +this.initialProductData.categoryId,
				),
				name_ru: this.initialProductData.name.ru,
				name_la: this.initialProductData.name.uz,
				name_en: this.initialProductData.name.en,
				description_ru: this.initialProductData.description.ru,
				description_la: this.initialProductData.description.uz,
				description_en: this.initialProductData.description.en,
				photo: null,
				price: this.initialProductData.price,
			};
		},

		handleInput(event) {
			let value = event.target.value.replace(/\D/g, "");
			value = value.replace(/^0+(?=\d)/, "");
			this.product.price = value;
		},

		cancelEdit() {
			this.setProductData();
			this.$emit("cancelEdit");
		},
	},

	async mounted() {
		await this.getChainCategories();
		if (this.initialProductData) this.setProductData();
	},

	components: {
		ImageUploader,
		Modifiers,
		CustomButton,
		CustomSelect,
	},
};
</script>

<style lang="scss" scoped>
.product-form {
	.form {
		&__label {
			font-size: 1.125rem;
		}
		input.form__input {
			height: 3.25rem;
			font-size: 1rem;
		}
		textarea.form__input {
			height: 140px;
			font-size: 1rem;
			resize: none;
		}
	}
}
</style>
