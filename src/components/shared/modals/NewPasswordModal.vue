<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<h2 class="text-center mb-8 text-2xl">Смена пароля</h2>

				<form class="form" @submit.prevent="submitForm">
					<div v-if="oldPasswordRequired" class="form__field">
						<label class="form__label">Старый пароль:</label>
						<div class="input-wrapper">
							<input
								v-model="formData.old_password"
								:type="oldPasswordVisible ? 'text' : 'password'"
								class="form__input"
								placeholder="Введите старый пароль"
								:class="{
									error: v$.formData.old_password.$errors.length || error === 'invalid_old_password',
								}"
								@input="v$.formData.old_password.$reset()"
							/>

							<span @click="oldPasswordVisible = !oldPasswordVisible">
								<i v-if="!oldPasswordVisible" class="fi fi-rr-eye"></i>
								<i v-else class="fi fi-rr-eye-crossed"></i>
							</span>
						</div>

						<span v-if="v$.formData.old_password.$errors.length" class="form__error">
							{{ v$.formData.old_password.$errors[0]?.$message }}
						</span>
					</div>

					<div class="form__field">
						<label class="form__label">Новый пароль:</label>
						<div class="input-wrapper">
							<input
								v-model="formData.password"
								:type="passwordVisible ? 'text' : 'password'"
								class="form__input"
								placeholder="Введите новый пароль"
								:class="{ error: v$.formData.password.$errors.length }"
								@input="v$.formData.password.$reset()"
							/>

							<span @click="passwordVisible = !passwordVisible">
								<i v-if="!passwordVisible" class="fi fi-rr-eye"></i>
								<i v-else class="fi fi-rr-eye-crossed"></i>
							</span>
						</div>

						<span v-if="v$.formData.password.$errors.length" class="form__error">
							{{ v$.formData.password.$errors[0]?.$message }}
						</span>
					</div>

					<div class="form__field">
						<label class="form__label">Подтвердите пароль:</label>
						<div class="input-wrapper">
							<input
								v-model="formData.confirm_password"
								:type="confirmPasswordVisible ? 'text' : 'password'"
								class="form__input"
								placeholder="Введите пароль еще раз"
								:class="{ error: v$.formData.confirm_password.$errors.length }"
								@input="v$.formData.confirm_password.$reset()"
							/>

							<span @click="confirmPasswordVisible = !confirmPasswordVisible">
								<i v-if="!confirmPasswordVisible" class="fi fi-rr-eye"></i>
								<i v-else class="fi fi-rr-eye-crossed"></i>
							</span>
						</div>

						<span v-if="v$.formData.confirm_password.$errors.length" class="form__error">
							{{ v$.formData.confirm_password.$errors[0]?.$message }}
						</span>
					</div>

					<CustomButton class="mt-4 h-14" :loading="loading">Сохранить</CustomButton>
				</form>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf, minLength, sameAs, helpers } from "@vuelidate/validators";

export default {
	emits: ["submit", "close"],

	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	props: {
		oldPasswordRequired: Boolean,
		error: String,
	},

	validations() {
		return {
			formData: {
				old_password: {
					required: helpers.withMessage(
						"Заполните поле",
						requiredIf(() => this.oldPasswordRequired),
					),
				},
				password: {
					required: helpers.withMessage("Заполните поле", required),
					minLength: helpers.withMessage("Пароль должен содержать минимум 8 символов", minLength(8)),
				},
				confirm_password: {
					required: helpers.withMessage("Заполните поле", required),
					sameAsPassword: helpers.withMessage("Пароли не совпадают", sameAs(this.formData.password)),
				},
			},
		};
	},

	data() {
		return {
			loading: false,
			oldPasswordVisible: false,
			passwordVisible: false,
			confirmPasswordVisible: false,
			formData: {
				old_password: "",
				password: "",
				confirm_password: "",
			},
		};
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				if (this.oldPasswordRequired) {
					this.$emit("submit", {
						old_password: this.formData.old_password,
						new_password: this.formData.password,
					});
				} else {
					this.$emit("submit", this.formData.password);
				}
			}
		},
	},

	components: {
		CustomButton,
	},
};
</script>

<style lang="scss" scoped>
.form__field {
	&:not(:last-child) {
		margin-bottom: 0.75rem;
	}
}
</style>
