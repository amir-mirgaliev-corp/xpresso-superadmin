<template>
	<section
		v-if="profile"
		class="client__table user-profile bg-white p-[24px] rounded-[12px] border-[1px] shadow-drop"
	>
		<div class="user-profile__avatar w-fit drop-shadow-sm mb-6">
			<img :src="userAvatar" class="w-[124px] h-[124px] object-cover rounded-[50%]" alt="User avatar" />
		</div>

		<form class="form user-profile__form max-w-[550px]" @submit.prevent="submitForm">
			<fieldset :disabled="!editable">
				<div class="form__field mb-4">
					<label class="form__label" for="user-name">Имя</label>
					<input
						type="text"
						name="user-name"
						class="form__input"
						:class="{ error: v$.profile.name.$errors.length }"
						id="user-name"
						:placeholder="editable ? 'Введите имя' : ''"
						v-model="profile.name"
					/>
				</div>

				<div class="form__field mb-4">
					<label class="form__label" for="user-surname">Фамилия</label>
					<input
						type="text"
						name="user-surname"
						class="form__input"
						:class="{ error: v$.profile.last_name.$errors.length }"
						id="user-surname"
						:placeholder="editable ? 'Введите фамилию' : ''"
						v-model="profile.last_name"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="form__field">
						<label class="form__label" for="user-login">Логин</label>
						<input
							type="text"
							name="user-login"
							class="form__input"
							:class="{ error: v$.profile.username.$errors.length }"
							id="user-login"
							:placeholder="editable ? 'Введите логин' : ''"
							v-model="profile.username"
						/>
					</div>

					<div class="form__field">
						<label class="form__label" for="user-id">ID</label>
						<input
							type="text"
							name="user-id"
							class="form__input"
							id="user-id"
							:value="profile.id"
							readonly
						/>
					</div>

					<div class="form__field">
						<label class="form__label" for="user-phone">Номер телефона</label>
						<input
							type="text"
							name="user-phone"
							class="form__input"
							id="user-phone"
							:placeholder="editable ? 'Введите номер' : ''"
							v-model="profile.phone_number"
							readonly
						/>
					</div>

					<div class="form__field">
						<label class="form__label" for="user-gender">Пол</label>
						<input
							type="text"
							name="user-gender"
							class="form__input"
							id="user-gender"
							:value="translatedGender"
							readonly
						/>
					</div>

					<div class="form__field">
						<label class="form__label" for="user-transport">Автомобиль</label>
						<input
							type="text"
							name="user-transport"
							class="form__input"
							id="user-transport"
							:value="userTransport"
							readonly
						/>
					</div>

					<div class="form__field">
						<label class="form__label" for="user-transport-color">Цвет автомобиля</label>
						<input
							type="text"
							name="user-transport-color"
							class="form__input"
							id="user-transport-color"
							:value="profile.vehicle_color"
							readonly
						/>
					</div>
				</div>
			</fieldset>

			<div v-if="editable" class="user-profile__controls grid grid-cols-2 gap-4 mt-8">
				<CustomButton type="secondary" btn-type="button" class="h-12" @click="cancelEdit">
					Отменить
				</CustomButton>

				<CustomButton class="h-12">Сохранить</CustomButton>
			</div>
		</form>
	</section>

	<div v-if="profile && !editable" class="user-profile__actions flex justify-end gap-4 mt-4">
		<CustomButton class="user-profile__delete h-12 width-fit" icon="fi-rr-trash" @click="deleteModalOpen = true">
			Удалить пользователя
		</CustomButton>

		<CustomButton
			class="h-12 width-fit"
			:class="banButtonClass"
			:icon="profile.is_blocked ? 'fi-rr-lock-open-alt' : 'fi-rr-lock'"
			@click="blockModalOpen = true"
		>
			{{ banConfirmButtonText }}
		</CustomButton>

		<CustomButton class="user-profile__edit h-12 width-fit purple" icon="fi-rr-edit" @click="editProfile">
			Редактировать
		</CustomButton>

		<!-- <CustomButton class="user-profile__download h-12 width-fit" icon="fi-rr-download">Скачать данные</CustomButton> -->
	</div>

	<DangerModal v-if="deleteModalOpen" @confirm="deleteUser" @close="deleteModalOpen = false" />

	<DangerModal
		v-if="blockModalOpen"
		:title="banModalTitle"
		icon="fi-rr-ban"
		:confirmText="banConfirmButtonText"
		@confirm="changeBlockStatus"
		@close="blockModalOpen = false"
	/>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { toRaw } from "vue";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import CustomButton from "@/components/shared/ui/CustomButton.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import users from "@/api/users";

