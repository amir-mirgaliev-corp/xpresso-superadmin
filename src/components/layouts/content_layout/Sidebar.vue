<template>
	<section
		class="sidebar transition-width duration-300"
		:class="{
			'w-[250px] md:w-[200px]': getIsSidebarShown,
			'w-16': !getIsSidebarShown,
		}"
	>
		<div class="sidebar__logo flex justify-center items-center h-[47.63px] max-sm:h-[39.29px]">
			<transition>
				<img
					v-if="getIsSidebarShown"
					src="@/assets/images/logo-sidebar.svg"
					alt="Logo"
					class="sidebar__logo-img w-[175px]"
				/>
			</transition>
		</div>

		<div class="sidebar__content mt-5">
			<ul class="sidebar__list">
				<li v-for="link in pages" :key="link.path" class="mb-[2px]">
					<router-link
						ref="links"
						:to="link.path"
						class="sidebar__list-link"
						:class="{
							'router-link-active': link.relatedRoutes?.includes($route.name),
							'justify-center': !getIsSidebarShown,
						}"
					>
						<i :class="['fi', link.icon]"></i>
						<transition>
							<p v-if="getIsSidebarShown">{{ link.text }}</p>
						</transition>
					</router-link>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderSearch from "./header-ui/HeaderSearch.vue";

export default {
	data: () => ({
		pages: [
			{
				icon: "fi-rr-stats",
				path: "/dashboard",
				text: "Дашборд",
			},
			{
				icon: "fi-rr-chat-arrow-grow",
				path: "/analytics",
				text: "Аналитика",
			},
			{
				icon: "fi-rs-marker",
				path: "/chains",
				text: "Кофейни",
				relatedRoutes: ["chains-create", "chain", "branch-create", "branch", "product-create", "product-edit"],
			},
			{
				icon: "fi-rr-shopping-cart",
				path: "/orders",
				text: "Заказы",
				relatedRoutes: ["order"],
			},
			{
				icon: "fi-rr-users-alt",
				path: "/clients",
				text: "Клиенты",
				relatedRoutes: ["user-profile"],
			},
			{
				icon: "fi-rr-receipt",
				path: "/transactions",
				text: "Транзакции",
			},
			{
				icon: "fi-rr-car",
				path: "/transport",
				text: "Транспорт",
			},
			{
				icon: "fi-rr-newspaper",
				path: "/news",
				text: "Новости",
			},
			{
				icon: "fi-rr-script",
				path: "/content",
				text: "Контент",
			},
			{
				icon: "fi-rr-settings",
				path: "/settings",
				text: "Настройки",
			},
		],
	}),
	computed: {
		...mapGetters(["getIsSidebarShown"]),
		showSearch() {
			const pagesWithSearch = [
				"orders",
				"clients",
				"user-profile",
				"transport",
				"restaurants",
				"chains",
				"restaurants-chain",
				"restaurants-menu",
				"transactions",
			];

			return pagesWithSearch.includes(this.$route.name);
		},
	},
	components: {
		HeaderSearch,
	},
};
</script>

<style lang="scss" scoped>
.sidebar {
	background-color: #fff;
	border: 1px solid #e5e7eb;
	padding: 1rem 0.5rem;
	&__list {
		&-link {
			@include flex-center-vert;
			position: relative;
			gap: 0.875rem;
			border-radius: 0.75rem;
			color: #344054;
			font-weight: 500;
			padding: 1rem 1.25rem;
			transition: $transition;
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 100%;
				background-color: $primary;
				transition: $transition;
				z-index: 1;
				border-radius: inherit;
			}
			& > * {
				position: relative;
				z-index: 2;
			}
			&.router-link-active {
				color: $white;
				&::before {
					width: 100%;
				}
			}
			&:not(.router-link-active):hover {
				color: $primary;
			}
			@media screen and (max-width: 640px) {
				padding: 12px;
			}
		}
	}
	@media screen and (max-width: 1024px) {
		max-width: 200px;
	}
}
.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
