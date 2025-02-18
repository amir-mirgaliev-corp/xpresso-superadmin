<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<h2 class="text-center mb-4 text-2xl">
					{{
						initialFormData && Object.keys(initialFormData).length
							? "Редактирование документа"
							: "Загрузка документа"
					}}
				</h2>

				<form @submit.prevent="submitForm" class="flex flex-col gap-y-3">
					<div v-for="lang in ['ru', 'uz', 'en']" :key="lang">
						<div class="flex flex-col gap-y-1">
							<label :for="`name_${lang}`" class="text-sm"> Документ на {{ lang.toUpperCase() }} </label>
							<input
								type="text"
								:id="`name_${lang}`"
								:placeholder="`Название документа (${lang.toUpperCase()})`"
								class="border rounded-xl px-2 py-3"
								v-model="formData[`name_${lang}`]"
							/>
							<span v-if="v$.formData[`name_${lang}`].$errors.length" class="form__error">
								Введите название
							</span>
						</div>
						<div class="mt-2">
							<input type="file" :id="`file_${lang}`" @change="handleFileUpload($event, lang)" />
							<span v-if="v$.formData[`file_${lang}`].$errors.length" class="form__error">
								Загрузите документ
							</span>
						</div>
					</div>
				</form>

				<div class="modal__actions">
					<CustomButton class="h-12 mt-6" :disabled="loading" @click="submitForm">
						{{ loading ? "Загрузка..." : "Сохранить" }}
					</CustomButton>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import documentsApi from "@/api/docs";

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},
	components: { CustomButton },
	props: {
		initialFormData: {
			type: Object,
			default: null,
		},
	},
	data: () => ({
		formData: {
			name_ru: "",
			name_uz: "",
			name_en: "",
			file_ru: null,
			file_uz: null,
			file_en: null,
		},
		loading: false,
	}),
	validations() {
		return {
			formData: {
				name_ru: { required },
				name_uz: { required },
				name_en: { required },
				file_ru: { required },
				file_uz: { required },
				file_en: { required },
			},
		};
	},
	methods: {
		handleFileUpload(event, lang) {
			this.formData[`file_${lang}`] = event.target.files[0];
		},

		async submitForm() {
			const isValid = await this.v$.$validate();
			if (!isValid) return;

			console.log(this.initialFormData);

			this.initialFormData && Object.keys(this.initialFormData).length
				? this.updateDocument()
				: this.createDocument();
		},

		async createDocument() {
			const fd = this.prepareFormData();

			try {
				this.loading = true;
				const response = await documentsApi.createDocument(fd, this.formData.name_ru);
				if (response) {
					this.$emit("close");
				}
			} catch (err) {
				console.error("Ошибка создания документа:", err);
			} finally {
				this.loading = false;
			}
		},

		async updateDocument() {
			const fd = this.prepareFormData();

			try {
				this.loading = true;
				const response = await documentsApi.updateDocument(fd, this.initialFormData.name_ru);
				if (response) {
					this.$emit("close");
				}
			} catch (err) {
				console.error("Ошибка обновления документа:", err);
			} finally {
				this.loading = false;
			}
		},

		prepareFormData() {
			const fd = new FormData();
			fd.append("file_ru", this.formData.file_ru);
			fd.append("file_uz", this.formData.file_uz);
			fd.append("file_en", this.formData.file_en);
			return fd;
		},

		setFormData() {
			this.formData.name_ru = this.initialFormData?.name_ru || "";
			this.formData.name_uz = this.initialFormData?.name_uz || "";
			this.formData.name_en = this.initialFormData?.name_en || "";
		},
	},
	mounted() {
		if (this.initialFormData) {
			this.setFormData();
		}
	},
};
</script>