import defaultAvatar from "@/assets/images/default_avatar.svg";

export default {
	setup() {
		return {
			v$: useVuelidate(),
			toast: useToast(),
		};
	},

	components: {
		CustomButton,
		DangerModal,
	},

	data: () => ({
		profile: null,
		initialProfile: null,
		editable: false,
		deleteModalOpen: false,
		blockModalOpen: false,
	}),

	validations() {
		return {
			profile: {
				name: { required },
				last_name: { required },
				username: { required },
			},
		};
	},

	computed: {
		...mapGetters(["getUserProfile"]),

		totalPrice() {
			return formatNumberWithSpaces(this.profile.userTotalPrice) + " UZS";
		},

		userAvatar() {
			return this.profile.avatar || defaultAvatar;
		},

		translatedGender() {
			let result = "Не указан";

			switch (this.profile.gender) {
				case "male":
					result = "Мужской";
					break;
				case "female":
					result = "Женский";
					break;
			}

			return result;
		},

		userTransport() {
			if (this.profile.vehicle_make && this.profile.vehicle_model && this.profile.license_plate) {
				return `${this.profile.vehicle_make} ${this.profile.vehicle_model}, ${this.profile.license_plate}`;
			} else {
				return "";
			}
		},

		banModalTitle() {
			return this.profile.is_blocked
				? "Уверены, что хотите разблокировать пользователя?"
				: "Уверены, что хотите заблокировать этого пользователя?";
		},

		banConfirmButtonText() {
			return this.profile.is_blocked ? "Разблокировать" : "Заблокировать";
		},

		banButtonClass() {
			return this.profile.is_blocked ? "user-profile__unban" : "user-profile__ban";
		},
	},

	methods: {
		...mapActions(["fetchUserProfile"]),

		async fetchProfile() {
			const user_id = this.$route.params.user_id;
			await this.fetchUserProfile(user_id);
			this.profile = structuredClone(toRaw(this.getUserProfile));
			this.initialProfile = structuredClone(toRaw(this.profile));
		},

		editProfile() {
			this.editable = true;
		},

		cancelEdit() {
			this.editable = false;
			this.v$.$reset();
			this.profile = structuredClone(toRaw(this.initialProfile));
		},

		async submitForm() {
			const result = await this.v$.$validate();
			if (result) this.updateProfile();
		},

		async updateProfile() {
			const updatedFields = {};

			Object.keys(this.profile).forEach(key => {
				if (key !== "avatar" && this.profile[key] !== this.initialProfile[key]) {
					updatedFields[key] = this.profile[key];
				}
			});

			if (!Object.keys(updatedFields).length) {
				this.toast.info("Нет изменений для обновления");
				return;
			}

			const user_id = this.$route.params.user_id;
			const status = await users.updateUserProfile(user_id, updatedFields);

			if (status === 200) {
				this.editable = false;
				this.fetchProfile();
			}
		},

		async deleteUser() {
			const status = await users.deleteUser(this.$route.params.user_id);

			if (status === 204) {
				this.deleteModalOpen = false;
				this.$router.push("/clients");
			}
		},

		async changeBlockStatus() {
			const user_id = this.$route.params.user_id;

			if (this.profile.is_blocked) {
				await users.unblockUser(user_id);
			} else {
				await users.blockUser(user_id);
			}

			this.blockModalOpen = false;
			this.fetchProfile();
		},
	},

	mounted() {
		this.fetchProfile();
	},
};
</script>

<style lang="scss" scoped>
.user-profile {
	&__ban {
		background-color: orange;
	}
	&__unban {
		background-color: #1cc240;
	}
	&__download {
		flex-direction: row-reverse;
		background-color: $blue;
	}
}
</style>
