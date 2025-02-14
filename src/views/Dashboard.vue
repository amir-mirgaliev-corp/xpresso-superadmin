<template>
    <section class="dashboard">
        <DashboardCardContainer />
        <DashboardTableOrder />
        <DashboardTovarsTable />
        <DashboardOtherTables />
    </section>
</template>

<script>

import DashboardCardContainer from '@/components/pages/dasboard/DashboardCardContainer.vue';
import DashboardTableOrder from '@/components/pages/dasboard/DashboardTableOreder.vue';
import DashboardOtherTables from '@/components/pages/dasboard/DashboardOtherTables.vue';
import DashboardTovarsTable from '@/components/pages/dasboard/DashboardTovarsTable.vue';

export default {
    components: {
        DashboardCardContainer,
        DashboardTableOrder,
        DashboardOtherTables,
        DashboardTovarsTable
    }
}

</script>