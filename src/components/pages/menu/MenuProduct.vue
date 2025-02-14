
<template>
    <div class="bg-white rounded-2xl flex flex-col gap-4 p-6 shadow-lg w-full">
        <div class="text-2xl font-bold text-gray-700">{{ nameCategory }}</div>
        <section class="grid grid-cols-4 gap-6" v-if="products.length">
            <router-link :to="`/product/create/${5}`">
                <ProductAdd />
            </router-link>
            <ProductCard v-for="(product, index) in products" 
                :product="product" :key="product" 
            />
        </section>
        <section class="w-full" v-else>
            <router-link :to="`/product/create/${5}`">
                <ProductAdd />
            </router-link>
            <h2 class="font-bold m-[50px] text-[30px]">На данный момент у данного заведения нет продуктов</h2>
        </section>
    </div>
</template>

<script>
import ProductAdd from '@/components/ui/ProductAdd.vue';
import ProductCard from '@/components/ui/ProductCard.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        products: []
    }),

    props: {
        nameCategory: {
            type: String,
            default: 'Горячee кофе'
        },

        branchInfo: {
            type: String,
            default: 'Во всех филиалах'
        },
    },

    computed: {
        ...mapGetters(['getProducts'])
    },

    methods: {
        ...mapActions(['fetchProducts'])
    },

    async mounted () {
        await this.fetchProducts();
        this.products = this.getProducts
        
            .filter(product => product.categoryId === this.$route.params.branch_id) 
            .map(product => product);

        console.log(this.products);
    },

    components: {
        ProductAdd,
        ProductCard
    }
}
</script>
