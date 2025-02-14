<template>
	<div class="period mb-6">
		<div class="period__container tabs__header">
			<div
				class="tabs__header-item"
				:class="{ active: index === activeIndex }"
				v-for="(period, index) in periods"
				:key="period.period"
				ref="filters"
				@click="selectActive(index)"
			>
				{{ period.name }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		activeIndex: 0,
		periods: [
			{ name: "День", period: "day" },
			{ name: "Неделя", period: "week" },
			{ name: "Месяц", period: "month" },
			{ name: "Год", period: "year" },
		],
	}),

	methods: {
		selectActive(index) {
			this.activeIndex = index;
			const period = this.periods[index].period;
			this.$router.replace({ query: { period } });
		},
	},

	mounted() {
		const defaultPeriod = this.periods[this.activeIndex].period;
		this.$router.replace({ query: { period: defaultPeriod } });
	},
};
</script>
