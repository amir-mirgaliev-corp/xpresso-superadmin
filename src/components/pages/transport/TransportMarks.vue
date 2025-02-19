<template>
	<section class="transport-marks__content">
		<div class="transport-marks__container max-w-4xl rounded-[12px] border border-[#DCDCDC] p-6 max-lg:p-4">
			<h1 class="text-2xl font-bold text-gray-800 mb-6 max-lg:text-xl">Марка автомобиля</h1>

			<div class="grid grid-cols-3 max-2xl:grid-cols-1 gap-5">
				<TransportItem
					v-for="(mark, index) in transportCategory"
					:key="index"
					:title="mark.name"
					:icon="mark.photo"
					@click="selectMark(mark)"
					@action="action => handleAction(action, mark.id)"
				/>

				<CustomButton
					class="min-h-[60px] radius-75"
					icon="fi-br-plus"
					@click="$router.push('/transport/add/mark')"
				>
					Добавить марку
				</CustomButton>
			</div>
		</div>
	</section>

	<DangerModal
		v-if="deleteModalOpen"
		@confirm="deleteMark"
		@close="
			deleteModalOpen = false;
			deleteMarkId = null;
		"
	/>
</template>

<script>
import DangerModal from "@/components/shared/modals/DangerModal.vue";
import CustomButton from "../../shared/ui/CustomButton.vue";
import TransportItem from "./TransportItem.vue";
import transport from "@/api/transport";

import { mapGetters, mapActions } from "vuex";

export default {
	data: () => ({
		deleteModalOpen: false,
		deleteMarkId: null,
		transportModel: [],
		transportCategory: [],
		transportButton: {
			message: "Добавить марку",
		},
	}),

	components: {
		TransportItem,
		CustomButton,
		DangerModal,
	},

	computed: {
		...mapGetters(["getTransports", "getTransportModels", "getTransportCategories"]),

		groupTransportModelsByCategory() {
			if (!this.getTransportCategories || !this.getTransportModels) return {};

			return this.getTransportCategories.reduce((grouped, category) => {
				grouped[category.name] = this.getTransportModels.filter(model => model.category_id === category.id);
				return grouped;
			}, {});
		},
	},

	methods: {
		...mapActions(["fetchTransports", "fetchTransportModels", "fetchTransportCategories"]),

		selectMark(mark) {
			this.$emit("mark-selected", mark);
			this.$router.replace({ query: { mark_id: mark.id } });
		},

		async setTransportModels() {
			await this.fetchTransportModels();
			this.transportModel = this.getTransportModels;
		},

		async setTransportCategory() {
			await this.fetchTransportCategories();
			this.transportCategory = this.getTransportCategories;
		},

		async deleteMark() {
			await transport.deleteTransportCategory(this.deleteMarkId);
			this.deleteMarkId = null;
			location.reload();
		},

		handleAction(action, mark_id) {
			switch (action) {
				case "edit":
					this.$router.push(`/transport/add/mark?id=${mark_id}&mode=edit`);
					break;
				case "delete":
					this.deleteModalOpen = true;
					this.deleteMarkId = mark_id;
					break;
				default:
					console.error("Wrong action transport mark");
					break;
			}
		},
	},

	async mounted() {
		await this.setTransportCategory();
		await this.setTransportModels();
	},
};
</script>
