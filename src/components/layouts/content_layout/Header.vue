<template>
	<header class="header h-16 min-w-full bg-white border-b-[1px] p-[0_30px] flex items-center">
		<div class="header__container flex justify-between items-center w-full">
			<div class="header__page w-[400px]">
				<h1 class="header__title font-semibold text-[20px]">{{ $route.meta.page }}</h1>
			</div>

			<div class="header__content flex justify-end items-center gap-4">
				<HeaderSearch v-if="showSearch" />

				<HeaderProfile />
			</div>
		</div>
	</header>
</template>

<script>
import HeaderProfile from "./header-ui/HeaderProfile.vue";
import HeaderSearch from "./header-ui/HeaderSearch.vue";

export default {
	components: {
		HeaderProfile,
		HeaderSearch,
	},

	computed: {
		showSearch() {
			const pagesWithSearch = [
				"orders",
				"clients",
				"user-profile",
				"transport",
				"restaurants",
				"chains",
				"restaurants-chain",
				"restaurants-menu",
				"transactions",
			];

			return pagesWithSearch.includes(this.$route.name);
		},
	},
};
</script>
