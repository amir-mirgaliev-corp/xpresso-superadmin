<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<div class="modal__icon">
					<i class="fi fi-rr-cross-circle"></i>
				</div>

				<h2 class="text-center mb-4 text-2xl">Отмена заказа</h2>

				<CustomSelect v-model="reason" label="Выберите причину:" :options="reasons" />

				<div class="modal__actions grid grid-cols-2 gap-4 mt-6">
					<CustomButton class="h-12" :disabled="!reason" @click="cancelOrder">Отменить заказ</CustomButton>
					<CustomButton class="h-12" @click="$emit('close')" type="secondary-filled">Закрыть</CustomButton>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import CustomSelect from "@/components/shared/ui/CustomSelect.vue";

import orders from "@/api/orders";

export default {
	emits: ["close"],

	data() {
		return {
			reasons,
			reason: null,
		};
	},

	methods: {
		async cancelOrder() {
			const response_status = await orders.cancelOrder(this.$route.params.order_id, this.reason.title);
			if (response_status === 200) location.reload();
		},
	},

	components: {
		CustomButton,
		CustomSelect,
	},
};

const reasons = [
	{ id: 0, name: "reason-1", title: "Причина 1" },
	{ id: 1, name: "reason-2", title: "Причина 2" },
	{ id: 2, name: "reason-2", title: "Причина 3" },
];
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
