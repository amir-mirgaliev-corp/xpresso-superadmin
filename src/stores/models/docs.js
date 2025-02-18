import docs from "@/api/docs";

export default {
	state: {
		documents: [],
		document: {},
	},

	actions: {
		async fetchDocuments(context) {
			const resQuestions = await docs.getDocuments();
			context.commit("setDocuments", resQuestions);
		},

		async fetchOneDocumentByName(context, name) {
			const resQuestion = await docs.getOneDocument(name);
			context.commit("setOneDocument", resQuestion);
		},

		clearOneDocument(context) {
			context.commit("setOneDocument");
		},
	},

	mutations: {
		setDocuments(state, documents) {
			state.documents = documents;
		},

		setOneDocument(state, document) {
			state.document = document;
		},

		clearOneDocument(state) {
			state.document = null;
		},
	},

	getters: {
		getDocuments(state) {
			return state.documents;
		},

		getOneDocument(state) {
			return state.document;
		},
	},
};
