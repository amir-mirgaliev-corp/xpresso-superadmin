import { createRouter, createWebHistory } from "vue-router";

const env = import.meta.env;

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("../views/Login.vue"),
			meta: {
				layout: "login",
				page: "Логин",
			},
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: () => import("../views/Dashboard.vue"),
			meta: {
				layout: "content",
				page: "Дашборд",
				auth: true,
			},
		},
		{
			path: "/analytics",
			name: "analytics",
			component: () => import("../views/Analytics.vue"),
			meta: {
				layout: "content",
				page: "Аналитика",
				auth: true,
			},
		},
		{
			path: "/chains",
			name: "chains",
			component: () => import("../views/chain/Chains.vue"),
			meta: {
				layout: "content",
				page: "Сети кофеен",
				auth: true,
			},
		},
		{
			path: "/chains/create",
			name: "chains-create",
			component: () => import("../views/chain/CreateChain.vue"),
			meta: {
				layout: "content",
				page: "Создание сети",
				auth: true,
			},
		},
		{
			path: "/chain/:chain_id",
			name: "chain",
			component: () => import("../views/chain/Chain.vue"),
			meta: {
				layout: "content",
				page: "Сеть",
				auth: true,
			},
		},
		{
			path: "/branch/create/:chain_id",
			name: "branch-create",
			component: () => import("../views/branch/CreateBranch.vue"),
			meta: {
				layout: "content",
				page: "Создание филиала",
				auth: true,
			},
		},
		{
			path: "/branch/:branch_id",
			name: "branch",
			component: () => import("../views/branch/Branch.vue"),
			meta: {
				layout: "content",
				page: "Филиал",
				auth: true,
			},
		},
		{
			path: "/product/create/:chain_id",
			name: "product-create",
			component: () => import("../views/product/ProductCreate.vue"),
			meta: {
				layout: "content",
				page: "Продукт",
				auth: true,
			},
		},
		{
			path: "/product/edit/:product_id",
			name: "product-edit",
			component: () => import("../views/product/ProductEdit.vue"),
			meta: {
				layout: "content",
				page: "Редактирование продукта",
				auth: true,
			},
		},
		{
			path: "/orders",
			name: "orders",
			component: () => import("../views/orders/Orders.vue"),
			meta: {
				layout: "content",
				page: "Заказы",
				auth: true,
			},
		},
		{
			path: "/order/:order_id",
			name: "order",
			component: () => import("../views/orders/Order.vue"),
			meta: {
				layout: "content",
				page: "Заказ",
				auth: true,
			},
		},
		{
			path: "/clients",
			name: "clients",
			component: () => import("../views/Clients.vue"),
			meta: {
				layout: "content",
				page: "Клиенты",
				auth: true,
			},
		},
		{
			path: "/transactions",
			name: "transactions",
			component: () => import("../views/Transactions.vue"),
			meta: {
				layout: "content",
				page: "Транзакции",
				auth: true,
			},
		},
		{
			path: "/transport",
			name: "transport",
			component: () => import("../views/transport/Transport.vue"),
			meta: {
				layout: "content",
				page: "Транспорт",
			},
		},
		{
			path: "/transport/add/mark",
			name: "add-mark",
			component: () => import("../views/transport/AddTransportMark.vue"),
			meta: {
				layout: "content",
				page: "Транспорт",
			},
		},
		{
			path: "/transport/add/model/:mark_id",
			name: "add-model",
			component: () => import("../views/transport/AddTransportModel.vue"),
			meta: {
				layout: "content",
				page: "Транспорт",
			},
		},
		{
			path: "/transport/add/colors",
			name: "add-color",
			component: () => import("../views/transport/AddTransportColor.vue"),
			meta: {
				layout: "content",
				page: "Транспорт",
			},
		},
		{
			path: "/user/profile/:user_id",
			name: "user-profile",
			component: () => import("../views/UserProfile.vue"),
			meta: {
				layout: "content",
				page: "Профиль пользователя",
				auth: true,
			},
		},
		{
			path: "/news",
			name: "news",
			component: () => import("../views/news/News.vue"),
			meta: {
				layout: "content",
				page: "Новости",
				auth: true,
			},
		},
		{
			path: "/news/publication/create",
			name: "create-publication",
			component: () => import("../views/news/publications/CreatePublication.vue"),
			meta: {
				layout: "content",
				page: "Новости",
				auth: true,
			},
		},
		{
			path: "/news/publication/:publication_id",
			name: "publication",
			component: () => import("../views/news/publications/Publication.vue"),
			meta: {
				layout: "content",
				page: "Новости",
				auth: true,
			},
		},
		{
			path: "/news/notification/create",
			name: "create-notification",
			component: () => import("../views/news/notifications/CreateNotification.vue"),
			meta: {
				layout: "content",
				page: "Новости",
				auth: true,
			},
		},
		{
			path: "/news/notification/:notification_id",
			name: "notification",
			component: () => import("../views/news/notifications/Notification.vue"),
			meta: {
				layout: "content",
				page: "Новости",
				auth: true,
			},
		},
		{
			path: "/content",
			name: "content",
			component: () => import("../views/Content.vue"),
			meta: {
				layout: "content",
				page: "Контент",
				auth: true,
			},
		},
		{
			path: "/settings",
			name: "settings",
			component: () => import("../views/Settings.vue"),
			meta: {
				layout: "content",
				page: "Настройки",
				auth: true,
			},
		},
		{
			path: "/:pathMatch(.*)*",
			name: "404",
			component: () => import("../views/NotFound.vue"),
			meta: {
				layout: "content",
				page: "404",
				auth: true,
			},
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const isAuthenticated = await checkAuth();

	if (to.path === "/") {
		next(isAuthenticated ? "/dashboard" : "/login");
	} else if (to.path === "/login" && isAuthenticated) {
		next("/dashboard");
	} else if (to.meta.auth && !isAuthenticated) {
		next("/login");
	} else {
		next();
	}
});

import api from "@/api/axios";

async function checkAuth() {
	try {
		const response = await api.get("/superuser/auth/profile");
		return response.status === 200;
	} catch (error) {
		console.error("Ошибка проверки авторизации:", error);
		return false;
	}
}

export default router;
