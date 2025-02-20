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

	<NewPasswordModal v-if="newPasswordModalOpen" @close="closeModal" old-password-required />
</template>

<script>
import NewPasswordModal from "@/components/shared/modals/NewPasswordModal.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { mapGetters } from "vuex";

export default {
	data() {
		return {
			newPasswordModalOpen: false,
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
