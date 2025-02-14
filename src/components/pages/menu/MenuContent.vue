<template>
    <section class="flex gap-5">
        <!-- <MenuCategory /> -->
        <MenuProduct />
    </section>
</template>

<script>
import MenuCategory from './MenuCategory.vue';
import MenuProduct from './MenuProduct.vue';

export default {
    components:{
        MenuCategory,
        MenuProduct
    }
}
</script>

<style>

</style>