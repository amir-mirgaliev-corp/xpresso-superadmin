<template>
	<div v-if="checkboxId" class="custom-checkbox" :class="`custom-checkbox--${size}`">
		<input
			type="checkbox"
			class="custom-checkbox__input"
			:id="checkboxId"
			:checked="isChecked"
			@change="toggleCheckbox"
		/>

		<label :for="checkboxId" class="custom-checkbox__icon">
			<i v-if="isChecked" class="fi fi-rr-check"></i>
		</label>

		<span class="custom-checkbox__label" :class="{ 'cursor-pointer': mode === 'list' }" @click="toggleCheckbox">
			<slot></slot>

			<slot name="detail"></slot>
		</span>
	</div>
</template>

<script>
export default {
	name: "CustomCheckbox",

	props: {
		modelValue: {
			type: [Boolean, Array],
			required: true,
		},
		value: {
			type: String,
			default: "",
		},
		mode: {
			type: String,
			default: "boolean",
		},
		size: {
			type: String,
			default: "sm",
		},
	},

	data() {
		return {
			checkboxId: `checkbox-${crypto.randomUUID()}`,
		};
	},

	computed: {
		isChecked() {
			if (this.mode === "boolean") {
				return this.modelValue;
			} else if (this.mode === "list") {
				return this.modelValue.includes(this.value);
			}
		},
	},

	methods: {
		toggleCheckbox() {
			if (this.mode === "list") {
				const newValue = this.modelValue.includes(this.value)
					? this.modelValue.filter(item => item !== this.value)
					: [...this.modelValue, this.value];
				this.$emit("update:modelValue", newValue);
			}
		},
	},
};
</script>

<style lang="scss">
.custom-checkbox {
	display: flex;
	align-items: flex-start;
	&__input {
		display: none;
		&:checked + .custom-checkbox__icon {
			background-color: $primary;
			border-color: $primary;
			color: $white;
		}
	}
	&__icon {
		@include flex-center;
		flex-shrink: 0;
		border: 1px solid #aaa;
		border-radius: 0.25rem;
		transition: all 0.2s ease;
		cursor: pointer;
	}
	&__label {
		font-weight: normal;
		color: #000;
		a {
			text-decoration: underline;
			text-decoration-skip-ink: none;
		}
	}

	&--sm {
		gap: 0.5rem;
		.custom-checkbox__icon {
			width: 1.25rem;
			height: 1.25rem;
			& > i {
				font-size: 0.625rem;
			}
		}

		.custom-checkbox__label {
			font-size: 0.875rem;
		}
	}

	&--lg {
		gap: 0.75rem;
		.custom-checkbox__icon {
			width: 1.5rem;
			height: 1.5rem;
			& > i {
				font-size: 0.75rem;
			}
		}

		.custom-checkbox__label {
			font-size: 1rem;
		}
	}
}
</style>
