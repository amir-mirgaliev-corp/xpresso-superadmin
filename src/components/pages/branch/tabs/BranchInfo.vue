<template>
	<div v-if="branch" class="branch-info">
		<BranchForm :editEnabled="editEnabled" :initial-branch-data="branch" @cancelEdit="editEnabled = false" />

		<div class="flex justify-end gap-4 mt-4">
			<CustomButton icon="fi-rr-file-edit" class="h-12 width-fit purple" @click="toggleEdit">
				Редактировать
			</CustomButton>

			<CustomButton icon="fi-rr-trash" class="h-12 width-fit" @click="toggleDelete">
				Удалить филиал
			</CustomButton>
		</div>

		<DangerModal v-if="deleteModalOpen" @close="toggleDelete" @confirm="deleteBranch" />
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import BranchForm from "../components/BranchForm.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import { mapGetters, mapActions } from "vuex";

import branches from "@/api/branches";

export default {
	data() {
		return {
			editEnabled: false,
			branch: null,
			deleteModalOpen: false,
		};
	},

	computed: {
		...mapGetters(["getOneBranch"]),
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
	},

	components: { BranchForm, DangerModal, CustomButton },
};
</script>
