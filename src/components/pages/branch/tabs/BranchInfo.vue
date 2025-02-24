<template>
	<div v-if="branch" class="branch-info">
		<BranchForm
			:editEnabled="editEnabled"
			:initial-branch-data="branch"
			@update="getBranchData"
			@cancel-edit="editEnabled = false"
		/>

		<div v-if="!editEnabled" class="flex justify-end gap-4 mt-4">
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
		...mapActions(["fetchOneBranch"]),

		toggleDelete() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},

		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		async getBranchData() {
			const branch_id = this.$route.params.branch_id;
			await this.fetchOneBranch(branch_id);
			this.branch = this.getOneBranch;
		},

		async deleteBranch() {
			const branch_id = this.$route.params.branch_id;
			// const chain_id = this.branch.chainId;

			const response_status = await branches.deleteBranch(branch_id);

			if (response_status === 204) {
				// this.$router.push(`/chain/${chain_id}`);
				this.$router.go(-1);
			}
		},
	},

	mounted() {
		this.getBranchData();
	},

	watch: {
		getOneBranch: {
			deep: true,
			handler(newValue) {
				if (newValue) this.branch = newValue;
			},
		},
	},

	components: { BranchForm, DangerModal, CustomButton },
};
</script>
