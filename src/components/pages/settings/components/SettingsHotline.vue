<template>
	<section class="bg-white p-[24px] rounded-[12px] border-[1px] shadow-drop">
		<h2 class="table-title">Телефон горячей линии</h2>

		<form class="form max-w-[250px]" @submit.prevent="submitForm">
			<fieldset :disabled="!editEnabled">
				<div class="form__field">
					<label for="hotline-number" class="form__label">Текущий номер телефона:</label>

					<div class="flex gap-2 items-center">
						<div>
							<input
								v-model="formData.phone_number"
								type="text"
								id="hotline-number"
								class="form__input"
								:class="{ error: v$.formData.phone_number.$error }"
								@input="handleInput"
							/>

							<span v-if="v$.formData.phone_number.$errors.length" class="form__error">
								{{ v$.formData.phone_number.$errors[0]?.$message }}
							</span>
						</div>
					</div>
				</div>
			</fieldset>

			<div v-if="editEnabled" class="grid grid-cols-[175px_175px] gap-4 mt-4">
				<CustomButton type="secondary" btn-type="button" class="h-12" @click="cancelEdit">
					Отменить
				</CustomButton>

				<CustomButton class="h-12">Сохранить</CustomButton>
			</div>
		</form>

		<div v-if="!editEnabled" class="flex gap-2 items-center my-4 text-[#aaa]">
			<i class="fi fi-rr-time-past"></i>
			Последнее обновление: {{ formattedDate }}
		</div>

		<div v-if="!editEnabled">
			<CustomButton class="h-12 width-fit purple" @click="toggleEdit">Изменить номер</CustomButton>
		</div>
	</section>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { formatDate } from "@/utils/formatters/formatDate";

import hotline from "@/api/hotline";

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	data() {
		return {
			editEnabled: false,
			initialPhoneNumber: null,
			updated_at: "",
			formData: {
				phone_number: "",
			},
		};
	},

	computed: {
		formattedDate() {
			return formatDate(this.updated_at, true);
		},
	},

	validations() {
		return {
			formData: {
				phone_number: {
					required: helpers.withMessage("Введите значение", required),
				},
			},
		};
	},

	methods: {
		async fetchHotline() {
			const response = await hotline.getHotline();
			this.initialPhoneNumber = response.phone_number;
			this.formData.phone_number = response.phone_number;
			this.updated_at = response.created_at;
		},

		async updateHotline() {
			const params = { phone_number: this.formData.phone_number };
			const response_status = await hotline.updateHotline(params);

			if (response_status === 201) {
				this.fetchHotline();
				this.toggleEdit();
			}
		},

		async submitForm() {
			const result = await this.v$.$validate();
			if (result) this.updateHotline();
		},

		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		cancelEdit() {
			this.toggleEdit();
			this.formData.phone_number = this.initialPhoneNumber;
		},
	},

	mounted() {
		this.fetchHotline();
	},

	components: { CustomButton },
};
</script>
