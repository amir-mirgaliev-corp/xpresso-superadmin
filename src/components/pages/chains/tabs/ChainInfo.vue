<template>
	<section v-if="chain" class="chains-layout">
		<ChainForm :initialData="chain" :edit-enabled="editEnabled" @cancel-edit="toggleEdit" @update="getChain" />

		<div v-if="!editEnabled" class="flex justify-end gap-4 my-6">
			<CustomButton icon="fi-rr-file-edit" class="h-12 width-fit purple" @click="toggleEdit">
				Редактировать сеть
			</CustomButton>

			<CustomButton icon="fi-rr-trash" class="h-12 width-fit" @click="toggleDelete">Удалить сеть</CustomButton>
		</div>
	</section>

	<DangerModal v-if="deleteModalOpen" @close="toggleDelete" @confirm="deleteChain" />
</template>

<script>
import ChainForm from "../components/ChainForm.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import { useToast } from "vue-toastification";

import chains from "@/api/chains";

export default {
	setup() {
		return {
			toast: useToast(),
		};
	},

	data() {
		return {
			chain: null,
			deleteModalOpen: false,
			editEnabled: false,
		};
	},

	methods: {
		toggleDelete() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},

		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		async getChain() {
			const chain_id = this.$route.params.chain_id;

			if (chain_id) {
				const response = await chains.getOneChain(chain_id);
				this.chain = response;
			} else {
				this.$router.push("/chains");
			}
		},

		async deleteChain() {
			const id = this.$route.params.chain_id;
			const response_status = await chains.deleteChain(id);

			if (response_status === 204) {
				this.$router.push("/chains");
			}
		},
	},

	async mounted() {
		this.getChain();
	},

	components: { ChainForm, CustomButton, DangerModal },
};
</script>
