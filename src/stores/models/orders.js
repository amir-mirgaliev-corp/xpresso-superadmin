import api from "@/api/axios";
import orders from "@/api/orders";

export default {
  state: {
    globalOrders: [],
    orders: [],
    order: {},
  },

  actions: {
    async fetchDashboardOrders(context, params) {
      const resOrders = await orders.getOrderForDashboard(params);
      context.commit("setDashboardOrders", resOrders);
    },

    async fetchGlobalOrders(context, params) {
      console.log(params);

      const resOrders = await orders.getAllOrdersByFilter(params);
      context.commit("setGlobalOrders", resOrders);
    },

    async fetchOneOrderById(context, id) {
      const resOrder = await orders.getOrderById(id);
      context.commit("setOneOrder", resOrder);
    },
  },

  mutations: {
    setDashboardOrders(state, orders) {
      state.orders = orders;
    },

    setGlobalOrders(state, globalOrders) {
      state.globalOrders = globalOrders;
    },

    setOneOrder(state, order) {
      state.order = order;
    },
  },

  getters: {
    getGlobalOrders(state) {
      return state.globalOrders;
    },

    getDashboardOrders(state) {
      return state.orders;
    },

    getOneOrder(state) {
      return state.order;
    },
  },
};
