<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal schedule-modal">
				<h2 class="text-center text-2xl">Запланировать на:</h2>

				<p class="text-center font-bold my-4">{{ formattedDate }}</p>

				<VueDatePicker v-model="date" inline auto-apply="" />

				<CustomButton @click="save" class="h-12 mt-4">Сохранить</CustomButton>
			</div>
		</div>
	</teleport>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import { formatDate } from "@/utils/formatters/formatDate";

export default {
	emits: ["close"],
	components: { VueDatePicker, CustomButton },

	props: {
		modelValue: String,
	},

	data() {
		return {
			date: "",
		};
	},

	computed: {
		formattedDate() {
			return this.date ? formatDate(new Date(this.date).toISOString(), true) : "";
		},
	},

	methods: {
		save() {
			this.$emit("update:model-value", new Date(this.date).toISOString());
			this.$emit("close");
		},
	},

	mounted() {
		if (this.modelValue) {
			this.date = new Date(this.modelValue);
		}
	},
};
</script>

<style lang="scss">
.schedule-modal {
	max-width: 400px;
	.dp__theme_light {
		--dp-input-padding: 10px 16px 10px 32px;
		--dp-font-family: "Inter", serif;
		--dp-primary-color: #f6350d;
		--dp-action-buttons-padding: 0.5rem 1rem;
		--dp-action-button-height: 2.5rem;
		--dp-preview-font-size: 1rem;
		--dp-border-radius: 8px;
		width: 100%;
		& > *:last-child {
			width: 100%;
		}
	}
	.dp__action_buttons {
		flex: 0 0 50%;
	}
	.dp__action_button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 0;
	}
	.dp__selection_preview,
	.dp__action_cancel {
		display: none;
	}
	.dp__active_date:hover {
		background: var(--dp-primary-color);
		color: var(--dp-primary-text-color);
	}
	.dp--tp-wrap {
		width: 100%;
		max-width: 100%;
		& > button {
			height: 4rem;
		}
	}
}
</style>
