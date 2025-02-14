<template>
	<div v-if="profile" ref="profileTrigger" class="header__profile" @click="toggleProfileDropdown">
		<div class="header__profile-wrapper">
			<div class="header__profile-avatar">
				<img src="@/assets/images/default_avatar.svg" alt="Avatar" class="profile__avatar-img" />
			</div>

			<div class="header__profile-info">
				<h2 class="header__profile-name">{{ profileFullName }}</h2>
				<p class="header__profile-role">{{ profile.role.name }}</p>
			</div>

			<div class="header__profile-arrow">
				<i
					class="fi fi-rr-angle-small-down transition-all duration-200"
					:class="profileDropdown ? 'rotate-180' : 'rotate-0'"
				></i>
			</div>

			<div class="header__profile-dropdown drop-shadow-lg" ref="profileDropdown">
				<Transition name="fade">
					<div v-if="profileDropdown" class="dropdown">
						<ul class="dropdown__list">
							<li class="dropdown__item">
								<a :href="`tel:${profile.phone}`">
									<i class="fi fi-rr-user"></i>
									{{ profileFullName }}
								</a>
							</li>

							<li class="dropdown__item">
								<router-link to="/settings">
									<i class="fi fi-rr-settings"></i>
									Настройки
								</router-link>
							</li>

							<li class="dropdown__item logout" @click="logoutModalOpen = true">
								<div>
									<i class="fi-ss-sign-out-alt"></i>
									Выйти
								</div>
							</li>
						</ul>
					</div>
				</Transition>
			</div>
		</div>
	</div>

	<DangerModal
		v-if="logoutModalOpen"
		icon="fi-rr-exclamation"
		title="Вы уверены что хотите выйти?"
		confirmText="Выйти"
		@confirm="logout"
		@close="logoutModalOpen = false"
	/>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

export default {
	data: () => ({
		profileDropdown: false,
		profile: null,
		logoutModalOpen: false,
	}),

	computed: {
		...mapGetters(["getProfile"]),

		profileFullName() {
			return this.profile.name + " " + this.profile.surname;
		},
	},

	methods: {
		...mapActions(["fetchProfile"]),

		toggleProfileDropdown() {
			this.profileDropdown = !this.profileDropdown;
		},

		closeProfileDropdown() {
			this.profileDropdown = false;
		},

		logout() {
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("accessToken");
			this.$router.push("/login");
		},

		handleClickOutside(e) {
			if (
				this.profileDropdown &&
				!this.$refs.profileDropdown.contains(e.target) &&
				!this.$refs.profileTrigger.contains(e.target)
			) {
				this.closeProfileDropdown();
			}
		},
	},

	async mounted() {
		await this.fetchProfile();
		this.profile = this.getProfile.admin;
		document.addEventListener("click", this.handleClickOutside);
	},

	beforeDestroy() {
		document.removeEventListener("click", this.handleClickOutside);
	},

	components: {
		DangerModal,
	},
};
</script>

<style lang="scss" scoped>
.header__profile {
	position: relative;
	&-wrapper {
		@include flex-center;
		gap: 0.5rem;
		cursor: pointer;
		padding: 0.5rem 1rem;
		transition: all 0.3s ease-in-out;
		border-radius: 0.75rem;
		&:hover {
			background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
		}
	}
	&-name {
		font-size: 0.875rem;
		font-weight: bold;
		color: #1d2939;
		line-height: 1;
		margin-bottom: 6px;
	}
	&-role {
		font-size: 0.75rem;
		color: #747474;
		line-height: 1;
	}
	&-dropdown {
		position: absolute;
		top: 60px;
		right: 0;
		z-index: 10;
		overflow: hidden;
	}
}

.dropdown {
	background-color: #fff;
	width: 250px;
	border-radius: 0.75rem;
	overflow: hidden;
	&__item {
		padding: 1rem;
		border-bottom: 1px solid #e5e5e5;
		transition: $transition;
		&:hover {
			background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
		}
		& > * {
			@include flex-center-vert;
			gap: 0.5rem;
			text-decoration: none;
			color: #1d2939;
			font-size: 0.875rem;
			& > i {
				font-size: 1.125rem;
			}
		}
		&.logout {
			& > * {
				color: $primary;
			}
			&:hover {
				background-color: rgba($color: $primary, $alpha: 0.1);
			}
		}
	}
}
</style>
