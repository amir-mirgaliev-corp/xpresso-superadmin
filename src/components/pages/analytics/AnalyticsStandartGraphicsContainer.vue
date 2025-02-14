<template>
	<div class="analytics__graphics mt-8">
		<div class="analytics__graphics-container bg-white p-[24px] rounded-[12px] border-[1px]">
			<h2 class="table-title">График кофейни</h2>
			<ChartStandart :graph="graphic" />
		</div>
	</div>
</template>

<script>
import ChartStandart from "./ChartStandart.vue";

import { mapActions, mapGetters } from "vuex";

export default {
	data: () => ({
		containerWidth: "w-chartContent",
		graphic: {},
	}),

	components: {
		ChartStandart,
	},

	computed: {
		...mapGetters(["getProfitGraph"]),
	},

	methods: {
		...mapActions(["fetchProfitGraphicData"]),

		async getGraphicFromAPI() {
			const { date_from, date_to, period } = this.$route.query;

			if (period) {
				await this.fetchProfitGraphicData({
					timeframe: period,
				});
			} else {
				await this.fetchProfitGraphicData({
					timeframe: "custom",
					fromDate: date_from,
					toDate: date_to,
				});
			}

			this.graphic = this.getProfitGraph;
		},
	},

	watch: {
		"$route.query.period": {
			deep: true,
			async handler() {
				await this.getGraphicFromAPI();
			},
		},
	},

	async mounted() {
		await this.getGraphicFromAPI();
	},
};
</script>
