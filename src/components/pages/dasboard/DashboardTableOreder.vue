<template>
  <section class="dashboard__table-oreder mb-6">
    <ContentContainer>
      <template #title>
        <h2 class="table-title">Активные заказы</h2>
      </template>

      <template #content>
        <Table :content="table" />
      </template>

      <template #paginate>
        <Pagination
          :page="page"
          :limit="limit"
          :count="count"
          @update:page="handlePageChange"
        />
      </template>
    </ContentContainer>
  </section>
</template>

<script>
import Table from "@/components/ui/Table.vue";
import Pagination from "@/components/shared/Pagination.vue";
import ContentContainer from "@/components/ui/ContentContainer.vue";

import { mapActions, mapGetters } from "vuex";
import formatNumberWithSpaces from "@/utils/formatNumbers";

export default {
  data: () => ({
    page: 1,
    limit: 10,
    totalPages: 10,
    count: 10,
    table: {
      thead: [
        "№",
        "Позиция (Заведение)",
        "Количество товаров",
        "Статус",
        "Стоимость",
        "Номер заказа",
      ],
      content: [],
    },
  }),

  components: {
    Table,
    Pagination,
    ContentContainer,
  },

  computed: {
    ...mapGetters(["getDashboardOrders"]),
  },

  methods: {
    ...mapActions(["fetchDashboardOrders"]),

    async setOrderToTable() {
      const { page, limit } = this;

      await this.fetchDashboardOrders({ page, limit });

      const statusTranslation = {
        received: "Принято",
        pending: "Обработка",
        processing: "Готовится",
        completed: "Готова",
        canceled: "Отменено",
      };

      this.count = this.getDashboardOrders.count;

      this.table.content = this.getDashboardOrders.orders
        .map((order, index) => ({
          id: (page - 1) * limit + index + 1,
          branch: order.orderBranches.orderBranchName,
          productCount: order.orderProductsCount,
          status: statusTranslation[order.orderStatus] || "Неизвестно",
          amount: formatNumberWithSpaces(order.orderAmount) + " UZS",
          orderId: `#${order.orderId}`,
        }))
        .sort((a, b) => a.id - b.id);
    },

    handlePageChange(newPage) {
      this.page = newPage;
    },
  },

  watch: {
    page: {
      deep: true,
      async handler() {
        await this.setOrderToTable();
      },
    },
  },

  async mounted() {
    await this.setOrderToTable();
  },
};
</script>
