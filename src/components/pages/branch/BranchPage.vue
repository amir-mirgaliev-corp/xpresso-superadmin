<template>
	<div v-if="branch" class="branch">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<Tabs :initial-tab="initialTab">
			<Tab name="info" title="Информация">
				<BranchForm
					:editEnabled="editEnabled"
					:initial-branch-data="branch"
					@cancelEdit="editEnabled = false"
				/>
			</Tab>

			<Tab name="admins" title="Администраторы"><BranchAdmins /></Tab>
		</Tabs>

		<div v-if="showControlButtons" class="flex justify-end gap-4 mt-4">
			<CustomButton icon="fi-rr-file-edit" class="h-12 width-fit purple" @click="toggleEdit">
				Редактировать
			</CustomButton>

			<CustomButton icon="fi-rr-trash" class="h-12 width-fit" @click="toggleDelete">Удалить филиал</CustomButton>
		</div>
	</div>

	<DangerModal v-if="deleteModalOpen" @close="toggleDelete" @confirm="deleteBranch" />
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import BranchForm from "./tabs/BranchForm.vue";
import BranchAdmins from "./tabs/BranchAdmins.vue";
import Tabs from "@/components/shared/ui/Tabs.vue";
import Tab from "@/components/shared/ui/Tab.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";
import { mapGetters, mapActions } from "vuex";

import branches from "@/api/branches";

export default {
	data() {
		return {
			initialTab: null,
			editEnabled: false,
			branch: null,
			deleteModalOpen: false,
		};
	},

	computed: {
		...mapGetters(["getOneBranch"]),

		showControlButtons() {
			return this.$route.query.tab === "info" && !this.editEnabled;
		},
	},

	methods: {
		...mapActions(["fetchOneBranchById"]),

		toggleDelete() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},

		async deleteBranch() {
			const branch_id = this.$route.params.branch_id;
			const chain_id = this.branch.chainId;

			const deleteBranchStatus = await branches.deleteBranch(branch_id);

			if (deleteBranchStatus === 200) {
				this.$router.push(`/chain/${chain_id}`);
			}
		},

		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		async getBranchData() {
			const id = this.$route.params.branch_id;
			await this.fetchOneBranchById(id);
			this.branch = this.getOneBranch;
		},
	},

	mounted() {
		this.getBranchData();

		const tabParam = this.$route.query.tab;
		if (tabParam) this.initialTab = tabParam;
	},

	components: {
		CustomButton,
		Tabs,
		Tab,
		BranchForm,
		BranchAdmins,
		DangerModal,
	},
};
</script>
