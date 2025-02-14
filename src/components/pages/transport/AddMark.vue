<template>
	<section class="add-transport transport__content">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<div
			class="transport-container w-full flex flex-col justify-center bg-white p-[24px] rounded-[12px] border-[1px]"
		>
			<h2 class="table-title">{{ isEditMode ? "Редактирование новой марки" : "Добавление новой марки" }}</h2>

			<div class="py-4 w-[400px]">
				<form @submit.prevent="submitForm" class="form">
					<ImageUploader
						:image="preview"
						@update:image="preview = $event"
						@send:file="formData.logo = $event"
					/>

					<div class="form__field">
						<label for="mark-name" class="form__label">Производитель:</label>

						<input
							type="text"
							class="form__input h-14"
							name="mark"
							id="mark-name"
							placeholder="Chevrolet"
							v-model="mark.value"
						/>

						<span v-if="!mark.isValid" class="form__error" v-text="mark.message" />
					</div>

					<CustomButton class="h-14 mt-5 radius-75" :loading="loading">Сохранить</CustomButton>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import ImageUploader from "@/components/shared/ui/ImageUploader.vue";
import transport from "@/api/transport";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

const env = import.meta.env;

export default {
	components: {
		ImageUploader,
		CustomButton,
	},

	data: () => ({
		isEditMode: false,
		baseUrl: env.VITE_APP_STATIC_URL,
		preview: null,
		file: null,
		loading: false,
		mark: {
			value: "",
			isValid: true,
			message: "",
		},
	}),

	computed: {
		imageSrc() {
			return this.file ? this.preview : this.isEditMode && this.preview ? this.baseUrl + this.preview : null;
		},
	},

	methods: {
		submitForm() {
			const mark = this.mark.value;

			if (!mark) {
				this.mark.isValid = false;
				this.mark.message = "Название не может быть пустым";
			} else {
				this.isEditMode ? this.updateMark() : this.createMark();
			}
		},

		async createMark() {
			const data = new FormData();

			data.append("name", this.mark.value);
			data.append("description", "123");
			data.append("photo", this.file);

			try {
				this.loading = true;
				const response = await transport.createTransportCategory(data);
				if (response) this.$router.push("/transport?tab=marks");
			} catch (err) {
				console.log("Ошибка при добавлении марки: ", err);
			} finally {
				this.loading = false;
			}
		},

		async updateMark() {
			const data = new FormData();

			console.log(this.file);

			data.append("name", this.mark.value);
			data.append("description", "123");
			data.append("photo", this.file);

			try {
				this.loading = true;
				const response = await transport.updateTransportCategory(data, this.$route.query.id);
				if (response) this.$router.push("/transport?tab=marks");
			} catch (err) {
				console.log("Ошибка при обновлении марки марки: ", err);
			} finally {
				this.loading = false;
			}
		},
	},

	async mounted() {
		this.isEditMode = this.$route.query.id && this.$route.query.mode === "edit";

		if (this.isEditMode) {
			const response = await transport.getOneTransportCategory(this.$route.query.id);

			this.mark.value = response.name;
			this.preview = response.photo;
		}
	},
};
</script>
