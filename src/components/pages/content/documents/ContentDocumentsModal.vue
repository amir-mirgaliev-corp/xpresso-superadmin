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
							<label :for="`title_${lang}`" class="text-sm"> Документ на {{ lang.toUpperCase() }} </label>
							<input
								type="text"
								:id="`title_${lang}`"
								:placeholder="`Название документа (${lang.toUpperCase()})`"
								:class="[
									'form__input',
									{
										error: v$.formData[`title_${lang}`].$errors.length,
									},
								]"
								v-model="formData[`title_${lang}`]"
							/>
							<span v-if="v$.formData[`title_${lang}`].$errors.length" class="form__error">
								Введите название
							</span>
						</div>
						<a v-if="initialFormData[`link_${lang}`]" :href="initialFormData[`link_${lang}`]" class="link">
							<i class="fi fi-rr-link-alt"></i>
							{{ initialFormData[`link_${lang}`] }}
						</a>
						<div class="mt-2">
							<input type="file" :id="`${lang}_file`" @change="handleFileUpload($event, lang)" />
							<span v-if="v$.formData[`${lang}_file`].$errors.length" class="form__error">
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
import { required, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "vue-toastification";
import documentsApi from "@/api/docs";

export default {
	emits: ["update", "close"],
	setup() {
		return {
			v$: useVuelidate(),
			toast: useToast(),
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
			title_ru: "",
			title_uz: "",
			title_en: "",
			ru_file: null,
			uz_file: null,
			en_file: null,
		},
		loading: false,
	}),
	validations() {
		return {
			formData: {
				title_ru: { required },
				title_uz: { required },
				title_en: { required },
				ru_file: { required: requiredIf(() => !this.initialFormData) },
				uz_file: { required: requiredIf(() => !this.initialFormData) },
				en_file: { required: requiredIf(() => !this.initialFormData) },
			},
		};
	},
	methods: {
		handleFileUpload(event, lang) {
			this.formData[`${lang}_file`] = event.target.files[0];
		},

		async submitForm() {
			const isValid = await this.v$.$validate();
			if (!isValid) return;

			this.initialFormData && Object.keys(this.initialFormData).length
				? this.updateDocument()
				: this.createDocument();
		},

		async createDocument() {
			const fd = new FormData();

			const data = {
				title_ru: this.formData.title_ru,
				title_uz: this.formData.title_uz,
				title_en: this.formData.title_en,
			};

			fd.append("data", JSON.stringify(data));
			fd.append("ru_file", this.formData.ru_file);
			fd.append("uz_file", this.formData.uz_file);
			fd.append("en_file", this.formData.en_file);

			this.loading = true;
			const status = await documentsApi.createDocument(fd);
			this.loading = false;

			if (status === 200) this.$emit("update");
		},

		async updateDocument() {
			const fd = new FormData();
			const updatedFields = {};

			["title_ru", "title_uz", "title_en"].forEach(field => {
				if (this.formData[field] !== this.initialFormData[field]) {
					updatedFields[field] = this.formData[field];
				}
			});

			["ru", "uz", "en"].forEach(lang => {
				if (this.formData[`${lang}_file`]) {
					fd.append(`${lang}_file`, this.formData[`${lang}_file`]);
				}
			});

			if (Object.keys(updatedFields).length) {
				fd.append("data", JSON.stringify(updatedFields));
			}

			if (!Object.keys(updatedFields).length && !fd.has("ru_file") && !fd.has("uz_file") && !fd.has("en_file")) {
				this.toast.info("Нет изменений для обновления");
				return;
			}

			this.loading = true;
			const status = await documentsApi.updateDocument(this.initialFormData.id, fd);
			this.loading = false;

			if (status === 200) this.$emit("update");
		},

		setFormData() {
			this.formData.title_ru = this.initialFormData?.title_ru || "";
			this.formData.title_uz = this.initialFormData?.title_uz || "";
			this.formData.title_en = this.initialFormData?.title_en || "";
		},
	},
	mounted() {
		if (this.initialFormData) {
			this.setFormData();
		}
	},
};
</script>

<style scoped>
.link {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: #3b9fd1;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin: 0.5rem;
}
</style>
