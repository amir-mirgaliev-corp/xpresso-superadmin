<template>
    <div class="status">
        <div class="status__container flex border-[1px] rounded-[10px] border-gray-300">
            <div
                class="status__items p-[10px_16px] border-r-[1px] border-gray-300 
                       last-of-type:border-none cursor-pointer"
                :class="{ 'bg-gray-200': index === activeIndex }"
                v-for="(status, index) in statusesRu"
                :key="status"
                ref="filters"
                @click="selectActive(index)"
            >
                <p class="status__text">{{ status }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        statusesRu: ['Все', 'Новый', 'Принятый', 'Готовится','Готов к выдаче', 'Завершен', 'Отменено'],
        statusesEn: ['all', 'received', 'pending', 'processing', 'completed', 'canceled'],
        activeIndex: 0 ,
    }),

    methods: {
        selectActive(index) {
            this.activeIndex = index;

            const pageLayout = this.$route.query.page_layout;

            this.$router.replace({
                query: {
                    page_layout: pageLayout || 'grid',
                    status: this.statusesEn[index]
                }
            });
        },

        returnDefaultStatus() {
            const defaultStatus = this.statusesEn[this.activeIndex];
            const pageLayout = this.$route.query.page_layout;

            this.$router.replace({
                query: {
                    page_layout: pageLayout || 'grid',
                    status: defaultStatus
                }
            });
        }
    },


    mounted() {
        this.returnDefaultStatus();
    },

    watch:{
        $activeIndex:{
            deep:true,
            immediate:true,
            handler(){
                this.returnDefaultStatus();
            }
        }
    }
};

</script>
