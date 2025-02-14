<template>
	<section class="user">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<Tabs :initial-tab="initialTab">
			<Tab name="profile" title="Личный профиль"><ClientProfile /></Tab>
			<Tab name="orders" title="История заказов"><TotalOrders /></Tab>
			<Tab name="recent-actions" title="Действия"><RecentActions /></Tab>
		</Tabs>
	</section>
</template>

<script>
import ClientProfile from "@/components/pages/edit/ClientProfile.vue";
import RecentActions from "@/components/pages/edit/RecentActions.vue";
import TotalOrders from "@/components/pages/edit/TotalOrders.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import Tabs from "@/components/shared/ui/Tabs.vue";
import Tab from "@/components/shared/ui/Tab.vue";

export default {
	data() {
		return {
			initialTab: null,
		};
	},

	components: {
		ClientProfile,
		TotalOrders,
		RecentActions,
		CustomButton,
		Tabs,
		Tab,
	},

	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},
};
</script>
