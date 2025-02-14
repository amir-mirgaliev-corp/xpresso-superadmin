<template>
	<div class="chart-container">
		<LineChart :data="JSON.parse(JSON.stringify(chartData))" :options="chartOptions" v-if="chartData.labels" />
	</div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from "chart.js";

import translateWeeksDay from "@/utils/translators/translateWeekDays";
import translateYearMoths from "@/utils/translators/translateYearMoths";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
	components: {
		LineChart: Line,
	},

	data: () => ({
		chartData: {
			labels: [],
			datasets: [
				{
					label: "Цена",
					data: [],
					fill: false,
					borderColor: "#FF0000",
					tension: 0.4,
				},
			],
		},
		chartOptions: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					title: {
						display: false,
						text: "Промежуток времени",
						color: "#000000",
						font: {
							family: "Inter",
							size: 16,
							weight: "400",
						},
					},
					ticks: {
						color: "#000000",
						font: {
							family: "Inter",
							size: 14,
							weight: "400",
						},
						stepSize: 1,
						maxRotation: 0,
						minRotation: 0,
					},
					grid: {
						color: "#E0E0E0",
					},
				},
				y: {
					title: {
						display: false,
						text: "Цена",
						color: "#000000",
						font: {
							family: "Inter",
							size: 16,
							weight: "400",
						},
					},
					beginAtZero: true,
					ticks: {
						color: "#000000",
						font: {
							family: "Inter",
							size: 14,
							weight: "400",
						},
						stepSize: 5000,
						callback: function (value) {
							switch (true) {
								case +value >= 1000000000:
									return (+value / 1000000000).toFixed(1) + "B";
								case +value >= 1000000:
									return (+value / 1000000).toFixed(1) + "M";
								case +value >= 1000:
									return (+value / 1000).toFixed(1) + "K";
								default:
									return value;
							}
						},
					},
					grid: {
						color: "#E0E0E0",
					},
				},
			},
			plugins: {
				title: {
					display: true,
					text: "График Выручки и Цены",
					color: "#000000",
					font: {
						family: "Inter",
						size: 18,
						weight: "600",
					},
				},
				legend: {
					display: false,
				},
				tooltip: {
					enabled: true,
					callbacks: {
						label: context => {
							let value = context.raw;
							switch (true) {
								case value >= 1000000000:
									return `Выручка: ${(value / 1000000000).toFixed(1)}B сум`;
								case value >= 1000000:
									return `Выручка: ${(value / 1000000).toFixed(1)}M сум`;
								case value >= 1000:
									return `Выручка: ${(value / 1000).toFixed(1)}K сум`;
								default:
									return `Выручка: ${value} сум`;
							}
						},
					},
				},
			},
		},
	}),

	props: {
		graph: {
			type: Object,
			required: true,
		},
	},

	methods: {
		setGraphicsDataFromProps() {
			let labels = [];

			switch (this.$route.query.period) {
				case "month":
					labels = this.translateDateToMonth();
					break;
				case "week":
					labels = this.translateDateToWeek();
					break;
				case "day":
					labels = this.translateDateToDay();
					break;
				case "year":
					labels = this.translateDateToYear();
					break;
				default:
					labels = this.translateDateToMonth();
					break;
			}

			this.chartData.labels = labels;
			this.chartData.datasets[0].data = this.graph.datasets[0].data;
		},

		translateDateToMonth() {
			return this.graph.labels.map(label => {
				return +label.split("-")[2];
			});
		},

		translateDateToWeek() {
			return translateWeeksDay(this.graph.labels);
		},

		translateDateToDay() {
			return this.graph.labels.map((_, index) => index + 1);
		},

		translateDateToYear() {
			return translateYearMoths(this.graph.labels);
		},
	},

	watch: {
		graph: {
			deep: true,
			handler() {
				this.setGraphicsDataFromProps();
			},
		},
	},
};
</script>

<style scoped>
.chart-container {
	position: relative;
	width: 100%;
	height: 500px;
}
</style>
