<template>
    <section class="analytics">
        <DateFilterAnalytics />
        <AnalyticsCardContainer />
        <AnalyticsStandartGraphicsContainer />
        <AnaliticsChartColumnContainer />
    </section>
</template>

<script>

import DateFilterAnalytics from '@/components/pages/analitics/DateFilterAnalitics.vue';
import AnalyticsCardContainer from '@/components/pages/analitics/AnalyticsCardContainer.vue';
import AnalyticsStandartGraphicsContainer from '@/components/pages/analitics/AnalyticsStandartGraphicsContainer.vue';
import AnaliticsChartColumnContainer from '@/components/pages/analitics/AnaliticsChartColumnContainer.vue';

export default {
    components: {
        DateFilterAnalytics,
        AnalyticsCardContainer,
        AnalyticsStandartGraphicsContainer,
        AnaliticsChartColumnContainer
    },

    mounted () {
        this.$router.replace({ query: { period: 'day' } });
    }
}

</script>