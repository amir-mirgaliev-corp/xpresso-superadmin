import "./assets/styles/all.scss";

import { createApp } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./stores/store";
import Toast from "vue-toastification";

const app = createApp(App);

const toastOptions = {
	position: "top-right",
	timeout: 5000,
	pauseOnHover: true,
	showCloseButtonOnHover: true,
	closeButton: "button",
	icon: true,
};

app.use(router);
app.use(store);
app.use(Toast, toastOptions);

app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
