<template>
	<div>
		<Preloader v-if="showPreloader" />

		<div class="layout w-full">
			<component :is="layout">
				<Router-view />
			</component>
		</div>
	</div>
</template>

<script>
import Preloader from "./components/layouts/Preloader.vue";
import LoginLayout from "./layouts/LoginLayout.vue";
import ContentLayout from "./layouts/ContentLayout.vue";

export default {
	components: {
		Preloader,
		LoginLayout,
		ContentLayout,
	},

	data() {
		return {
			showPreloader: true,
		};
	},

	computed: {
		layout() {
			return `${this.$route.meta.layout}-layout`;
		},
	},

	mounted() {
		const MIN_PRELOAD_TIME = 1000;
		const startTime = Date.now();

		window.addEventListener("load", () => {
			const elapsedTime = Date.now() - startTime;
			const remainingTime = MIN_PRELOAD_TIME - elapsedTime;

			setTimeout(
				() => {
					this.showPreloader = false;
				},
				Math.max(remainingTime, 0),
			);
		});
	},
};
</script>
