<template>
	<Tabs :initial-tab="initialTab">
		<Tab name="avatars" title="Аватарки">
			<ContentAvatarsList />
		</Tab>
		<Tab name="questions" title="FAQ вопросы"><ContentFAQQuestionsList /></Tab>
		<Tab name="docs" title="Документы"><ContentDocumentsList /></Tab>
	</Tabs>
</template>

<script>
import Tab from "@/components/shared/ui/Tab.vue";
import Tabs from "@/components/shared/ui/Tabs.vue";
import ContentAvatarsList from "./ContentAvatarsList.vue";
import ContentFAQQuestionsList from "./ContentFAQQuestionsList.vue";
import ContentDocumentsList from "./ContentDocumentsList.vue";

export default {
	data: () => ({
		initialTab: null,
	}),
	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},
	components: {
		Tabs,
		Tab,
		ContentAvatarsList,
		ContentFAQQuestionsList,
		ContentDocumentsList,
	},
};
</script>

<style></style>
