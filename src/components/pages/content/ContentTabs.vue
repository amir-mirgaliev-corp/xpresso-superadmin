<template>
	<Tabs :initial-tab="initialTab" v-if="screenWidth > 640">
		<Tab name="avatars" title="Аватарки">
			<ContentAvatarsList />
		</Tab>
		<Tab name="questions" title="FAQ вопросы"><ContentFAQQuestionsList /></Tab>
		<Tab name="docs" title="Документы"><ContentDocumentsList /></Tab>
	</Tabs>
	<template v-else>
		<CustomSelect
			:options="contents"
			selectClass="w-[240px] h-[46px] bg-white max-sm:w-full"
			placeholder="Выберите тип контента"
			queryName="tab"
			@update:model-value="console.log($event)"
			v-model:model-value="activeContent"
		/>
		<div class="mt-3">
			<ContentAvatarsList v-if="activeContent === 'avatars'" />
			<ContentFAQQuestionsList v-if="activeContent === 'question'" />
			<ContentDocumentsList v-if="activeContent === 'docs'" />
		</div>
	</template>
</template>

<script>
import Tab from "@/components/shared/ui/Tab.vue";
import Tabs from "@/components/shared/ui/Tabs.vue";
import ContentAvatarsList from "./avatars/ContentAvatarsList.vue";
import ContentFAQQuestionsList from "./questions/ContentFAQQuestionsList.vue";
import ContentDocumentsList from "./documents/ContentDocumentsList.vue";
import CustomSelect from "@/components/shared/ui/CustomSelect.vue";

export default {
	data: () => ({
		initialTab: null,
		activeContent: "avatars",
		contents,
	}),
	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) {
			this.initialTab = tabParam;
			this.activeContent = tabParam;
		}
	},
	computed: {
		screenWidth() {
			return window.screen.width;
		},
	},
	components: {
		Tabs,
		Tab,
		ContentAvatarsList,
		ContentFAQQuestionsList,
		ContentDocumentsList,
		CustomSelect,
	},
	watch: {
		activeContent(val) {
			console.log(val);
		},
	},
};

const contents = [
	{
		title: "Аватарки",
		name: "avatars",
	},
	{
		title: "FAQ вопросы",
		name: "question",
	},
	{
		title: "Документы",
		name: "docs",
	},
];
</script>

<style></style>
