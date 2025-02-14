<template>
    <div class="analytics__graphics mt-8">
        <div class="analytics__graphics-container flex justify-between">
            <ContentContainer>
                <template #title>
                    <h2 class="table-title">{{ title }}</h2>
                </template>

                <!-- <template #filter>
                    <PeriodFilter />
                </template> -->

                <template #content>
                    <ChartColumns :graph="graphic" />
                </template>
            </ContentContainer>
        </div>
    </div>
</template>

<script>
import ContentContainer from '@/components/ui/ContentContainer.vue';
import ChartColumns from "@/components/ui/ChartColumns.vue"
import PeriodFilter from '@/components/ui/PeriodFilter.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        title: 'График продуктов',
        graphic: {}
        //containerWidth: 'w-chartContent'
    }),

    components: {
        ContentContainer,
        ChartColumns,
        PeriodFilter
    },

    computed: {
        ...mapGetters(['getProductGraph'])
    },

    methods: {
        ...mapActions(['fetchProductGraphicData']),

        async getGraphicFromAPI () {
            const period = this.$route.query.period;
            const { date_from, date_to } = this.$route.query;

            if (period) {
                await this.fetchProductGraphicData({ 
                    timeframe: period 
                })
            }
            else {
                await this.fetchProductGraphicData({
                    timeframe: 'custom',
                    fromDate: date_from,
                    toDate: date_to
                })
            }        
            
            this.graphic = this.getProductGraph;
        }
    },

    watch: {
        '$route.query': {
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