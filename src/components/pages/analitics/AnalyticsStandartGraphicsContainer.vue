<template>
    <div class="analytics__graphics mt-8">
        <div class="analytics__graphics-container flex justify-between gap-6">
            <ContentContainer :container-width="containerWidth" v-for="(chart, index) in 2" :key="chart">
                <template #title>
                    <h2 class="table-title">{{ titles[index] }}</h2>
                </template>

                <!-- <template #filter>
                    <PeriodFilter />
                </template> -->

                <template #content>
                    <ChartStandart :graph="graphic" />
                </template>
            </ContentContainer>
        </div>
    </div>
</template>

<script>
import ContentContainer from '@/components/ui/ContentContainer.vue';
import ChartStandart from '@/components/ui/ChartStandart.vue';
import PeriodFilter from '@/components/ui/PeriodFilter.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        titles: ['График кофейни', 'Общий график'],
        containerWidth: 'w-chartContent',
        graphic: {}
    }),

    components: {
        ContentContainer,
        ChartStandart,
        PeriodFilter
    },

    computed: {
        ...mapGetters(['getProfitGraph'])
    },

    methods: {
        ...mapActions(['fetchProfitGraphicData']),

        async getGraphicFromAPI () {
            const period = this.$route.query.period;
            const { date_from, date_to } = this.$route.query;

            if (period) {
                await this.fetchProfitGraphicData({ 
                    timeframe: period 
                })
            }
            else {
                await this.fetchProfitGraphicData({
                    timeframe: 'custom',
                    fromDate: date_from,
                    toDate: date_to
                })
            }   
            
            this.graphic = this.getProfitGraph;
        }
    },

    watch: {
        '$route.query.period': {
            deep: true,
            async handler () {
                await this.getGraphicFromAPI()
            }
        }
    },

    async mounted () {
        await this.getGraphicFromAPI();
    }
}

</script>