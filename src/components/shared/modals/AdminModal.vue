<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<h2 class="text-center mb-8 text-2xl">{{ title }}</h2>

				<form class="form" @submit.prevent="submitForm">
					<div class="form__field">
						<label for="admin-name" class="form__label">Имя:</label>
						<input
							v-model="admin.name"
							type="text"
							class="form__input"
							placeholder="Введите имя"
							id="admin-name"
							:class="{ error: v$.admin.name.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="admin-surname" class="form__label">Фамилия:</label>
						<input
							v-model="admin.last_name"
							type="text"
							class="form__input"
							placeholder="Введите фамилию"
							id="admin-surname"
							:class="{ error: v$.admin.last_name.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="admin-login" class="form__label">Логин:</label>
						<input
							v-model="admin.login"
							type="text"
							class="form__input"
							placeholder="Введите логин"
							id="admin-login"
							:class="{ error: v$.admin.login.$errors.length }"
						/>
					</div>

					<div v-if="!initialData" class="form__field">
						<label for="admin-password" class="form__label">Пароль:</label>
						<div class="input-wrapper">
							<input
								v-model="admin.password"
								:type="passwordVisible ? 'text' : 'password'"
								class="form__input"
								id="loginpage-password"
								placeholder="Пароль"
								:class="{ error: v$.admin.password.$errors.length }"
								@input="v$.admin.password.$reset()"
							/>

							<span @click="passwordVisible = !passwordVisible">
								<i v-if="!passwordVisible" class="fi fi-rr-eye"></i>
								<i v-else class="fi fi-rr-eye-crossed"></i>
							</span>
						</div>

						<span v-if="v$.admin.password.minLength.$invalid" class="form__error">
							Пароль должен содержать минимум 8 символов
						</span>
					</div>

					<CustomButton class="mt-4 h-14" :loading="loading">{{ submitText }}</CustomButton>
				</form>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf, minLength } from "@vuelidate/validators";

export default {
	emits: ["create", "update", "close"],
	props: {
		type: {
			type: String,
			required: true,
		},
		initialData: {
			type: Object || null,
			default: null,
		},
	},

	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	validations() {
		return {
			admin: {
				name: { required },
				last_name: { required },
				login: { required },
				password: {
					required: requiredIf(() => {
						return !this.initialData;
					}),
					minLength: minLength(8),
				},
			},
		};
	},

	data() {
		return {
			loading: false,
			passwordVisible: false,
			admin: {
				name: "",
				last_name: "",
				login: "",
				password: "",
			},
		};
	},

	computed: {
		title() {
			if (this.title === "chain") {
				return this.initialData ? "Редактирование админа сети" : "Создание админа сети";
			} else if (this.title === "branch") {
				return this.initialData ? "Редактирование админа филиала" : "Создание админа филиала";
			}
		},

		submitText() {
			return this.initialData ? "Сохранить" : "Создать";
		},
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				if (this.initialData) {
					delete this.admin.password;
					this.$emit("update", this.admin);
				} else {
					this.$emit("create", this.admin);
				}
			}
		},
	},

	mounted() {
		if (this.initialData) {
			this.admin.id = this.initialData.id;
			this.admin.name = this.initialData.name;
			this.admin.last_name = this.initialData.last_name;
			this.admin.login = this.initialData.login;
		}
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
