<template>
	<div class="chain-page">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/chains')">
			Назад
		</CustomButton>

		<Tabs :initial-tab="initialTab">
			<Tab name="info" title="Информация"><ChainInfo /></Tab>
			<Tab name="branches" title="Филиалы"><ChainBranches /></Tab>
			<Tab name="categories" title="Категории"><ChainCategories /></Tab>
		</Tabs>
	</div>
</template>

<script>
import Tabs from "@/components/shared/ui/Tabs.vue";
import Tab from "@/components/shared/ui/Tab.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import ChainInfo from "./tabs/ChainInfo.vue";
import ChainBranches from "./tabs/ChainBranches.vue";
import ChainCategories from "./tabs/ChainCategories.vue";
import ChainMenu from "./tabs/ChainMenu.vue";
import ChainAdmins from "./tabs/ChainAdmins.vue";

export default {
	data: () => ({
		initialTab: null,
	}),

	components: {
		Tabs,
		Tab,
		CustomButton,
		ChainInfo,
		ChainBranches,
		ChainCategories,
		ChainMenu,
		ChainAdmins,
	},

	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},
};
</script>
