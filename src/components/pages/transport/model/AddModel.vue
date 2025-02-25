<template>
	<section class="add-transport transport__content">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<div
			class="transport-container w-full flex flex-col justify-center bg-white p-[24px] rounded-[12px] border-[1px]"
		>
			<h2 class="table-title" v-if="transportMark">
				{{ isEditMode ? "Редактировать модель марки: " : "Добавить модель марки: " }} {{ transportMark.name }}
			</h2>

			<div class="py-4 w-[400px] max-sm:w-full">
				<form @submit.prevent="submitForm" class="form">
					<div class="form__field">
						<label for="model-name" class="form__label">Название модели:</label>

						<input
							type="text"
							:class="[
								'form__input',
								{
									error: v$.model.$errors.length,
								},
							]"
							id="model-name"
							name="model"
							placeholder="Cobalt"
							v-model="model"
						/>

						<span v-if="v$.model.$errors.length" class="form__error"> Введите модель </span>
					</div>

					<CustomButton class="h-14 mt-5 radius-75" :loading="loading">Сохранить</CustomButton>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import { transportModelApi } from "@/api/transport";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
	components: {
		CustomButton,
	},

	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	data: () => ({
		isEditMode: false,
		loading: false,
		transportMark: null,
		model: "",
	}),

	validations() {
		return {
			model: { required },
		};
	},

	methods: {
		async setTransportMark() {
			const response = await transportModelApi.getOneTransportCategory(this.$route.params.mark_id);
			this.transportMark = response;
		},

		async submitForm() {
			const isValid = await this.v$.$validate();
			if (!isValid) return;

			this.isEditMode ? this.updateModel() : this.createModel();
		},

		async createModel() {
			const data = {
				name: this.model,
				make_id: this.$route.params.mark_id,
			};

			try {
				this.loading = true;
				const response = await transportModelApi.createTransportModel(data);
				if (response) this.$router.push(`/transport?mark_id=${this.$route.params.mark_id}`);
			} catch (err) {
				console.log("Ошибка при добавлении модели: ", err);
			} finally {
				this.loading = false;
			}
		},

		async updateModel() {
			const data = {
				name: this.model,
				make_id: this.$route.params.mark_id,
			};

			try {
				this.loading = true;
				const response = await transportModelApi.updateTransportModel(this.$route.query.model_id, data);
				if (response) this.$router.push(`/transport?mark_id=${this.$route.params.mark_id}`);
			} catch (err) {
				console.log("Ошибка при обновлении модели: ", err);
			} finally {
				this.loading = false;
			}
		},
	},

	async mounted() {
		this.setTransportMark();

		this.isEditMode = this.$route.query.model_id && this.$route.query.mode === "edit";

		if (this.isEditMode) {
			const response = await transportModelApi.getTransportModelById(this.$route.query.model_id);
			this.model = response.name;
		}
	},
};
</script>
