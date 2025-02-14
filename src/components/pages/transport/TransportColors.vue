<template>
	<section class="transport-colors__content">
		<div class="transport-colors__container rounded-[12px] border border-[#DCDCDC] p-6">
			<h1 class="text-2xl font-bold text-gray-800 mb-6">Список цветов</h1>

			<div class="grid grid-cols-3 sm:grid-cols-3 gap-5" v-if="colors.length">
				<TransportItem
					v-for="(color, index) in colors"
					:key="index"
					:color="color.color"
					:title="color.name"
					@action="action => handleAction(action, color.id)"
				/>

				<CustomButton
					class="min-h-[60px] radius-75"
					icon="fi-br-plus"
					@click="$router.push('/transport/add/colors')"
				>
					Добавить цвет
				</CustomButton>
			</div>
		</div>
	</section>

	<DangerModal
		v-if="deleteModalOpen"
		@confirm="deleteColor"
		@close="
			deleteModalOpen = false;
			deleteColorId = null;
		"
	/>
</template>

<script>
import CustomButton from "../../shared/ui/CustomButton.vue";
import TransportItem from "./TransportItem.vue";
import colors from "@/api/color";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import { mapActions, mapGetters } from "vuex";

export default {
	data: () => ({
		deleteModalOpen: false,
		deleteColorId: null,
		colors: [],
	}),

	computed: {
		...mapGetters(["getColors"]),
	},

	methods: {
		...mapActions(["fetchColors"]),

		async setColors() {
			await this.fetchColors();
			this.colors = this.getColors;
		},

		async deleteColor() {
			await colors.deleteColor(this.deleteColorId);
			this.deleteColorId = null;
			location.reload();
		},

		handleAction(action, color_id) {
			switch (action) {
				case "edit":
					this.$router.push(`/transport/add/colors?color_id=${color_id}&mode=edit`);
					break;
				case "delete":
					this.deleteModalOpen = true;
					this.deleteColorId = color_id;
					break;
				default:
					console.error("Wrong action transport color");
					break;
			}
		},
	},

	components: {
		TransportItem,
		CustomButton,
		DangerModal,
	},

	async mounted() {
		await this.setColors();
	},
};
</script>
