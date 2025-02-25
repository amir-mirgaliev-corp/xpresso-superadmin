<template>
	<section class="add-transport transport__content">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<div
			class="transport-container w-full flex flex-col justify-center bg-white p-[24px] rounded-[12px] border-[1px]"
		>
			<h2 class="table-title">Добавление новой цвета</h2>

			<div class="py-4 w-[700px] max-md:w-full">
				<div class="flex justify-center gap-6 max-md:flex-col max-md:items-center">
					<Vue3ColorPicker
						v-model="formData.hex_code"
						mode="solid"
						type="HEX"
						class="!w-[50%] !shadow-none !p-0 max-sm:!w-full"
						:showInputMenu="false"
						:showPickerMode="false"
						:showAlpha="false"
						:showColorList="false"
					/>

					<form @submit.prevent="submitForm" class="form w-[50%] max-sm:w-full">
						<div
							class="color-preview h-[100px] rounded-[12px] mb-4 shadow"
							:style="{ backgroundColor: formData.hex_code }"
						></div>

						<div v-for="lang in ['ru', 'uz', 'en']" :key="lang">
							<div class="flex flex-col gap-y-1">
								<label :for="`name_${lang}`" class="text-sm">
									Название цвета на {{ lang.toUpperCase() }}
								</label>
								<input
									type="text"
									:id="`name_${lang}`"
									:placeholder="`Название цвета (${lang.toUpperCase()})`"
									:class="[
										'form__input',
										{
											error: v$.formData[`name_${lang}`].$errors.length,
										},
									]"
									v-model="formData[`name_${lang}`]"
								/>
								<span v-if="v$.formData[`name_${lang}`].$errors.length" class="form__error">
									Введите название
								</span>
							</div>
						</div>

						<CustomButton class="h-14 mt-5 radius-75" :loading="loading">Сохранить</CustomButton>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import "@cyhnkckali/vue3-color-picker/dist/style.css";
import { transportColorApi } from "@/api/transport";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
	components: {
		Vue3ColorPicker,
		CustomButton,
	},
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	data: () => ({
		isEditMode: false,
		formData: {
			name_ru: "",
			name_uz: "",
			name_en: "",
			hex_code: "",
		},
		loading: false,
	}),
	validations() {
		return {
			formData: {
				name_ru: { required },
				name_uz: { required },
				name_en: { required },
				hex_code: { required },
			},
		};
	},
	methods: {
		async submitForm() {
			const isValid = await this.v$.$validate();
			if (!isValid) return;

			this.isEditMode ? this.updateColor() : this.createColor();
		},

		async createColor() {
			const { name_en, name_ru, name_uz, hex_code } = this.formData;
			// const fd = new FormData()
			// fd.append("name_uz", name_uz)
			// fd.append("name_ru", name_ru)
			// fd.append("name_en", name_en)
			// fd.append("hex_code", hex_code)

			try {
				this.loading = true;
				const response = await transportColorApi.createTransportColor({name_en, name_ru, name_uz, hex_code});
				if (response) this.$router.push("/transport?tab=colors");
			} catch (err) {
				console.log("Ошибка при добавлении цвета: ", err);
			} finally {
				this.loading = false;
			}
		},

		async updateColor() {
			const { name_en, name_ru, name_uz, hex_code } = this.formData;

			try {
				this.loading = true;
				const response = await transportColorApi.updateTransportColor(this.$route.query.color_id, {
					name_en,
					name_ru,
					name_uz,
					hex_code,
				});
				if (response) this.$router.push("/transport?tab=colors");
			} catch (err) {
				console.log("Ошибка при обновлении цвета: ", err);
			} finally {
				this.loading = false;
			}
		},
	},

	async mounted() {
		this.isEditMode = this.$route.query.color_id && this.$route.query.mode === "edit";

		if (this.isEditMode) {
			const response = await transportColorApi.getTransportColorById(this.$route.query.color_id);
			console.log(response)
			this.formData.name_en = response.name_en;
			this.formData.name_uz = response.name_uz;
			this.formData.name_ru = response.name_ru;
			this.formData.hex_code = response.hex_code;
		}
	},
};
</script>
