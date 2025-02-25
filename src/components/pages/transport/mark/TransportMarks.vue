<template>
	<section class="transport-marks__content">
		<div class="transport-marks__container max-w-4xl rounded-[12px] border border-[#DCDCDC] p-6 max-lg:p-4 max-sm:border-none max-sm:p-0">
			<h1 class="text-2xl font-bold text-gray-800 mb-6 max-lg:text-xl">Марка автомобиля</h1>
			<div class="grid grid-cols-3 max-xl:grid-cols-1 gap-5">
				<TransportItem
					v-for="(mark, index) in getTransportMakeList"
					:key="index"
					:title="mark.name"
					:icon="mark.logo"
					@click="selectMark(mark)"
					@action="action => handleAction(action, mark)"
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
import CustomButton from "../../../shared/ui/CustomButton.vue";
import TransportItem from "../TransportItem.vue";
import { transportMakeApi } from "@/api/transport";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
	data: () => ({
		deleteModalOpen: false,
		deleteMarkId: null,
	}),

	components: {
		TransportItem,
		CustomButton,
		DangerModal,
	},

	computed: {
		...mapGetters(["getTransportMakeList"]),
	},

	methods: {
		...mapActions(["fetchTransportMakeList"]),
		...mapMutations(["setTransportMake"]),

		selectMark(mark) {
			this.$emit("mark-selected", mark);
			this.$router.replace({ query: { mark_id: mark.id } });
		},

		async deleteMark() {
			await transportMakeApi.deleteTransportMake(this.deleteMarkId);
			this.deleteMarkId = null;
			this.deleteModalOpen = false;
			await this.fetchTransportMakeList();
		},

		handleAction(action, mark) {
			switch (action) {
				case "edit":
					this.$router.push(`/transport/add/mark?id=${mark.id}&mode=edit`);
					// this.setTransportMake(mark);
					break;
				case "delete":
					this.deleteModalOpen = true;
					this.deleteMarkId = mark.id;
					break;
				default:
					console.error("Wrong action transport mark");
					break;
			}
		},
	},

	async mounted() {
		await this.fetchTransportMakeList();
	},
};
</script>
