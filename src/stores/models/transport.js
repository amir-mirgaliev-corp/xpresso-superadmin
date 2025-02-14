import transport from "@/api/transport";

export default {
    state: {
        transport: {},
        transports: [],
        transportModel: {},
        transportModels: [],
        transportCategory: {},
        transportCategories: [],
    },

    actions: {
        async fetchTransport (context, id) {
            const resTransport = await transport.getTransport(id);
            context.commit('setTransport', resTransport);
        },

        async fetchTransports (context, { filter, pagination }) {
            const resTransports = await transport.getTransports(filter, pagination);
            context.commit('setTransports', resTransports);
        },

        async fetchTransportModel (context, id) {
            const resModel = await transport.getOneTransportModel(id);
            context.commit('setTransportModel', resModel);
        },

        async fetchTransportModels (context) {
            const resModels = await transport.getTransportModel();
            context.commit('setTransportModels', resModels);
        },

        async fetchTransportCategory (context, id) {
            const resCategory = await transport.getOneTransportCategory(id);
            context.commit('setTransportCategory', resCategory);
        },

        async fetchTransportCategories (context) {
            const resCategories = await transport.getTransportCategory();
            context.commit('setTransportCategories', resCategories);
        },
    },

    // чуть-чуть сократил код для тебя мой пупсик ❤️
    mutations: {
        setTransport: (state, transport) => (state.transport = transport),
        setTransports: (state, transports) => (state.transports = transports),
        setTransportModels: (state, models) => (state.transportModels = models),
        setTransportModel: (state, model) => (state.transportModel = model),
        setTransportCategory: (state, category) => (state.transportCategory = category),
        setTransportCategories: (state, categories) => (state.transportCategories = categories),
    },
    
    getters: {
        getTransport: state => state.transport,
        getTransports: state => state.transports,
        getTransportModel: state => state.transportModel,
        getTransportModels: state => state.transportModels,
        getTransportCategory: state => state.transportCategory,
        getTransportCategories: state => state.transportCategories,
    },
};
