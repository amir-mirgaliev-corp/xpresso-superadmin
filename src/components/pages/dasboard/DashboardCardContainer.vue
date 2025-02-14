<template>
    <div v-if="cardList" class="dashboard__card-container mb-8">
        <div class="dashboard__card-content grid grid-cols-3 gap-x-4 gap-y-6 2xl:grid-cols-4">
            <AnalyticsCard v-for="analytic in cardList" :key="analytic.key" :analytic="analytic" />
        </div>
    </div>
</template>

<script>
import AnalyticsCard from '@/components/ui/AnaliticsCard.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        cardList: null,
    }),

    components: {
        AnalyticsCard,
    },

    methods: {
        ...mapActions(['fetchStatistics']),

        async updateCardListFromAPI() {
            await this.fetchStatistics({ period: 'month' });

            const stats = this.getStatistics.data;

            const config = [
                { icon: 'fi-rr-hand-holding-usd', title: 'Выручка', key: 'totalProfit', unit: 'UZS' },
                { icon: 'fi-rr-user', title: 'Пользователи', key: 'totalUsers', unit: 'человек' },
                { icon: 'fi-rr-mug-hot-alt', title: 'Кофейни', key: 'totalBranches', unit: 'заведений' },
            ];

            this.cardList = config.map(({ icon, title, key, unit }) => ({
                icon,
                title,
                amount: stats[key].total,
                statistic: true,
                profit: stats[key].profit,
                los: stats[key].loss,
                unit,
            }));
        },
    },

    computed: {
        ...mapGetters(['getStatistics']),
    },

    async mounted() {
        await this.updateCardListFromAPI();
    },
};
</script>