<template>
	<section class="transport-models__content">
		<div class="transport-models__container max-w-4xl rounded-[12px] border border-[#DCDCDC] p-6 max-sm:border-none max-sm:p-0 max-sm:mt-5">
			<CustomButton icon="fi-rr-arrow-left" class="width-fit" @click="$emit('back')">Назад</CustomButton>

			<h1 class="text-2xl font-bold text-gray-800 mt-4 mb-8 max-sm:text-lg">Модели {{ selectedMark.name }}:</h1>

			<div v-if="getTransportModelList.length" class="grid grid-cols-3 gap-5 max-xl:grid-cols-1">
				<TransportItem
					v-for="(model, index) in getTransportModelList"
					:key="index"
					:title="model.name"
					@action="action => handleAction(action, model.id)"
				/>

				<CustomButton
					class="h-full min-h-[60px] radius-75"
					icon="fi-br-plus"
					@click="$router.push(`/transport/add/model/${selectedMark.id}`)"
				>
					Добавить модель
				</CustomButton>
			</div>

			<div v-else>
				<p>Для марки {{ selectedMark.name }} еще небыло добавленно моделей!</p>

				<CustomButton
					class="h-full min-h-[60px] radius-75 mt-4 width-fit"
					icon="fi-br-plus"
					@click="$router.push(`/transport/add/model/${selectedMark.id}`)"
				>
					Добавить модель
				</CustomButton>
			</div>
		</div>
	</section>

	<DangerModal
		v-if="deleteModalOpen"
		@confirm="deleteModel"
		@close="
			deleteModalOpen = false;
			deleteModelId = null;
		"
	/>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CustomButton from "../../../shared/ui/CustomButton.vue";
import TransportItem from "../TransportItem.vue";
import { transportModelApi } from "@/api/transport";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

export default {
	data: () => ({
		deleteModalOpen: false,
		deleteModelId: null,
		transportModel: [],
		transportCategory: [],
	}),

	components: {
		CustomButton,
		TransportItem,
		DangerModal,
	},

	props: {
		selectedMark: {
			type: Object,
			required: true,
		},
	},

	methods: {
		...mapActions(["fetchTransportModelList"]),

		async deleteModel() {
			await transportModelApi.deleteTransportModel(this.deleteModelId);
			this.deleteModelId = null;
			this.deleteModalOpen = false;
			await this.fetchTransportModelList(markId);
		},

		handleAction(action, model_id) {
			switch (action) {
				case "edit":
					this.$router.push(`/transport/add/model/${this.selectedMark.id}?model_id=${model_id}&mode=edit`);
					break;
				case "delete":
					this.deleteModalOpen = true;
					this.deleteModelId = model_id;
					break;
				default:
					console.error("Wrong action transport model");
					break;
			}
		},
	},

	computed: {
		...mapGetters(["getTransportModelList"]),
	},

	watch: {
		"$route.query": {
			async handler(query) {
				if (query.mark_id) {
					await this.fetchTransportModelList(query.mark_id);
				}
			},
			deep: true,
			immediate: true,
		},
	},
};
</script>
