<template>
	<section class="transport-colors__content">
		<div
			class="transport-colors__container rounded-[12px] border border-[#DCDCDC] p-6 max-lg:p-4 max-sm:border-none max-sm:p-0"
		>
			<h1 class="text-2xl font-bold text-gray-800 mb-6 max-lg:text-xl">Список цветов</h1>

			<div class="grid grid-cols-3 max-xl:grid-cols-1 gap-5">
				<template v-if="getTransportColorList.length">
					<TransportItem
						v-for="(color, index) in getTransportColorList"
						:key="index"
						:color="color.hex_code"
						:title="color.name_ru"
						@action="action => handleAction(action, color.id)"
					/>
				</template>

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
import CustomButton from "../../../shared/ui/CustomButton.vue";
import TransportItem from "../TransportItem.vue";
import { transportColorApi } from "@/api/transport";

import DangerModal from "@/components/shared/modals/DangerModal.vue";

import { mapActions, mapGetters } from "vuex";

export default {
	data: () => ({
		deleteModalOpen: false,
		deleteColorId: null,
		colors: [],
	}),

	computed: {
		...mapGetters(["getTransportColorList"]),
	},

	methods: {
		...mapActions(["fetchTransportColorList"]),

		async deleteColor() {
			await transportColorApi.deleteTransportColor(this.deleteColorId);
			this.deleteColorId = null;
			this.deleteModalOpen = false;
			await this.fetchTransportColorList();
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
		await this.fetchTransportColorList();
	},
};
</script>
