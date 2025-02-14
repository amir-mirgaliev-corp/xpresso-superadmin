<template>
    <div class="filter-container rounded-[10px] border-2
                w-[600px] flex mt-[20px] bg-white"
    >
        <button class="filter-button px-[10px] py-[10px]
                    rounded-[5px] border transition-all
                    text-[#344054] text-center truncate w-[200px]"
                @click="setGridPageFilter(type.query)"
                v-for="type in gridTypes"
                :key="type.query"
                :class="{'bg-[#F5F7F9] border-[#D0D5DD]': type.active,
                        'border-transparent': !type.active
                }"
                :title="type.text"
        >
            {{ type.text }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'FilterButtons',
    data: () => ({
        gridTypes: [
            { text: 'Профиль', query: 'profile', active: true },
            { text: 'Интеграции', query: 'integrations', active: false },
            { text: 'Тариф', query: 'tariff', active: false },
            { text: 'Документы', query: 'documents', active: false }
        ]
    }),
    methods: {
        setGridPageFilter(query) {
            this.gridTypes.forEach(type => (type.active = type.query === query));
            this.$router.replace({ query: { page_layout: query } });
        }
    }
};
</script>
