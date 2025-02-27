<template>
	<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)"> Назад </CustomButton>

	<div
		class="product-form bg-white p-[24px] rounded-[12px] border-[1px]"
		:class="{ 'pointer-events-none': !editEnabled }"
	>
		<h2 class="table-title">{{ title }}</h2>

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
								v-model="product.name_uz"
								:class="{ error: v$.product.name_uz.$error }"
							/>
						</div>

						<div class="form__field">
							<label for="product-description-la" class="form__label">Описание на узбекском</label>
							<textarea
								v-model="product.description_uz"
								class="form__input"
								name="product-description-la"
								id="product-description-la"
								placeholder="Mahsulot tavsifini kiriting"
								:class="{ error: v$.product.description_uz.$error }"
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
								v-model="selectedCategory"
								selectClass="h-[52px]"
								:options="categories"
								:disabled="!editEnabled"
								:showError="v$.product.category_id.$error"
							/>
						</div>

						<div class="form__field">
							<label for="product-type" class="form__label">Тип продукта</label>
							<CustomSelect
								v-model="selectedDrinkType"
								selectClass="h-[52px]"
								:options="drink_types"
								:disabled="!editEnabled"
								:showError="v$.product.drink_type.$error"
							/>
						</div>

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

						<div class="form__field">
							<label for="product-iiko-id" class="form__label">IIKO ID продукта</label>
							<input
								type="text"
								class="form__input"
								name="product-iiko-id"
								id="product-iiko-id"
								placeholder="Введите ID"
								v-model="product.iiko_product_id"
								:class="{ error: v$.product.iiko_product_id.$error }"
							/>
						</div>

						<div class="form__field">
							<div class="flex gap-4 items-center mb-4">
								<label class="form__label !mb-0">Модификаторы</label>
								<Switcher
									v-if="!product.product_modificators.length"
									v-model="noModifiers"
									label="Без модификаторов"
								/>
							</div>

							<ProductModifiers
								v-if="!noModifiers"
								v-model="product.product_modificators"
								:editEnabled="editEnabled"
							/>
						</div>

						<div class="form__field">
							<div class="flex gap-4 items-center mb-4">
								<label class="form__label !mb-0">Добавки</label>
								<Switcher
									v-if="!product.product_additives.length"
									v-model="noAdditives"
									label="Без добавок"
								/>
							</div>

							<ProductAdditives
								v-if="!noAdditives"
								v-model="product.product_additives"
								:chain_id="product?.chain_id"
								:editEnabled="editEnabled"
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
import ImageUploader from "@/components/shared/ui/ImageUploader.vue";
import ProductModifiers from "./ProductModifiers.vue";
import ProductAdditives from "./ProductAdditives.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import CustomSelect from "@/components/shared/ui/CustomSelect.vue";
import Switcher from "@/components/shared/ui/Switcher.vue";

import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import { toRaw } from "vue";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

import products from "@/api/products";
import categories from "@/api/categories";

