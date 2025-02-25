<template>
	<div class="custom-select-wrapper max-sm:w-full" ref="target">
		<p v-if="label" class="custom-select__label" v-text="label" />

		<div
			class="custom-select"
			:class="{
				[selectClass]: selectClass,
				'custom-select--focus': isOpen,
				disabled: disabled,
			}"
		>
			<!-- Selected option -->
			<div
				class="custom-select__selected"
				:class="{
					'custom-select__selected--open': isOpen,
					'custom-select__selected--active': selectedValue,
					'custom-select__selected--error': showError,
				}"
				@click="toggleDropdown"
			>
				{{ selectedValue || placeholder }}
				<i class="fi fi-rs-angle-down"></i>
			</div>

			<!-- Dropdown options -->
			<Teleport to="body">
				<div v-if="isOpen" class="custom-select__dropdown" :style="dropdownStyles" ref="dropdown">
					<div
						v-for="(item, i) in computedOptions"
						:key="i"
						class="custom-select__item"
						@click="selectItem(item)"
					>
						{{ item.title ?? item.name }}
					</div>
				</div>
			</Teleport>
		</div>

		<span v-if="errorMessage" class="form__field-error">{{ errorMessage }}</span>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const dropdown = ref(null);
const isOpen = ref(false);
const target = ref(null);

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
	modelValue: {
		type: Object || null,
		required: false,
	},
	queryName: {
		type: String || null,
		required: false,
		default: null,
	},
	label: {
		type: String,
		required: false,
	},
	placeholder: {
		type: String,
		required: false,
		default: "Выберите",
	},
	selectClass: {
		type: String,
		required: false,
	},
	options: {
		type: Array,
		required: true,
		default: () => [],
	},
	sort: {
		type: Boolean,
		required: false,
		default: false,
	},
	sort_options: {
		type: Array,
		default: () => [
			{ id: 0, name: "ASC", title: "По возрастанию" },
			{ id: 1, name: "DESC", title: "По убыванию" },
		],
	},
	disabled: {
		type: Boolean,
		required: false,
	},
	showError: Boolean,
	errorMessage: String,
});

const selectedValue = ref(null);

const updateSelectedValue = () => {
	const queryValue = route.query[props.queryName];

	if (queryValue) {
		let option;

		if (props.sort) {
			option = props.sort_options.find(item => item.name === queryValue);
		} else {
			option = props.options.find(item => item.name === queryValue);
		}

		selectedValue.value = option ? option.title || option.name : "";
	} else if (props.modelValue) {
		selectedValue.value = props.modelValue?.title;
	} else {
		selectedValue.value = "";
	}
};

if (props.queryName) {
	watch(() => route.query[props.queryName], updateSelectedValue, { immediate: true });
} else {
	watch(() => props.modelValue, updateSelectedValue, { immediate: true, deep: true });
}

watch(
	() => props.options,
	newOptions => {
		if (newOptions.length) {
			updateSelectedValue();
		}
	},
	{ immediate: true, deep: true },
);

const selectItem = item => {
	isOpen.value = false;

	if (props.queryName) {
		router.replace({ query: { ...route.query, [props.queryName]: item.name } });
	}
	emit("update:modelValue", item.name);
};

const computedOptions = computed(() => (props.sort ? props.sort_options : props.options));

const dropdownStyles = ref({
	top: "0px",
	left: "0px",
	width: "auto",
});

const updateDropdownPosition = () => {
	if (target.value && dropdown.value) {
		const { top, left, width, height } = target.value.getBoundingClientRect();
		dropdownStyles.value = {
			top: `${top + height + window.scrollY}px`,
			left: `${left + window.scrollX}px`,
			width: `${width}px`,
		};
	}
};

const toggleDropdown = async () => {
	isOpen.value = !isOpen.value;

	if (isOpen.value) {
		await nextTick();
		updateDropdownPosition();
	}
};

onClickOutside(target, () => (isOpen.value = false));

onMounted(() => {
	if (props.queryName) {
		updateSelectedValue();
	}

	window.addEventListener("scroll", updateDropdownPosition);
	window.addEventListener("resize", updateDropdownPosition);
});

onUnmounted(() => {
	window.removeEventListener("scroll", updateDropdownPosition);
	window.removeEventListener("resize", updateDropdownPosition);
});
</script>

<style lang="scss" scoped>
.custom-select {
	position: relative;
	text-align: left;
	outline: none;
	border-radius: 0.5rem;
	&.disabled {
		pointer-events: none;
		.custom-select__selected {
			background-color: rgba(239, 239, 239, 0.3);
		}
	}
	&--focus {
		.custom-select__selected,
		.custom-select__items,
		.custom-select__item {
			color: $black;
			border-color: #c5c5c5 !important;
		}
	}
	&__label {
		margin: 0 0 0.25rem 0;
	}
	&__selected {
		@include flex-center-vert;
		border-radius: inherit;
		border: 1px solid #e5e9eb;
		padding: 0.75rem 1rem;
		user-select: none;
		position: relative;
		line-height: 1;
		font-weight: 500;
		cursor: pointer;
		color: #9aa6ac;
		height: 100%;
		& > i {
			position: absolute;
			top: 50%;
			right: 0.75rem;
			transform: translateY(-50%);
			font-size: 1rem;
			transition: 0.2s;
		}
		&--open {
			border-radius: 0.5rem 0.5rem 0 0;
			& > i {
				transform: translateY(-50%) rotate(180deg);
			}
		}
		&--active {
			color: $black;
		}
		&--error {
			border-color: $primary;
			color: $primary;
		}
	}
	&__dropdown {
		position: absolute;
		z-index: 9999;
		background: $white;
		border: 1px solid #e5e9eb;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 0 0 0.5rem 0.5rem;
		border-top: none;
		overflow: hidden;
		max-height: 200px;
		overflow-y: auto;
		&--hidden {
			display: none;
		}
		&::-webkit-scrollbar {
			display: block;
			width: 12px;
		}
		&::-webkit-scrollbar-track {
			opacity: 0;
		}
		&::-webkit-scrollbar-thumb {
			height: 3rem;
			border: 4px solid rgba(0, 0, 0, 0);
			background-clip: padding-box;
			border-radius: 9999px;
			background-color: #eaecf0;
		}
	}
	&__item {
		padding: 0.75rem 1rem;
		cursor: pointer;
		user-select: none;
		&:hover {
			background-color: rgba(229, 233, 235, 0.5);
		}
	}
}
</style>
