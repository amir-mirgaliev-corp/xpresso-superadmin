<template>
  <section class="dashboard__table-other grid grid-cols-3 gap-6">
    <ContentContainer v-for="table in tablesContent" :key="table">
      <template #title>
        <h2 class="table-title">{{ table.title }}</h2>
      </template>

      <template #content>
        <Table :content="table.table" />
      </template>

      <!-- <template #paginate>
                <Paginate />
            </template> -->
    </ContentContainer>
  </section>
</template>

<script>
import Table from "@/components/ui/Table.vue";
import Pagination from "@/components/shared/Pagination.vue";
import ContentContainer from "@/components/ui/ContentContainer.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    tablesContent: {
      tableTopUsers: {
        title: "Топ пользователей",
        table: {
          thead: ["№", "Пользователь"],
          content: [],
        },
      },
      tableTopRestaurant: {
        title: "Топ сетей",
        table: {
          thead: ["№", "Ресторан"],
          content: [],
        },
      },
      tableTopProducts: {
        title: "Топ товаров",
        table: {
          thead: ["№", "Продукт"],
          content: [],
        },
      },
    },
  }),

  components: {
    Table,
    Pagination,
    ContentContainer,
  },

  computed: {
    ...mapGetters(["getLeaders"]),
  },

  methods: {
    ...mapActions(["fetchLeaders"]),

    getModel(models) {
      return models.map((model) => {
        return { id: model.rank, name: model.name };
      });
    },
  },

  async mounted() {
    await this.fetchLeaders();

    const products = this.getLeaders.data.topCoffees.results;
    const branches = this.getLeaders.data.topBranches.results;
    const users = this.getLeaders.data.topUsers.results;

    this.tablesContent.tableTopProducts.table.content = this.getModel(products);
    this.tablesContent.tableTopRestaurant.table.content =
      this.getModel(branches);
    this.tablesContent.tableTopUsers.table.content = this.getModel(users);
  },
};
</script>
