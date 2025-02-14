<template>
	<section
		v-if="profile"
		class="client__table user-profile bg-white p-[24px] rounded-[12px] border-[1px] shadow-drop"
	>
		<div class="user-profile__avatar drop-shadow-sm mb-6">
			<img :src="userAvatar" class="w-[124px] rounded-[50%]" alt="User avatar" />
		</div>

		<form class="form user-profile__form max-w-[550px]" @submit.prevent="submitForm">
			<fieldset :disabled="!editable">
				<div class="form__field mb-4">
					<label class="form__label" for="user-name">Имя</label>
					<input
						type="text"
						name="user-name"
						class="form__input"
						:class="{ error: v$.profile.firstName.$errors.length }"
						id="user-name"
						:placeholder="editable ? 'Введите имя' : ''"
						v-model="profile.firstName"
					/>
				</div>

				<div class="form__field mb-4">
					<label class="form__label" for="user-surname">Фамилия</label>
					<input
						type="text"
						name="user-surname"
						class="form__input"
						:class="{ error: v$.profile.lastName.$errors.length }"
						id="user-surname"
						:placeholder="editable ? 'Введите фамилию' : ''"
						v-model="profile.lastName"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="form__field">
						<label class="form__label" for="user-login">Логин</label>
						<input
							type="text"
							name="user-login"
							class="form__input"
							:class="{ error: v$.profile.userLogin.$errors.length }"
							id="user-login"
							:placeholder="editable ? 'Введите логин' : ''"
							v-model="profile.userLogin"
						/>
					</div>

					<div class="form__field">
						<label class="form__label" for="user-id">ID</label>
						<input
							type="text"
							name="user-id"
							class="form__input"
							id="user-id"
							:value="profile.userId"
							readonly
						/>
					</div>

					<div class="form__field">
						<label class="form__label" for="user-phone">Номер телефона</label>
						<input
							type="text"
							name="user-phone"
							class="form__input"
							:class="{ error: v$.profile.userPhone.$errors.length }"
							id="user-phone"
							:placeholder="editable ? 'Введите номер' : ''"
							v-model="profile.userPhone"
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
						<label class="form__label" for="user-transport-number">Номер автомобиля</label>
						<input
							type="text"
							name="user-transport-number"
							class="form__input"
							id="user-transport-number"
							:value="profile.userTransport.userTransportNumber"
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
							:value="profile.userTransport.userTransportColor.userTransportColorName"
							readonly
						/>
					</div>
				</div>
			</fieldset>

			<div v-if="editable" class="user-profile__controls grid grid-cols-2 gap-4 mt-8">
				<CustomButton type="secondary" btn-type="button" class="h-12" @click="cancelEdit"
					>Отменить</CustomButton
				>
				<CustomButton class="h-12">Сохранить</CustomButton>
			</div>
		</form>
	</section>

	<div v-if="profile && !editable" class="user-profile__actions flex justify-end gap-4 mt-4">
		<CustomButton class="user-profile__delete h-12 width-fit" @click="deleteModalOpen = true"
			>Удалить пользователя</CustomButton
		>
		<CustomButton class="h-12 width-fit" :class="banButtonClass" @click="blockModalOpen = true">{{
			banConfirmButtonText
		}}</CustomButton>
		<CustomButton class="user-profile__edit h-12 width-fit purple" @click="editProfile"
			>Редактировать информацию</CustomButton
		>
		<!-- <CustomButton class="user-profile__download h-12 width-fit" icon="fi-rr-download">Скачать данные</CustomButton> -->
	</div>

	<DangerModal v-if="deleteModalOpen" @confirm="deleteThisUser" @close="deleteModalOpen = false" />

	<DangerModal
		v-if="blockModalOpen"
		:title="banModalTitle"
		icon="fi-rr-ban"
		:confirmText="banConfirmButtonText"
		@confirm="changeBanStatus"
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

const env = import.meta.env;

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
		isBaned: false,
		baseUrl: env.VITE_APP_STATIC_URL,
		defaultAvatar: require("@/assets/images/avatars/default_avatar.svg"),
	}),

	validations() {
		return {
			profile: {
				firstName: { required },
				lastName: { required },
				userLogin: { required },
				userPhone: { required },
			},
		};
	},

	computed: {
		...mapGetters(["getUserProfile"]),

		totalPrice() {
			return formatNumberWithSpaces(this.profile.userTotalPrice) + " UZS";
		},

		userAvatar() {
			return this.profile.userAvatar ? this.baseUrl + this.profile.userAvatar : this.defaultAvatar;
		},

		translatedGender() {
			let result = "Не указан";

			switch (this.profile.userGender) {
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
			return `${this.profile.userTransport.userTransportCategory || ""} ${this.profile.userTransport.userTransportModel || ""}`;
		},

		banModalTitle() {
			return this.profile.userIsBaned
				? "Уверены, что хотите разблокировать пользователя?"
				: "Уверены, что хотите заблокировать этого пользователя?";
		},

		banConfirmButtonText() {
			return this.profile.userIsBaned ? "Разблокировать" : "Заблокировать";
		},

		banButtonClass() {
			return this.profile.userIsBaned ? "user-profile__unban" : "user-profile__ban";
		},
	},

	methods: {
		...mapActions(["fetchUserProfile"]),

		async fetchProfile() {
			const userId = this.$route.params.user_id;
			await this.fetchUserProfile(userId);
			this.profile = this.getUserProfile;
			this.initialProfile = structuredClone(toRaw(this.profile));
			this.profile.userIsBaned = this.profile.userIsBaned === "true";
			console.log(this.profile);
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

			if (result) {
				this.updateProfile();
			}
		},

		async updateProfile() {
			const params = {
				name: this.profile.firstName,
				surname: this.profile.lastName,
				login: this.profile.userLogin,
				phone: this.profile.userPhone,
			};

			const userId = this.$route.params.user_id;
			const status = await users.updateUserProfile(userId, params);
			if (status === 200) location.reload();
		},

		async deleteThisUser() {
			const response = await users.deleteUser(this.$route.params.user_id);
			if (response === 200) {
				this.$router.push("/clients");
			} else {
				this.deleteModalOpen = false;
				this.toast.error("У пользователя есть активные заказы");
			}
		},

		async changeBanStatus() {
			const data = {
				user_id: this.$route.params.user_id,
				is_ban: !this.profile.userIsBaned,
			};

			const baned = await users.banUser(data);

			if (baned === 200) {
				location.reload();
			} else {
				this.toast.error("Ошибка, попробуйте позже");
			}
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