export default {
	emits: ["cancel-edit", "update"],

	setup() {
		return {
			v$: useVuelidate(),
			toast: useToast(),
		};
	},

	props: {
		initialProductData: Object,
		editEnabled: Boolean,
	},

	computed: {
		title() {
			return this.initialProductData ? "Редактирование продукта" : "Новый продукт";
		},

		formattedPrice() {
			return formatNumberWithSpaces(this.product.price);
		},

		selectedCategory: {
			get() {
				return this.categories.find(cat => cat.category_id === this.product.category_id) || null;
			},
			set(value) {
				const id = this.categories.find(cat => cat.name === value).category_id;
				this.product.category_id = value ? id : null;
			},
		},

		selectedDrinkType: {
			get() {
				return this.drink_types.find(type => type.name === this.product.drink_type) || null;
			},
			set(value) {
				this.product.drink_type = value || null;
			},
		},
	},

	data: () => ({
		drink_types,
		loading: false,
		photoPreview: null,
		categories: [],
		noModifiers: false,
		noAdditives: false,
		product: {
			photo: null,
			name_ru: "",
			name_uz: "",
			name_en: "",
			description_ru: "",
			description_uz: "",
			description_en: "",
			price: "",
			ikpu_code: "",
			category_id: "",
			drink_type: "",
			iiko_product_id: "",
			product_modificators: [],
			product_additives: [],
		},
	}),

	validations() {
		return {
			product: {
				photo: {
					required: requiredIf(() => {
						return !this.initialProductData;
					}),
				},
				name_ru: { required },
				name_uz: { required },
				name_en: { required },
				description_ru: { required },
				description_uz: { required },
				description_en: { required },
				price: { required },
				category_id: { required },
				drink_type: { required },
				iiko_product_id: { required },
			},
		};
	},

	methods: {
		async createProduct() {
			const chain_id = this.$route.params.chain_id;
			const fd = new FormData();

			const { photo, ...dataWithoutPhoto } = this.product;
			dataWithoutPhoto.chain_id = chain_id;
			fd.append("data", JSON.stringify(dataWithoutPhoto));
			fd.append("img", photo);

			this.loading = true;
			const response_status = await products.createProduct(fd);
			this.loading = false;

			if (response_status === 201) {
				setTimeout(() => {
					this.$router.push(`/chain/${chain_id}?tab=menu`);
				}, 1000);
			}
		},

		async updateProduct() {
			const product_id = this.$route.params.product_id;
			const fd = new FormData();
			const updatedFields = {};

			Object.keys(this.product).forEach(key => {
				if (key !== "photo") {
					const currentValue = this.product[key];
					const initialValue = this.initialProductData[key];

					const isObject = typeof currentValue === "object" && currentValue !== null;

					if (!isObject && currentValue !== initialValue) {
						updatedFields[key] = currentValue;
					} else if (isObject && JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
						updatedFields[key] = currentValue;
					}
				}
			});

			if (Object.keys(updatedFields).length > 0) {
				if (updatedFields?.product_modificators) {
					updatedFields.product_modificators.forEach(category => {
						category.data.forEach(modificator => delete modificator.id);
					});
				}

				fd.append("data", JSON.stringify(updatedFields));
			}

			if (this.product.photo) {
				fd.append("img", this.product.photo);
			}

			if (!fd.has("data") && !fd.has("img")) {
				this.toast.info("Нет изменений для обновления");
				return;
			}

			this.loading = true;
			const status = await products.updateProduct(product_id, fd);
			this.loading = false;

			if (status === 200) {
				this.$emit("update");
				this.$emit("cancel-edit");
			}
		},

		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.initialProductData ? this.updateProduct() : this.createProduct();
			}
		},

		async getChainCategories() {
			const chain_id = this.initialProductData ? this.initialProductData.chain_id : this.$route.params.chain_id;
			const response = await categories.getCategories(chain_id, { page: 1, limit: 99 });

			if (response === 404) {
				this.$router.push(`/chain/${chain_id}?tab=categories`);
				this.toast.info("Сначала создайте категории");
			}

			if (response.items && response.items.length) {
				this.categories = response.items.map(category => {
					return {
						category_id: category.id,
						name: category.name_ru,
						title: category.name_ru,
					};
				});
			}
		},

		setProductData() {
			this.photoPreview = this.initialProductData.img;

			this.product = {
				photo: null,
				chain_id: this.initialProductData.chain_id,
				category_id: this.initialProductData.category_id,
				drink_type: this.initialProductData.drink_type,
				name_ru: this.initialProductData.name_ru,
				name_uz: this.initialProductData.name_uz,
				name_en: this.initialProductData.name_en,
				description_ru: this.initialProductData.description_ru,
				description_uz: this.initialProductData.description_uz,
				description_en: this.initialProductData.description_en,
				ikpu_code: this.initialProductData.ikpu_code,
				iiko_product_id: this.initialProductData.iiko_product_id,
				product_modificators: structuredClone(toRaw(this.initialProductData.product_modificators)),
				product_additives: structuredClone(toRaw(this.initialProductData.product_additives)),
				price: this.initialProductData.price,
			};
		},

		handleInput(event) {
			let value = event.target.value.replace(/\D/g, "");
			value = value.replace(/^0+(?=\d)/, "");
			this.product.price = +value;
		},

		cancelEdit() {
			this.setProductData();
			this.$emit("cancel-edit");
		},
	},

	async mounted() {
		await this.getChainCategories();
		if (this.initialProductData) this.setProductData();
	},

	watch: {
		initialProductData: {
			deep: true,
			handler(newValue) {
				if (newValue) this.setProductData();
			},
		},

		noModifiers(newVal) {
			if (newVal === false) this.product.product_modificators = [];
		},

		noAdditives(newVal) {
			if (newVal === false) this.product.product_additives = [];
		},
	},

	components: {
		ImageUploader,
		ProductModifiers,
		ProductAdditives,
		CustomButton,
		CustomSelect,
		Switcher,
	},
};

const drink_types = [
	{ name: "espresso", title: "Эспрессо" },
	{ name: "cappuccino", title: "Капучино" },
	{ name: "latte", title: "Латте" },
	{ name: "americano", title: "Американо" },
	{ name: "mocha", title: "Моккачино" },
	{ name: "macchiato", title: "Макиато" },
	{ name: "flat_white", title: "Флэт уайт" },
	{ name: "ristretto", title: "Ристретто" },
	{ name: "cold_brew", title: "Колд брю" },
	{ name: "raf", title: "Раф" },
	{ name: "bubble_tea", title: "Баббл-ти" },
];
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
