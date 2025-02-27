<template>
	<Tabs :initial-tab="initialTab">
		<Tab name="profile" title="Профиль"><SettingsProfile /></Tab>
		<Tab name="comission" title="Комиссия"><SettingsCommission /></Tab>
		<Tab name="hotline" title="Горячая линия"><SettingsHotline /></Tab>
	</Tabs>
</template>

<script>
import Tab from "@/components/shared/ui/Tab.vue";
import Tabs from "@/components/shared/ui/Tabs.vue";
import SettingsProfile from "./components/SettingsProfile.vue";
import SettingsCommission from "./components/SettingsCommission.vue";
import SettingsHotline from "./components/SettingsHotline.vue";

export default {
	data: () => ({
		initialTab: "profile",
	}),

	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},

	components: {
		Tabs,
		Tab,
		SettingsProfile,
		SettingsCommission,
		SettingsHotline,
	},
};
</script>
