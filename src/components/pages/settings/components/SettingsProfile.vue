<template>
	<section class="bg-white p-[24px] rounded-[12px] border-[1px] shadow-drop">
		<h2 class="table-title">Профиль администратора</h2>

		<div class="avatar mb-6">
			<img src="@/assets/images/default_avatar.svg" class="w-24 drop-shadow-sm" alt="avatar" />
		</div>

		<form class="form max-w-[400px]">
			<fieldset class="grid gap-4" disabled>
				<div class="form__field">
					<label for="admin-profile-name" class="form__label">Имя:</label>
					<input v-model="profile.name" type="text" id="admin-profile-name" class="form__input" readonly />
				</div>

				<div class="form__field">
					<label for="admin-profile-surname" class="form__label">Фамилия:</label>
					<input
						v-model="profile.lastName"
						type="text"
						id="admin-profile-surname"
						class="form__input"
						readonly
					/>
				</div>

				<div class="form__field">
					<label for="admin-profile-login" class="form__label">Логин:</label>
					<input v-model="profile.login" type="text" id="admin-profile-login" class="form__input" readonly />
				</div>
			</fieldset>
		</form>

		<div class="mt-6">
			<CustomButton icon="fi-rr-lock" class="h-12 width-fit orange" @click="openModal">
				Изменить пароль
			</CustomButton>
		</div>
	</section>

	<NewPasswordModal
		v-if="newPasswordModalOpen"
		old-password-required
		:error="error"
		@submit="handleSubmit"
		@close="closeModal"
	/>
</template>

<script>
import NewPasswordModal from "@/components/shared/modals/NewPasswordModal.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { mapGetters, mapActions } from "vuex";

import auth from "@/api/auth";

export default {
	data() {
		return {
			newPasswordModalOpen: false,
			error: "",
			profile: {
				name: "",
				lastName: "",
				login: "",
			},
		};
	},

	computed: {
		...mapGetters(["getProfile"]),
	},

	methods: {
		...mapActions(["fetchProfile"]),

		async handleSubmit(data) {
			this.error = "";

			const response_status = await auth.changePassword(data);

			if (response_status === 200) {
				this.fetchProfile();
				this.closeModal();
			} else if (response_status === 400) {
				this.error = "invalid_old_password";
			}
		},

		openModal() {
			this.newPasswordModalOpen = true;
		},

		closeModal() {
			this.newPasswordModalOpen = false;
		},
	},

	watch: {
		getProfile: {
			deep: true,
			immediate: true,
			handler(newProfile) {
				if (newProfile) {
					this.profile = newProfile;
				}
			},
		},
	},

	components: { CustomButton, NewPasswordModal },
};
</script>
