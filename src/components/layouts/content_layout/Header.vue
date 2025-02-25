<template>
	<header class="header h-16 min-w-full bg-white border-b-[1px] p-[0_30px] max-lg:p-[0_16px] flex items-center">
		<button class="mr-3 text-[#F6350D]" @click="setIsSidebarShown(!getIsSidebarShown)">
			<i class="fi fi-sr-angle-square-left text-2xl" v-if="getIsSidebarShown"></i>
			<i class="fi fi-sr-angle-square-right text-2xl" v-else></i>
		</button>
		<div class="header__container flex justify-between items-center w-full max-lg:gap-x-2">
			<div class="header__page w-[400px] max-2xl:w-[300px] max-lg:w-max">
				<h1 class="header__title font-semibold text-[20px] max-lg:text-lg">{{ $route.meta.page }}</h1>
			</div>

			<div class="header__content flex justify-end items-center gap-4">
				<HeaderSearch v-if="showSearch && screenWidth > 640" />

				<HeaderProfile />
			</div>
		</div>
	</header>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import HeaderProfile from "./header-ui/HeaderProfile.vue";
import HeaderSearch from "./header-ui/HeaderSearch.vue";

export default {
	components: {
		HeaderProfile,
		HeaderSearch,
	},

	computed: {
		...mapGetters(["getIsSidebarShown"]),
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
		screenWidth() {
			return window.screen.width;
		},
	},
	methods: {
		...mapMutations(["setIsSidebarShown"]),
	},
};
</script>
