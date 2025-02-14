<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<div class="modal__icon">
					<i :class="['fi', icon]"></i>
				</div>

				<h2 class="text-center mb-8 text-2xl" v-text="title" />

				<p v-if="message" class="modal__message" v-text="message" />

				<div class="modal__actions grid grid-cols-2 gap-4">
					<CustomButton class="h-12" @click="$emit('confirm')">{{ confirmText }}</CustomButton>
					<CustomButton class="h-12" @click="$emit('close')" type="secondary-filled">Отменить</CustomButton>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";

export default {
	emits: ["confirm", "close"],
	props: {
		icon: {
			type: String,
			default: "fi-sr-trash",
		},
		title: {
			type: String,
			default: "Уверены, что хотите удалить?",
		},
		confirmText: {
			type: String,
			default: "Удалить",
		},
	},
	components: {
		CustomButton,
	},
};
</script>

<style lang="scss" scoped>
.modal {
	&__icon {
		background-color: rgba($color: #e73b36, $alpha: 0.2);
		& > i {
			color: $primary;
		}
	}
}
</style>
