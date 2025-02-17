<template>
	<section class="news">
		<Tabs :initial-tab="initialTab">
			<Tab name="publications" title="Публикации"><Publications /></Tab>
			<Tab name="push" title="PUSH уведомления"><PushNotifications /></Tab>
		</Tabs>
	</section>
</template>

<script>
import Tabs from "@/components/shared/ui/Tabs.vue";
import Tab from "@/components/shared/ui/Tab.vue";
import Publications from "@/components/pages/news/Publications.vue";
import PushNotifications from "@/components/pages/news/PushNotifications.vue";

export default {
	data() {
		return {
			initialTab: "publications",
		};
	},

	components: {
		Tabs,
		Tab,
		Publications,
		PushNotifications,
	},

	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},
};
</script>
