<template>
	<Transition name="slide-left">
		<div v-if="showNotifications" class="notifications drop-shadow-2xl" ref="target">
			<div class="flex justify-between items-center mb-6">
				<h3 class="text-xl text-bold">Уведомления</h3>

				<CustomButton class="width-fit" icon="fi-rr-trash" @click="clear">Очистить</CustomButton>
			</div>

			<div v-if="notifications.length" class="notifications__list h-full overflow-y-auto">
				<div
					v-for="(notif, index) in notifications"
					:key="index"
					class="notification-wrapper"
					@click.selft="goToOrderPage(notif.order_id)"
				>
					<span class="notification-time">{{ formatDate(notif.time, true) }}</span>

					<div :class="`notification ${notif.type}`">
						<div class="notification__icon">
							<i :class="['fi', notif.type === 'new' ? 'fi-tr-coffee' : 'fi-sr-cross-circle']"></i>
						</div>

						{{ notif.text }}
					</div>
				</div>
			</div>

			<p v-else class="mt-4">Нет Уведомлений</p>
		</div>
	</Transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useSocket } from "@/composables/useSockets";
import { onClickOutside } from "@vueuse/core";
import { formatDate } from "@/utils/formatDate";

import CustomButton from "@/components/shared/CustomButton.vue";

const { notifications } = useSocket("https://api.expresso.uz");

const router = useRouter();

const target = ref(null);
const showNotifications = ref(false);

onClickOutside(target, () => (showNotifications.value = false));

const goToOrderPage = id => {
	showNotifications.value = false;
	router.push(`/order/${id}`);
};

const clear = () => {
	notifications.value = [];
	setTimeout(() => {
		showNotifications.value = false;
	}, 500);
};

watch(
	notifications,
	() => {
		if (!showNotifications.value) showNotifications.value = true;
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped>
.notifications {
	@include flex-column;
	position: fixed;
	top: 0;
	right: 0;
	width: 400px;
	height: 100%;
	background-color: $white;
	z-index: 5;
	padding: 1.25rem 1rem;
}
.notification {
	@include flex-center-vert;
	gap: 1rem;
	margin-bottom: 1rem;
	padding: 1rem 1rem;
	border-radius: 5px;
	background: #2c3e50;
	color: $white;
	animation: fadeIn 0.5s ease-in-out;
	border-radius: 0.75rem;
	font-weight: 500;
	font-size: 1.125rem;
	width: 100%;
	cursor: pointer;
	&__icon {
		@include flex-center;
		width: 3rem;
		height: 3rem;
		flex-shrink: 1;
		border-radius: 0.675rem;
		background-color: $white;
		font-size: 1.5rem;
	}
	&-time {
		display: block;
		color: #c5c5c5;
		font-weight: 400;
		margin-bottom: 0.25rem;
		font-size: 0.875rem;
	}
	&.new {
		background-color: #14cc14;
		.notification__icon {
			color: $black;
		}
	}
	&.cancel {
		background-color: $primary;
		.notification__icon {
			color: $primary;
		}
	}
}
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.slide-left-enter-active,
.slide-left-leave-active {
	transition: all 1s ease-in-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
	right: -100%;
}
</style>
