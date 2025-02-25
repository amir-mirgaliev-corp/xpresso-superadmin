import { transportColorApi, transportMakeApi, transportModelApi } from "@/api/transport";

export default {
	state: {
		transportMakeDetails: {},
		transportModelDetails: {},
		transportColorDetails: {},
		transportMakeList: [],
		transportModelList: [],
		transportColorList: [],
		// transportCategory: {},
		// transportCategories: [],
	},

	actions: {
		async fetchTransportMakeList(context) {
			const resTransportMakeList = await transportMakeApi.getTransportMakeList();
			context.commit("setTransportMakeList", resTransportMakeList);
		},

		async fetchTransportModelList(context, id) {
			const resTransportModelList = await transportModelApi.getTransportModelList(id);
			context.commit("setTransportModelList", resTransportModelList);
		},

		async fetchTransportColorList(context) {
			const resTransportColorList = await transportColorApi.getTransportColorList();
			context.commit("setTransportColorList", resTransportColorList);
		},

		async fetchTransportModelById(context, id) {
			const resModel = await transportModelApi.getTransportModelById(id);
			context.commit("setTransportModelDetails", resModel);
		},

		async fetchTransportMakeById(context, id) {
			const resMake = await transportMakeApi.getTransportMakeById(id);
			context.commit("setTransportMakeDetails", resMake);
		},

		async fetchTransportColorById(context, id) {
			const resColor = await transportColorApi.getTransportColorById(id);
			context.commit("setTransportColorDetails", resColor);
		},
	},

	// чуть-чуть сократил код для тебя мой пупсик ❤️
	mutations: {
		setTransportMakeList: (state, makesList) => (state.transportMakeList = makesList),
		setTransportModelList: (state, modelList) => (state.transportModelList = modelList),
		setTransportColorList: (state, colorList) => (state.transportColorList = colorList),
		setTransportMakeDetails: (state, make) => (state.transportMakeDetails = make),
		setTransportModelDetails: (state, model) => (state.transportModelDetails = model),
		setTransportColorDetails: (state, color) => (state.transportColorDetails = color),
	},

	getters: {
		getTransportMakeList: state => state.transportMakeList,
		getTransportModelList: state => state.transportModelList,
		getTransportColorList: state => state.transportColorList,
		getTransportMakeDetails: state => state.transportMakeDetails,
		getTransportModelDetails: state => state.transportModelDetails,
		getTransportColorDetails: state => state.transportColorDetails,
	},
};
