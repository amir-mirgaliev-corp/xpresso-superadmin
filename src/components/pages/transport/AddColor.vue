<template>
	<section class="add-transport transport__content">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<div
			class="transport-container w-full flex flex-col justify-center bg-white p-[24px] rounded-[12px] border-[1px]"
		>
			<h2 class="table-title">Добавление новой цвета</h2>

			<div class="py-4 w-[700px]">
				<div class="flex justify-center gap-6">
					<Vue3ColorPicker
						v-model="color.value"
						mode="solid"
						type="HEX"
						class="!w-[50%] !shadow-none !p-0"
						:showInputMenu="false"
						:showPickerMode="false"
						:showAlpha="false"
						:showColorList="false"
					/>

					<form @submit.prevent="submitForm" class="form w-[50%]">
						<div
							class="color-preview h-[100px] rounded-[12px] mb-4 shadow"
							:style="{ backgroundColor: color.value }"
						></div>

						<div class="form__field">
							<label for="color-name" class="form__label">Название цвета:</label>

							<input
								type="text"
								class="form__input h-14"
								name="color"
								id="color-name"
								placeholder="Красный"
								v-model="name.value"
							/>

							<span v-if="!name.isValid" class="form__error" v-text="name.message" />
							<span v-if="!color.isValid" class="form__error" v-text="color.message" />
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
import colors from "@/api/color";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import "@cyhnkckali/vue3-color-picker/dist/style.css";

export default {
	components: {
		Vue3ColorPicker,
		CustomButton,
	},

	data: () => ({
		isEditMode: false,
		name: {
			value: "",
			isValid: true,
			message: "",
		},
		color: {
			value: "",
			isValid: true,
			message: "",
		},
		loading: false,
	}),

	methods: {
		submitForm() {
			const name = this.name.value;
			const color = this.color.value;

			let isValid = true;

			if (!name) {
				this.name.isValid = false;
				this.name.message = "Название не может быть пустым";
				isValid = false;
			}

			if (!color) {
				this.color.isValid = false;
				this.color.message = "Цвет не выбран";
				isValid = false;
			}

			console.log();

			if (isValid) {
				this.isEditMode ? this.updateColor() : this.createColor();
			}
		},

		async createColor() {
			const { name, color } = this;

			const data = {
				name: name.value,
				color: color.value,
			};

			try {
				this.loading = true;
				const response = await colors.createColor(data);
				if (response) this.$router.push("/transport?tab=colors");
			} catch (err) {
				console.log("Ошибка при добавлении цвета: ", err);
			} finally {
				this.loading = false;
			}
		},

		async updateColor() {
			const { name, color } = this;

			const data = {
				name: name.value,
				color: color.value,
			};

			try {
				this.loading = true;
				const response = await colors.updateColor(this.$route.query.color_id, data);
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
			const response = await colors.getOneColor(this.$route.query.color_id);
			console.log(response);
			this.name.value = response.name;
			this.color.value = response.color;
		}
	},

	watch: {
		"name.value"(newValue) {
			if (newValue) this.name.isValid = true;
		},
		"color.value"(newValue) {
			if (newValue) this.color.isValid = true;
		},
	},
};
</script>
