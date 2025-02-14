<template>
	<div class="chain-page">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/chains')">
			Назад
		</CustomButton>

		<Tabs :initial-tab="initialTab">
			<Tab name="branches" title="Филиалы"><ChainBranches /></Tab>
			<Tab name="categories" title="Категории"><ChainCategories /></Tab>
			<Tab name="menu" title="Меню"><ChainMenu /></Tab>
		</Tabs>

		<div class="flex justify-end gap-4 my-6">
			<CustomButton icon="fi-rr-file-edit" class="h-12 width-fit purple" @click="linkToEdit">
				Редактировать сеть
			</CustomButton>
			<CustomButton icon="fi-rr-trash" class="h-12 width-fit" @click="toggleDelete"> Удалить сеть </CustomButton>
		</div>
	</div>

	<DangerModal v-if="deleteModalOpen" @close="toggleDelete" @confirm="deleteChain" />
</template>

<script>
import chains from "@/api/chains";
import Tabs from "@/components/shared/Tabs.vue";
import Tab from "@/components/shared/Tab.vue";
import DangerModal from "@/components/shared/DangerModal.vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import ChainBranches from "./tabs/ChainBranches.vue";
import ChainCategories from "./tabs/ChainCategories.vue";
import ChainMenu from "./tabs/ChainMenu.vue";

export default {
	data: () => ({
		initialTab: null,
		deleteModalOpen: false,
	}),

	components: {
		Tabs,
		Tab,
		DangerModal,
		CustomButton,
		ChainBranches,
		ChainCategories,
		ChainMenu,
	},

	computed: {},

	methods: {
		toggleDelete() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},

		async deleteChain() {
			const id = this.$route.params.chain_id;
			const deletedChain = await chains.deleteChain(id);

			if (deletedChain === 200) {
				this.$router.push("/chains");
			}
		},

		linkToEdit() {
			this.$router.push(`/chains/edit/${this.$route.params.chain_id}`);
		},
	},

	watch: {},

	mounted() {
		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},
};
</script>
