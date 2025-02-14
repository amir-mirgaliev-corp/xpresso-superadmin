<template>
	<div v-if="cardList" class="analytics__card-container mb-6">
		<div class="analytics__card-content grid grid-cols-3 gap-x-4 gap-y-6 2xl:grid-cols-4 auto-rows-fr">
			<AnalyticsCard v-for="analytic in cardList" :key="analytic.icon" :analytic="analytic" />
		</div>
	</div>
</template>

<script>
import AnalyticsCard from "@/components/shared/ui/AnalyticsCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
	data: () => ({
		cardList: [
			{
				icon: "fi-rr-hand-holding-usd",
				title: "Выручка",
				amount: "10 000 000",
				unit: "UZS",
				statistic: true,
			},
			{
				icon: "fi-rr-user",
				title: "Пользователи",
				amount: "10 000",
				unit: "человек",
				statistic: true,
			},
			{
				icon: "fi-rs-marker",
				title: "Кофейни",
				amount: "40",
				unit: "заведений",
				statistic: true,
			},
			{
				icon: "fi-rr-mug-hot-alt",
				title: "Кофе позиции",
				amount: "100",
				unit: "позиции",
				statistic: true,
			},
			{
				icon: "fi-rr-shopping-cart",
				title: "Заказы",
				amount: "500",
				unit: "заказов",
				statistic: true,
			},
			{
				icon: "fi-rr-refresh",
				title: "Полный оборот",
				amount: "2 000 000",
				unit: "UZS",
				statistic: true,
			},
		],
	}),

	components: {
		AnalyticsCard,
	},

	methods: {
		...mapActions(["fetchStatistics"]),

		async updateCardListFromAPI() {
			try {
				const { date_from, date_to, period } = this.$route.query;
				await this.fetchStatistics(period ? { period } : { date_from, date_to });
			} catch (error) {
				console.error("Ошибка при обновлении данных:", error);
			}
		},
	},

	computed: {
		...mapGetters(["getStatistics"]),

		cardList() {
			const defaultData = [
				{ icon: "fi-rr-hand-holding-usd", title: "Выручка", unit: "UZS" },
				{ icon: "fi-rr-user", title: "Пользователи", unit: "человек" },
				{ icon: "fi-rs-marker", title: "Кофейни", unit: "заведений" },
				{ icon: "fi-rr-mug-hot-alt", title: "Кофе позиции", unit: "позиции" },
				{ icon: "fi-rr-shopping-cart", title: "Заказы", unit: "заказов" },
				{ icon: "fi-rr-refresh", title: "Полный оборот", unit: "UZS" },
			];

			const { totalProfit, totalUsers, totalBranches, totalProducts, totalOrder, totalMoney } =
				this.getStatistics.data || {};

			const stats = [
				totalProfit,
				totalUsers,
				totalBranches,
				totalProducts,
				totalOrder,
				totalMoney || { total: 0 },
			];

			return defaultData.map((item, index) => ({
				...item,
				amount: stats[index]?.total || 0,
				profit: stats[index]?.profit || 0,
				los: stats[index]?.loss || 0,
                statistic: true
			}));
		},
	},

	watch: {
		"$route.query": {
			deep: true,
			async handler() {
				await this.updateCardListFromAPI();
			},
		},
	},

	async mounted() {
		await this.updateCardListFromAPI();
	},
};
</script>
