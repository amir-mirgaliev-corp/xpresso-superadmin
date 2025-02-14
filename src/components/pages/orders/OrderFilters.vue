<template>
	<section class="order__filters">
		<div class="order__filters-container w-full flex justify-between" v-if="!$route.query.is_have_order">
			<div class="order__filters-tabs">
				<div class="tabs__header">
					<div
						class="tabs__header-item"
						:class="{ active: index === activeIndex }"
						v-for="(status, index) in statuses"
						:key="status.value"
						ref="filters"
						@click="selectActive(index)"
					>
						{{ status.name }}
					</div>
				</div>
			</div>

			<Calendar />
		</div>
	</section>
</template>

<script>
import Calendar from "@/components/shared/ui/Calendar.vue";

export default {
	data: () => ({
		activeIndex: 0,
		statuses: [
			{ name: "Все", value: "all" },
			{ name: "Новый", value: "received" },
			{ name: "Готовится", value: "processing" },
			{ name: "Готов к выдаче", value: "pending" },
			{ name: "Завершен", value: "completed" },
			{ name: "Отменен", value: "canceled" },
		],
	}),

	methods: {
		selectActive(index) {
			this.activeIndex = index;
			const status = this.statuses[index].value;

			if (status === "all") {
				this.$router.replace({
					query: { ...this.$route.query, status: undefined },
				});
			} else {
				this.$router.replace({ query: { ...this.$route.query, status } });
			}
		},
	},

	mounted() {
		const initialStatus = this.$route.query.status;

		if (initialStatus) {
			let s = this.statuses.find(s => s.value === initialStatus);
			this.activeIndex = this.statuses.indexOf(s);
		}
	},

	components: {
		Calendar,
	},
};
</script>
