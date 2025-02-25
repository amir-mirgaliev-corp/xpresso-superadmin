<template>
	<section class="flex bg-[#F7F7F7] w-full h-full">
		<Sidebar />

		<section class="w-[calc(100%-60px)] max-w-mainContent p-[0_auto]">
			<Navbar />

			<main class="p-[30px] max-lg:p-[16px] h-section bg-[#F7F7F7] overflow-x-clip overflow-y-auto">
				<Router-view />
			</main>
		</section>
	</section>

	<Notifications />
</template>

<script>
import Notifications from "@/components/pages/orders/Notifications.vue";
import Sidebar from "@/components/layouts/content_layout/Sidebar.vue";
import Navbar from "@/components/layouts/content_layout/Header.vue";

export default {
	components: {
		Sidebar,
		Navbar,
		Notifications,
	},

	watch: {
		$route: {
			deep: true,
			handler() {
				const page = this.$route.meta.page;
				document.title = `Expresso ${page}`;
			},
		},
	},
};
</script>
