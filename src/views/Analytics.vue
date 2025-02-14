<template>
	<section class="analytics">
		<DateFilterAnalytics />
		<AnalyticsCardContainer />
		<AnalyticsPopularBranchesTable />
		<AnalyticsTopTablesList />
		<AnalyticsStandartGraphicsContainer />
	</section>
</template>

<script>
import DateFilterAnalytics from "@/components/pages/analytics/DateFilterAnalytics.vue";
import AnalyticsCardContainer from "@/components/pages/analytics/AnalyticsCardContainer.vue";
import AnalyticsStandartGraphicsContainer from "@/components/pages/analytics/AnalyticsStandartGraphicsContainer.vue";
import AnalyticsTopTablesList from "@/components/pages/analytics/AnalyticsTopTablesList.vue";
import AnalyticsPopularBranchesTable from "@/components/pages/analytics/AnalyticsPopularBranchesTable.vue";

export default {
	components: {
		DateFilterAnalytics,
		AnalyticsCardContainer,
		AnalyticsStandartGraphicsContainer,
        AnalyticsPopularBranchesTable,
        AnalyticsTopTablesList
	},

	mounted() {
		this.$router.replace({ query: { period: "day" } });
	},
};
</script>
