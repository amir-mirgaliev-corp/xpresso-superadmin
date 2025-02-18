<template>
	<div class="branch">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<Tabs :initial-tab="initialTab">
			<Tab name="info" title="Информация"><BranchInfo /></Tab>
			<Tab name="admins" title="Администраторы"><BranchAdmins /></Tab>
		</Tabs>
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import BranchInfo from "./tabs/BranchInfo.vue";
import BranchAdmins from "./tabs/BranchAdmins.vue";
import Tabs from "@/components/shared/ui/Tabs.vue";
import Tab from "@/components/shared/ui/Tab.vue";

export default {
	data() {
		return {
			initialTab: null,
		};
	},

	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},

	components: {
		CustomButton,
		Tabs,
		Tab,
		BranchInfo,
		BranchAdmins,
	},
};
</script>
