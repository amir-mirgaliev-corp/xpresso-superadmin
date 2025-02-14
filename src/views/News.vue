<template>
	<section class="orders">
		<Tabs :initial-tab="initialTab">
			<Tab name="publications" title="Публикации"><CreatePublications /></Tab>
			<Tab name="push" title="PUSH уведомления"><CreatePushNotifications /></Tab>
		</Tabs>
	</section>
</template>

<script>
import Tabs from "@/components/shared/Tabs.vue";
import Tab from "@/components/shared/Tab.vue";
import CreatePublications from "@/components/pages/news/CreatePublications.vue";
import CreatePushNotifications from "@/components/pages/news/CreatePushNotifications.vue";

export default {
	data() {
		return {
			initialTab: "publications",
		};
	},

	components: {
		Tabs,
		Tab,
		CreatePublications,
		CreatePushNotifications,
	},

	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},
};
</script>
