<template>
	<section class="sidebar">
		<div class="sidebar__logo flex justify-center items-center">
			<img src="@/assets/images/logo-sidebar.svg" alt="Logo" class="sidebar__logo-img w-[175px]" />
		</div>

		<div class="sidebar__content mt-[20px]">
			<ul class="sidebar__list">
				<li v-for="link in pages" :key="link.path" class="mb-[2px]">
					<router-link
						ref="links"
						:to="link.path"
						class="sidebar__list-link"
						:class="{ 'router-link-active': link.relatedRoutes?.includes($route.name) }"
					>
						<i :class="['fi', link.icon]"></i>
						<p>{{ link.text }}</p>
					</router-link>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
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
		],
	}),
};
</script>

<style lang="scss" scoped>
.sidebar {
	max-width: 250px;
	width: 100%;
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
		}
	}
}
</style>
