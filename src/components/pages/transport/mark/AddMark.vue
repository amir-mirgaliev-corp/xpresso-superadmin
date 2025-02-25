<template>
	<section class="add-transport transport__content">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<div
			class="transport-container w-full flex flex-col justify-center bg-white p-[24px] rounded-[12px] border-[1px]"
		>
			<h2 class="table-title">{{ isEditMode ? "Редактирование новой марки" : "Добавление новой марки" }}</h2>

			<div class="py-4 w-[400px] max-sm:w-full">
				<form @submit.prevent="submitForm" class="form">
					<ImageUploader :image="preview" @update:image="preview = $event" @send:file="file = $event" />

					<div class="form__field mt-6">
						<label for="mark-name" class="form__label">Производитель:</label>

						<input
							type="text"
							class="form__input h-14"
							:class="{
								error: !mark.isValid,
							}"
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
import { transportMakeApi } from "@/api/transport";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import { mapActions, mapGetters } from "vuex";

const env = import.meta.env;

export default {
	components: {
		ImageUploader,
		CustomButton,
	},

	data: () => ({
		isEditMode: false,
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
			return this.file ? this.preview : this.isEditMode && this.preview ? this.preview : null;
		},
	},

	methods: {
		...mapActions(["fetchTransportMakeList"]),

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
			data.append("file", this.file);

			try {
				this.loading = true;
				const response = await transportMakeApi.createTransportMake(data);
				if (response) {
					this.$router.push("/transport?tab=marks");
					this.fetchTransportMakeList();
				}
			} catch (err) {
				console.log("Ошибка при добавлении марки: ", err);
			} finally {
				this.loading = false;
			}
		},

		async updateMark() {
			const data = new FormData();

			this.file !== null && data.append("logo", this.file);

			const params = {
				make_id: this.$route.query.id,
				name: this.mark.value,
			};

			try {
				this.loading = true;
				const response = await transportMakeApi.updateTransportMake(params, data.has("logo") ? data : null);
				if (response) {
					this.$router.push("/transport?tab=marks");
					this.fetchTransportMakeList();
				}
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
			const response = await transportMakeApi.getTransportMakeById(this.$route.query.id);
			this.mark.value = response.name;
			this.preview = response.logo;
		}
	},
};
</script>
