<template>
	<section class="filter__analytics flex justify-between mb-6">
		<PeriodFilter />
		<!-- <CalendarFilter /> -->
	</section>
</template>

<script>
import PeriodFilter from "@/components/ui/PeriodFilter.vue";
// import CalendarFilter from '@/components/ui/CalendarFilter.vue';

export default {
	components: {
		PeriodFilter,
		// CalendarFilter
	},
};
</script>
