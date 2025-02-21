<template>
	<label class="switcher">
		<input
			type="checkbox"
			class="switcher__input"
			:checked="modelValue"
			:disabled="disabled"
			@change="$emit('update:modelValue', $event.target.checked)"
		/>
		<span class="switcher__slider"></span>
		<p class="switcher__label">{{ label }}</p>
	</label>
</template>

<script>
export default {
	name: "Switcher",
	emits: ["update:modelValue"],
	props: {
		modelValue: Boolean,
		label: String,
		disabled: Boolean,
	},
};
</script>

<style lang="scss" scoped>
.switcher {
	display: inline-flex;
	align-items: center;
	position: relative;
	user-select: none;
	cursor: pointer;

	&:has(input:disabled) {
		pointer-events: none;
		cursor: not-allowed;
		opacity: 0.5;
	}

	&__input {
		display: none;
	}

	&__slider {
		position: relative;
		width: 50px;
		height: 24px;
		inset: 0;
		background: #ccc;
		border-radius: 34px;
		transition: background-color 0.25s ease-in;
		&::before {
			content: "";
			position: absolute;
			width: 20px;
			height: 20px;
			left: 2px;
			bottom: 2px;
			background-color: $white;
			border-radius: 50%;
			transition: all 0.15s ease-in;
		}
	}

	&__label {
		margin-left: 0.5rem;
	}

	&__input:checked + &__slider {
		background-color: $primary;
	}

	&__input:checked + &__slider::before {
		transform: translateX(26px);
	}
}
</style>
