<template>
	<form role="search" class="search-form">
		<input
			type="search"
			class="search-form__input"
			v-model="searchQuery"
			:placeholder="placeholder"
			@input="debouncedSearch"
		/>

		<span class="search-form__icon">
			<i v-if="!searchQuery" class="fi fi-rr-search"></i>
			<i v-else class="fi fi-rr-cross-small search-form__clear text-xl" @click="clearSearch"></i>
		</span>
	</form>
</template>

<script>
import { useDebounceFn } from "@vueuse/core";

export default {
	props: {
		modelValue: String,
		placeholder: {
			type: String,
			default: "Поиск",
		},
	},

	data() {
		return {
			searchQuery: "",
			debouncedSearch: null,
		};
	},

	methods: {
		handleSearch() {
			this.$emit("update:model-value", this.searchQuery);
		},

		clear() {
			this.searchQuery = "";
			this.$emit("update:model-value", this.searchQuery);
		},
	},

	created() {
		this.debouncedSearch = useDebounceFn(this.handleSearch, 250);
	},
};
</script>

<style lang="scss" scoped>
.search-form {
	position: relative;
	display: block;
	width: 300px;
	height: 42px;
	&__input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		border: 1px solid #cdcdcd;
		border-radius: 0.5rem;
		background-color: transparent;
		padding: 0.75rem 2.75rem 0.75rem 1.25rem;
		font-size: 1rem;
		color: $black;
		outline: none;
		appearance: none;
		transition: all 0.15s ease-in-out;
		&::placeholder {
			color: rgba($color: $black, $alpha: 0.5);
		}
		&:focus {
			border-color: $primary;
			& + .search__icon > i {
				color: $black;
			}
		}
	}
	&__icon {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		z-index: 2;
		& > i {
			color: #cdcdcd;
			transition: all 0.15s ease-in-out;
		}
	}
	&__clear {
		cursor: pointer;
	}
}
</style>
