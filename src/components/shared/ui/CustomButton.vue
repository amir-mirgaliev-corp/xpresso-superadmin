<template>
	<button :class="buttonClass" :disabled="disabled" :type="btnType">
		<div v-if="loading" class="btn-preloader"><span></span></div>
		<i v-else-if="!loading && icon" :class="iconClass"></i>
		<slot></slot>
	</button>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: "primary",
		},
		btnType: {
			type: String,
		},
		icon: {
			type: String,
			default: "",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		iconClass() {
			return `fi ${this.icon}`;
		},
		buttonClass() {
			let btnClass = `btn btn-${this.type}`;
			if (this.loading) btnClass = `btn btn-${this.type} btn--loading`;
			return btnClass;
		},
	},
};
</script>

<style lang="scss" scoped>
.btn {
	@include flex-center;
	gap: 0.5rem;
	position: relative;
	width: 100%;
	border-radius: 0.5rem;
	outline: none;
	line-height: 1;
	padding: 0.75rem 1rem;
	border: 2px solid transparent;
	font-weight: 500;
	transition: $transition;
	z-index: 1;
	user-select: none;
	cursor: pointer;
	overflow: hidden;
	&::before {
		content: "";
		position: absolute;
		background-color: rgba($color: $black, $alpha: 0.05);
		border: 2px solid transparent;
		top: 100%;
		width: 100%;
		height: 100%;
		z-index: -1;
		transition: top 0.08s ease-in;
		border-radius: 0;
	}
	&.width-fit {
		width: fit-content;
	}
	&.radius-75 {
		border-radius: 0.75rem;
	}
	&.orange {
		background-color: orange;
	}
	&.purple {
		background-color: $purple;
	}
	&.blue {
		background-color: $blue;
	}
	&:disabled {
		opacity: 0.325;
		pointer-events: none;
		cursor: default;
	}
	&-primary {
		background-color: $primary;
		border: none;
		color: $white;
		&:hover {
			&::before {
				top: 0;
			}
		}
	}
	&-secondary {
		border-color: #d0d5dd;
		color: #344054;
		&-filled {
			background-color: #e1e1e1;
			color: #404040;
		}
		&-red {
			border-color: $primary;
			color: $primary;
		}
	}
	&--loading {
		cursor: default;
		pointer-events: none;
		opacity: 0.75;
	}
	&-preloader {
		@include flex-center;
		height: 100%;
		text-align: center;
		span {
			width: 1.25rem;
			height: 1.25rem;
			border: 2px solid #fff;
			border-bottom-color: transparent;
			border-radius: 50%;
			box-sizing: border-box;
			animation: rotation 1s linear infinite;
			display: inline-block;
			margin-right: 0.5rem;
		}
	}
	& > i {
		font-size: 1rem;
	}
	&.rotate-icon {
		i {
			transform: rotate(180deg);
		}
	}
	@media screen and (max-width: 480px) {
		font-size: 0.875rem;
		height: 3.25rem;
		& > i {
			font-size: 0.875rem;
			height: 0.875rem;
		}
	}
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
