<template>
	<div class="mb-4 bg-white rounded-[0.5rem] sm:hidden">
		<HeaderSearch />
	</div>
	<section class="bg-white p-[24px] rounded-[12px] border-[1px] max-lg:p-4">
		<h2 class="table-title">Транспорт</h2>

		<div class="flex justify-between items-center">
			<div class="flex justify-center gap-16 max-2xl:gap-10 max-lg:gap-6 w-full" v-if="screenWidth > 640">
				<div>
					<div
						class="transport-tab"
						:class="{ 'transport-tab--active': activeTab === 'marks' || activeTab === 'models' }"
						@click="handleSelect('marks')"
					>
						<div class="transport-tab__icon">
							<img src="@/assets/images/icons/car.svg" alt="car" />
						</div>

						<p class="transport-tab__name">Транспорт</p>

						<div class="transport-tab__arrow">
							<i class="fi fi-rr-angle-right"></i>
						</div>
					</div>

					<div
						class="transport-tab"
						:class="{ 'transport-tab--active': activeTab === 'colors' }"
						@click="handleSelect('colors')"
					>
						<div class="transport-tab__icon">
							<span></span>
						</div>

						<p class="transport-tab__name">Цвет автомобиля</p>

						<div class="transport-tab__arrow">
							<i class="fi fi-rr-angle-right"></i>
						</div>
					</div>
				</div>

				<div class="flex-1 relative">
					<div v-if="activeTab === 'marks'" key="marks">
						<TransportMarks @mark-selected="handleMarkSelected" />
					</div>

					<div v-else-if="activeTab === 'colors'" key="colors">
						<TransportColors />
					</div>

					<div v-else-if="activeTab === 'models'" key="models">
						<TransportModels :selectedMark="selectedMark" @back="goToBack" />
					</div>
				</div>
			</div>
			<div v-else class="w-full">
				<Accordion accordionClass="p-0" triggerClass="w-full">
					<template #trigger>
						<div class="transport-tab !w-full !border-none">
							<div class="transport-tab__icon">
								<img src="@/assets/images/icons/car.svg" alt="car" />
							</div>

							<p class="transport-tab__name">Транспорт</p>
						</div>
					</template>
					<template #content>
						<div v-if="activeTab === 'marks'" key="marks">
							<TransportMarks @mark-selected="handleMarkSelected" />
						</div>

						<div v-else-if="activeTab === 'models'" key="models">
							<TransportModels :selectedMark="selectedMark" @back="goToBack" />
						</div>
					</template>
				</Accordion>
				<Accordion accordionClass="p-0 mt-3" triggerClass="w-full">
					<template #trigger>
						<div class="transport-tab !w-full !border-none">
							<div class="transport-tab__icon">
								<span></span>
							</div>

							<p class="transport-tab__name">Цвет автомобиля</p>
						</div>
					</template>
					<template #content>
						<TransportColors />
					</template>
				</Accordion>
			</div>
		</div>
	</section>
</template>

<script>
import Accordion from "@/components/shared/ui/Accordion.vue";
import TransportColors from "./color/TransportColors.vue";
import TransportMarks from "./mark/TransportMarks.vue";
import TransportModels from "./model/TransportModels.vue";
import HeaderSearch from "@/components/layouts/content_layout/header-ui/HeaderSearch.vue";

// import transport from "@/api/transport";

export default {
	components: {
		TransportColors,
		TransportMarks,
		TransportModels,
		Accordion,
		HeaderSearch,
	},

	data: () => ({
		activeTab: "marks",
		selectedMark: null,
	}),

	methods: {
		handleSelect(tab) {
			this.activeTab = tab;
			this.$router.replace({ query: { tab: this.activeTab } });
		},

		goToBack() {
			this.$router.push("/transport");
			this.activeTab = "marks";
		},

		handleMarkSelected(mark) {
			this.selectedMark = mark;
			this.activeTab = "models";
			this.$router.replace({ query: { mark: this.selectedMark } });
		},
	},

	computed: {
		screenWidth() {
			return window.screen.width;
		},
	},

	async mounted() {
		if (this.$route.query.tab) this.activeTab = this.$route.query.tab;

		// if (this.$route.query.mark_id) {
		// 	const response = await transport.getOneTransportCategory(this.$route.query.mark_id);
		// 	this.selectedMark = response;
		// 	this.activeTab = "models";
		// }
	},
};
</script>

<style lang="scss" scoped>
.transport-tab {
	@include flex-center-vert;
	width: 300px;
	gap: 0.75rem;
	border: 1px solid #dcdcdc;
	border-radius: 10px;
	padding: 0.75rem 1.25rem 0.75rem 0.75rem;
	user-select: none;
	transition: $transition;
	cursor: pointer;
	&--active {
		background-color: $primary;
		border-color: $primary;
		color: $white;
	}
	&:not(:last-child) {
		margin-bottom: 1.25rem;
		@media screen and (max-width: 640px) {
			margin-bottom: 0;
		}
	}
	&__icon {
		@include flex-center;
		width: 2.75rem;
		height: 2.75rem;
		background-color: #f6f8f9;
		border-radius: 10px;
		& > span {
			display: block;
			width: 1.25rem;
			height: 1.25rem;
			border-radius: 50%;
			background-color: $primary;
		}
		@media screen and (max-width: 768px) {
			flex-shrink: 0;
		}
	}
	&__arrow {
		margin-left: auto;
	}

	@media screen and (max-width: 768px) {
		width: 200px;
	}
	@media screen and (max-width: 640px) {
		width: 100%;
		border: 0;
		margin-bottom: 0;
		padding: 0;
	}
}
</style>
