<template>
	<div class="chain-page">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/chains')">
			Назад
		</CustomButton>

		<Tabs :initial-tab="initialTab" v-if="screenWidth > 640">
			<Tab name="info" title="Информация"><ChainInfo /></Tab>
			<Tab name="branches" title="Филиалы"><ChainBranches /></Tab>
			<Tab name="categories" title="Категории"><ChainCategories /></Tab>
			<Tab name="additives" title="Добавки"><ChainAdditives /></Tab>
		</Tabs>
		<template v-else>
			<CustomSelect
				:options="tabsList"
				selectClass="w-[240px] h-[46px] bg-white max-sm:w-full"
				placeholder="Выберите тип контента"
				queryName="tab"
				@update:model-value="console.log($event)"
				v-model:model-value="activeTab"
			/>
			<div class="mt-3">
				<ChainInfo v-if="activeTab === 'info'" />
				<ChainBranches v-if="activeTab === 'branches'" />
				<ChainCategories v-if="activeTab === 'categories'" />
				<ChainAdditives v-if="activeTab === 'additives'" />
			</div>
		</template>
	</div>
</template>

<script>
import Tabs from "@/components/shared/ui/Tabs.vue";
import Tab from "@/components/shared/ui/Tab.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

import ChainInfo from "./tabs/ChainInfo.vue";
import ChainBranches from "./tabs/ChainBranches.vue";
import ChainCategories from "./tabs/ChainCategories.vue";
import ChainAdditives from "./tabs/ChainAdditives.vue";
import ChainMenu from "./tabs/ChainMenu.vue";
import ChainAdmins from "./tabs/ChainAdmins.vue";
import CustomSelect from "@/components/shared/ui/CustomSelect.vue";

export default {
	data: () => ({
		initialTab: null,
		activeTab: "info",
		tabsList,
	}),

	components: {
		Tabs,
		Tab,
		CustomButton,
		ChainInfo,
		ChainBranches,
		ChainCategories,
		ChainAdditives,
		ChainMenu,
		ChainAdmins,
		CustomSelect
	},

	computed: {
		screenWidth() {
			return window.screen.width;
		},
	},

	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},
};
const tabsList = [
	{
		title: "Информация",
		name: "info",
	},
	{
		title: "Филиалы",
		name: "branches",
	},
	{
		title: "Категории",
		name: "categories",
	},
	{
		title: "Добавки",
		name: "additives",
	},
];
</script>
