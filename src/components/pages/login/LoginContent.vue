<template>
	<div class="login__content" @submit.prevent="submitForm" @keyup.enter="submitForm">
		<div class="login__logo">
			<img src="@/assets/images/logo.svg" alt="Logo" />
		</div>

		<form class="login__form form">
			<div class="form__field">
				<label for="loginpage-login" class="form__label">Ваш логин:</label>
				<input
					type="text"
					class="form__input"
					:class="{ error: v$.formData.login.$errors.length }"
					id="loginpage-login"
					placeholder="Логин"
					v-model="formData.login"
				/>
			</div>

			<div class="form__field">
				<label for="loginpage-password" class="form__label">Ваш пароль:</label>
				<div class="input-wrapper">
					<input
						:type="passwordVisible ? 'text' : 'password'"
						class="form__input"
						:class="{ error: v$.formData.password.$errors.length }"
						id="loginpage-password"
						placeholder="Пароль"
						v-model="formData.password"
						@input="v$.formData.password.$reset()"
					/>

					<span @click="passwordVisible = !passwordVisible">
						<i v-if="passwordVisible" class="fi fi-rr-eye"></i>
						<i v-else class="fi fi-rr-eye-crossed"></i>
					</span>
				</div>

				<span v-if="showMinLengthError" class="form__error">Пароль должен содержать минимум 8 символов</span>
			</div>

			<CustomButton class="h-[56px] text-lg mt-6 radius-75" icon="fi-rr-sign-in-alt" :loading="loading"
				>Войти</CustomButton
			>

			<span v-if="error" class="form__error !mt-6 text-center">{{ error }}</span>
		</form>
	</div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import auth from "@/api/auth";

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	validations() {
		return {
			formData: {
				login: { required },
				password: { required, minLength: minLength(8) },
			},
		};
	},

	data: () => ({
		error: null,
		passwordVisible: false,
		loading: false,
		formData: {
			login: "",
			password: "",
		},
	}),

	computed: {
		showMinLengthError() {
			let result = this.v$.formData.password.$errors.findIndex(err => err.$validator === "minLength");
			return result !== -1;
		},
	},

	components: {
		CustomButton,
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.login();
			}
		},

		async login() {
			this.error = null;

			this.loading = true;
			const response = await auth.login(this.formData.login, this.formData.password);
			this.loading = false;

			if (response === 400) {
				this.error = "Неверный логин или пароль";
			} else if (response.refresh_token && response.access_token) {
				localStorage.setItem("accessToken", response.access_token);
				localStorage.setItem("refreshToken", response.refresh_token);
				this.$router.push("/dashboard");
				location.reload();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	&__content {
		max-width: 450px;
		width: 100%;
		background-color: $white;
		border-radius: 2rem;
		padding: 2.75rem 2rem 2.25rem 2rem;
	}
	&__logo {
		margin-bottom: 1rem;
	}
	.form {
		&__field {
			margin-bottom: 1rem;
		}
		&__label {
			font-size: 1rem;
		}
		&__input {
			height: 3.25rem;
		}
		.input-wrapper > span > i {
			color: #dcdcdc;
		}
	}
}
</style>
