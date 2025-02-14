<template>
    <div class="filter__grid flex justify-between items-center">
        <div class="grid__filter-button"
            v-if="$route.query.is_have_order"
        >
          <button class="flex justify-center
                         items-center p-[15px_15px] 
                         rounded-[10px] border-[2px] mt-[20px]"
                  @click="backToFirstPage"
          >
              <Back :color="defaultColor" />
          </button>
      </div>
      <div class="filter__grid-container ml-auto
           rounded-[10px] border-[2px] w-[200px]
           flex justify-between mt-[20px]"
           v-if="!$route.query.is_have_order"
      >
          <button class="grid__filter-button p-[10px_20px]"
              @click="setGridPageFilter(type.query)"
              v-for="type in gridTypes"
              :key="type.query"
          >
              <component
                  :is="getIconComponent(type.text)"
                  :color="type.active ? activeColor : defaultColor"
              />
          </button>
      </div>
  </div>
</template>

<script>
import Back from '../icons/back/Back.vue';
import Grid from '../icons/gridtypes/Grid.vue';
import Column from '../icons/gridtypes/Column.vue';
import Line from '../icons/gridtypes/Line.vue';

export default {
    data: () => ({
        defaultColor: '#D1D1D1',
        activeColor: '#344054',
        gridTypes: [
            { text: 'grid', query: 'grid', active: false },
            { text: 'column', query: 'column', active: false },
            { text: 'line', query: 'line', active: false }
        ]
    }),

    methods: {
        setGridPageFilter(query) {
            this.gridTypes.forEach(type => (type.active = type.query === query));
            this.$router.replace({ query: { page_layout: query } });
        },

        backToFirstPage() {
            const { query, path } = this.$route;

            const updatedQuery = { ...query };
            delete updatedQuery.is_have_order;

            this.$router.replace({ path, query: updatedQuery });
        },

        getIconComponent(iconName) {
            switch (iconName) {
                case 'grid':
                    return Grid;
                case 'column':
                    return Column;
                case 'line':
                    return Line;
                default:
                    return Grid;
            }
        },

        initializeActiveIcon() {
            const currentLayout = this.$route.query.page_layout || 'grid'; 
            this.gridTypes.forEach(type => (type.active = type.query === currentLayout));
        }
    },

    created() {
        this.initializeActiveIcon();
    },

    watch: {
        '$route.query.page_layout': {
            immediate: true,
            handler(newLayout) {
                this.initializeActiveIcon();
            }
        }
    },

    components: {
        Back,
        Grid,
        Column,
        Line
    }
};
</script>



