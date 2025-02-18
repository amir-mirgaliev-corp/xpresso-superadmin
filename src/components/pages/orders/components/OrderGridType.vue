<template>
	<div class="grid-type">
		<div
			class="grid-type__item"
			@click="$emit('setLayout', 'compact')"
			:class="{ active: activeLayout === 'compact' }"
		>
			<div class="grid-type__icon layout-grid"></div>
		</div>

		<div
			class="grid-type__item"
			@click="$emit('setLayout', 'vertical')"
			:class="{ active: activeLayout === 'vertical' }"
		>
			<div class="grid-type__icon layout-column"><span></span> <span></span> <span></span> <span></span></div>
		</div>

		<div class="grid-type__item" @click="$emit('setLayout', 'row')" :class="{ active: activeLayout === 'row' }">
			<div class="grid-type__icon layout-line"></div>
			<div class="grid-type__icon layout-line"></div>
		</div>
	</div>
</template>

<script>
export default {
	emit: ["setLayout"],
	props: {
		activeLayout: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.grid-type {
	@include flex-center-vert;
	gap: 1rem;
	width: fit-content;
	border: 1px solid #d0d5dd;
	border-radius: 0.5rem;
	background-color: $white;
	padding: 0.5rem 1rem;
	&__item {
		@include flex-center-column;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		border: 2px solid #d0d5dd;
		padding: 4px;
		cursor: pointer;
		&.active {
			border-color: $black;
			& > *:not(.layout-column) {
				background-color: $black;
			}
			& > .layout-column span {
				background-color: $black;
			}
		}
	}
	&__icon {
		&.layout-grid {
			background-color: #d0d5dd;
			width: 14px;
			height: 8px;
			border-radius: 2px;
		}
		&.layout-column {
			@include grid(2, 1px);
			width: 100%;
			height: 100%;
			& > span {
				display: block;
				background-color: #d0d5dd;
				border-radius: 1px;
			}
		}
		&.layout-line {
			background-color: #d0d5dd;
			width: 100%;
			height: 8px;
			border-radius: 2px;
			&:not(:last-child) {
				margin-bottom: 2px;
			}
		}
	}
}
</style>
