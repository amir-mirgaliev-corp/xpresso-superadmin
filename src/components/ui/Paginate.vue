<template>
    <div class="paginate flex justify-end">
        <div class="paginate__container flex items-center">
            <button class="paginate__button" @click="prevPage" :disabled="currentPage === 1">
                <ArrowBack class="stroke-orange-400" />
            </button>

            <div class="paginate__content flex items-center gap-[5px]">
                <div v-if="visiblePages[0] > 1">
                    <span class="paginate__items cursor-pointer p-[5px_12px] rounded-[5px] 
                                duration-300 hover:bg-yellow-500 hover:text-white" 
                           :class="{ 'bg-yellow-500 text-white': 1 === currentPage }"
                           @click="setPage(1)"
                    >
                        1
                    </span>
                    <span class="paginate__space m-[20px]">...</span>
                </div>
                
                <span 
                    v-for="page in visiblePages" 
                    :key="page" 
                    class="paginate__items cursor-pointer p-[5px_12px] rounded-[5px] duration-300 hover:bg-yellow-500 hover:text-white" 
                    :class="{ 'bg-yellow-500 text-white': page === currentPage }"
                    @click="setPage(page)"
                >
                    {{ page }}
                </span>

                <div v-if="visiblePages[visiblePages.length - 1] < totalPages">
                    <span class="paginate__space m-[20px]">...</span>
                    <span class="paginate__items cursor-pointer p-[5px_12px] rounded-[5px] 
                                duration-300 hover:bg-yellow-500 hover:text-white" 
                          :class="{ 'bg-yellow-500 text-white': totalPages === currentPage }"
                           @click="setPage(totalPages)"
                    >
                        {{ totalPages }}
                    </span>
                </div>
            </div>

            <button class="paginate__button" @click="nextPage" :disabled="currentPage === totalPages">
                <ArrowNext class="stroke-orange-400" />
            </button>
        </div>
    </div>
</template>




<script>
import ArrowBack from '../icons/paginate/ArrowBack.vue';
import ArrowNext from '../icons/paginate/ArrowNext.vue';

export default {
    data: () => ({
        currentPage: 1,
        pagesLimit: 5 
    }),

    props: {
        page: {
            type: Number,
            required: true,
            default: 1
        },

        limit: {
            type: Number,
            required: true,
            default: 10
        },

        count: {
            type: Number,
            required: true,
            default: 10
        }
    },

    computed: {
        totalPages() {
            const total = Math.ceil(this.count / this.limit);
            return total > 1 ? total : 1;
        },

        visiblePages() {
            const halfLimit = Math.floor(this.pagesLimit / 2);
            let start = Math.max(this.currentPage - halfLimit, 1);
            let end = start + this.pagesLimit - 1;

            if (end > this.totalPages) {
                end = this.totalPages;
                start = Math.max(end - this.pagesLimit + 1, 1);
            }

            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
    },

    methods: {
        setPage(page) {
            if (page !== this.currentPage) {
                this.currentPage = page;
                this.$emit('update:page', page);
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.setPage(this.currentPage - 1);
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.setPage(this.currentPage + 1);
            }
        },
    },

    components: {
        ArrowBack,
        ArrowNext
    }
};
</script>


