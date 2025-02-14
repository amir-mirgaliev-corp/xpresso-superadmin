<template>
    <section class="orders h-full">
        <OrderFilters />
        <OrderContent />
    </section>
</template>


<script>
import OrderFilters from '@/components/pages/orders/OrderFilters.vue';
import OrderContent from '@/components/pages/orders/OrderContent.vue';

export default {
    components: {
        OrderFilters,
        OrderContent,
    }
}
</script>