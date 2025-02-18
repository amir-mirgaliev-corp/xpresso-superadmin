import faq from "@/api/faq";

export default {
	state: {
		questions: [],
		question: {},
	},

	actions: {
		async fetchQuestions(context, params) {
			const resQuestions = await faq.getQuestions(params);
			context.commit("setQuestions", resQuestions);
		},

		async fetchOneQuestionById(context, id) {
			const resQuestion = await faq.getOneQuestion(id);
			context.commit("setOneQuestion", resQuestion);
		},

		clearOneQuestion(context) {
			context.commit("clearOneQuestion");
		},
	},

	mutations: {
		setQuestions(state, questions) {
			state.questions = questions;
		},

		setOneQuestion(state, question) {
			state.question = question;
		},

		clearOneQuestion(state) {
			state.question = null;
		},
	},

	getters: {
		getQuestions(state) {
			return state.questions;
		},

		getOneQuestion(state) {
			return state.question;
		},
	},
};
