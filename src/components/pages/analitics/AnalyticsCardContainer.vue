<template>
    <div v-if="cardList" class="analytics__card-container">
        <div class="analytics__card-content grid grid-cols-3 gap-x-4 gap-y-6 2xl:grid-cols-4 auto-rows-fr">
            <AnalyticsCard v-for="analytic in cardList" :key="analytic.icon" :analytic="analytic" />
        </div>
    </div>
</template>

<script>
import AnalyticsCard from '@/components/ui/AnaliticsCard.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        cardList: [
            {
                icon: 'fi-rr-hand-holding-usd',
                title: 'Выручка',
                amount: '10 000 000',
                unit: 'UZS',
                statistic: true
            },
            {
                icon: 'fi-rr-user',
                title: 'Пользователи',
                amount: '10 000',
                unit: 'человек',
                statistic: true
            },
            {
                icon: 'fi-rs-marker',
                title: 'Кофейни',
                amount: '40',
                unit: 'заведений',
                statistic: true
            },
            {
                icon: 'fi-rr-mug-hot-alt',  
                title: 'Кофе позиции',
                amount: '100',
                unit: 'позиции',
                statistic: true
            },
            {
                icon: 'fi-rr-shopping-cart',  
                title: 'Заказы',
                amount: '500',
                unit: 'заказов',
                statistic: true
            },
            {
                icon: 'fi-rr-refresh',  
                title: 'Полный оборот',
                amount: '2 000 000',
                unit: 'UZS',
                statistic: true
            }
        ]
    }),

    components: {
        AnalyticsCard
    },

    methods: {
        ...mapActions(['fetchStatistics']),

        async updateCardListFromAPI () {
            try {
                const period = this.$route.query.period;
                const { date_from, date_to } = this.$route.query;

                await this.fetchStatistics(period ? { period } : { date_from, date_to });

                console.log(this.getStatistics.data);

                const {
                    totalProfit,
                    totalUsers,
                    totalBranches,
                    totalProducts,
                    totalOrder,
                    totalMoney,
                } = this.getStatistics.data;

                const updates = [
                    { index: 0, data: totalProfit },
                    { index: 1, data: totalUsers },
                    { index: 2, data: totalBranches },
                    { index: 3, data: totalProducts },
                    { index: 4, data: totalOrder },
                    { index: 5, data: totalMoney || { total: 0 } },
                ];

                updates.forEach(({ index, data }) => {
                    this.cardList[index].amount = data.total;
                    if (data.profit !== undefined) this.cardList[index].profit = data.profit;
                    if (data.loss !== undefined) this.cardList[index].los = data.loss;
                });
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        }
    },

    computed: {
        ...mapGetters(['getStatistics'])
    },

    watch: {
        '$route.query': {
            deep: true,
            async handler () {
                await this.updateCardListFromAPI();
            }
        }
    },

    async mounted () {
        await this.updateCardListFromAPI();
    }
}
</script>