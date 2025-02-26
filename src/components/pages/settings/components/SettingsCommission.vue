<template>
	<section class="bg-white p-[24px] rounded-[12px] border-[1px] shadow-drop">
		<h2 class="table-title">Коммиссия</h2>

		<form class="form max-w-[250px]" @submit.prevent="submitForm">
			<fieldset :disabled="!editEnabled">
				<div class="form__field">
					<label for="commission" class="form__label">Текущая комиссия:</label>

					<div class="flex gap-2 items-center">
						<div>
							<input
								v-model="formattedCommission"
								type="text"
								id="commission"
								class="form__input"
								:class="{ error: v$.formData.commission.$error }"
								@input="handleInput"
							/>

							<span v-if="v$.formData.commission.$errors.length" class="form__error">
								{{ v$.formData.commission.$errors[0]?.$message }}
							</span>
						</div>

						<span class="relative" :class="{ 'top-[-16px]': v$.formData.commission.$errors.length }">
							сум
						</span>
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
			<CustomButton class="h-12 width-fit purple" @click="toggleEdit">Изменить комиссию</CustomButton>
		</div>
	</section>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { formatDate } from "@/utils/formatters/formatDate";
import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

import commission from "@/api/commission";

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	data() {
		return {
			editEnabled: false,
			initialCommission: null,
			updated_at: "",
			formData: {
				commission: "",
			},
		};
	},

	computed: {
		formattedCommission() {
			return formatNumberWithSpaces(this.formData.commission);
		},

		formattedDate() {
			return formatDate(this.updated_at, true);
		},
	},

	validations() {
		return {
			formData: {
				commission: {
					required: helpers.withMessage("Введите значение", required),
					notZero: helpers.withMessage("Значение не может быть 0", value => value > 0),
				},
			},
		};
	},

	methods: {
		async fetchCommission() {
			const response = await commission.getCommission();
			this.initialCommission = response.fee_amount;
			this.formData.commission = response.fee_amount;
			this.updated_at = response.created_at;
		},

		async updateCommission() {
			const params = { fee_amount: this.formData.commission };
			const response_status = await commission.updateCommission(params);

			if (response_status === 201) {
				this.fetchCommission();
				this.toggleEdit();
			}
		},

		async submitForm() {
			const result = await this.v$.$validate();
			if (result) this.updateCommission();
		},

		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		cancelEdit() {
			this.toggleEdit();
			this.formData.commission = this.initialCommission;
		},

		handleInput(event) {
			let value = event.target.value.replace(/\D/g, "");

			if (value === "") {
				this.formData.commission = "";
				return;
			}

			value = value.replace(/^0+(?=\d)/, "");
			this.formData.commission = +value;
		},
	},

	mounted() {
		this.fetchCommission();
	},

	components: { CustomButton },
};
</script>
