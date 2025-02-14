<template>
	<div class="actions-list" ref="target">
		<button class="actions-list__button bg-neutral-200" @click.stop="toggleMenu">
			<i class="fi fi-bs-menu-dots"></i>
		</button>

		<teleport to="body">
			<ul v-if="isMenuOpen" class="actions-list__menu" :style="menuPosition">
				<li
					v-for="(action, index) in actions"
					:key="index"
					class="actions-list__item"
					:class="action.name"
					@click.stop="handleAction(action)"
				>
					<i :class="['fi', action.icon]"></i>
					{{ action.title }}
				</li>
			</ul>
		</teleport>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
	actions: {
		type: Array,
		required: true,
		default: () => [],
	},
});

const emit = defineEmits(["action"]);
const isMenuOpen = ref(false);
const target = ref(null);
const menuPosition = ref({});

onMounted(() => {
	window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleResize);
});

onClickOutside(target, () => (isMenuOpen.value = false));

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
	if (isMenuOpen.value) updateMenuPosition();
};

const updateMenuPosition = () => {
	const rect = target.value.getBoundingClientRect();
	const menuWidth = window.innerWidth <= 480 ? 120 : 150;
	const rightSpace = window.innerWidth - (rect.left + menuWidth);

	menuPosition.value = {
		top: `${rect.bottom + window.scrollY + 7}px`,
		left: rightSpace > 0 ? `${rect.left + window.scrollX}px` : `${rect.left + window.scrollX - menuWidth}px`,
	};
};

const handleAction = action => {
	emit("action", action.name);
	isMenuOpen.value = false;
};

const handleResize = () => {
	if (isMenuOpen.value) updateMenuPosition();
};
</script>

<style lang="scss" scoped>
.actions-list {
	position: relative;
	display: inline-block;
	&__button {
		@include flex-center;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 0.375rem;
	}
	&__menu {
		position: absolute;
		background-color: $white;
		border: 1px solid $gray;
		border-radius: 0.5rem;
		list-style: none;
		margin: 0;
		z-index: 10;
		min-width: 150px;
		padding: 0;
		@media screen and (max-width: 480px) {
			border-radius: 0.5rem;
			border-width: 1px;
			min-width: 120px;
		}
	}

	&__item {
		@include flex-center-vert;
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.75rem;
		cursor: pointer;
		transition: $transition;
		& > i {
			font-size: 1rem;
			height: 1rem;
			margin-right: 0.5rem;
		}
		&.delete,
		&.block {
			color: $primary;
		}
		&:first-child {
			border-radius: 0.75rem 0.75rem 0 0;
		}
		&:last-child {
			border-radius: 0 0 0.75rem 0.75rem;
		}
		&:hover {
			background-color: #f1f1f1;
		}
	}
	@media screen and (max-width: 480px) {
		&__button {
			padding: 0.5rem;
			border-radius: 0.375rem;
			i {
				font-size: 1rem;
				height: 1rem;
			}
		}
		&__item {
			padding: 0.87rem 0.75rem;
			font-size: 0.75rem;
			i {
				font-size: 0.875rem;
				width: 0.875rem;
				height: 0.875rem;
			}
		}
	}
}
</style>
