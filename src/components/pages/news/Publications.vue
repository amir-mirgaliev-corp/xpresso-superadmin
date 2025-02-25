<template>
	<div class="publications__content bg-white p-6 rounded-[12px] border-[1px] w-full max-sm:p-3">
		<div class="publications__header flex justify-between items-end gap-8 mb-4 max-sm:gap-4">
			<h2 class="table-title !mb-0">Публикации</h2>

			<div>
				<CustomButton icon="fi-rr-plus" @click="$router.push('/news/publication/create')">Создать</CustomButton>
			</div>
		</div>

		<div class="publications__filters flex justify-between items-center mb-6 max-sm:flex-col max-sm:gap-y-4">
			<SearchInput v-model="searchQuery" />
			<Calendar />
		</div>

		<ul class="publications__items grid grid-cols-3 max-sm:grid-cols-1 gap-4">
			<li v-for="item in filteredNews" :key="item.id" class="publications__item">
				<img :src="item.image" class="publications__item-image" alt="" />
				<span class="publications__item-date">Дата: {{ formatDate(item.scheduled_time) }}</span>
				<p class="publications__item-title">{{ item.title.ru }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
import Calendar from "@/components/shared/ui/Calendar.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import SearchInput from "@/components/shared/ui/SearchInput.vue";

import { formatDate } from "@/utils/formatters/formatDate";

export default {
	data() {
		return {
			news,
			searchQuery: "",
		};
	},

	computed: {
		filteredNews() {
			return this.news;
		},
	},

	methods: {
		formatDate(date) {
			return formatDate(date, true);
		},
	},

	components: { CustomButton, SearchInput, Calendar },
};

const news = [
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		image: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		image: "https://beannbeancoffee.com/cdn/shop/articles/latte.jpg?crop=center&height=2294&v=1626909784&width=4100",
		scheduled_time: "2025-03-01T08:00:00Z",
	},
];
</script>

<style lang="scss" scoped>
.publications {
	&__item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		border-radius: 0.75rem;
		padding: 1rem;
		color: $white;
		height: 200px;
		cursor: pointer;
		@media screen and (max-width: 1660px) {
			height: 175px;
		}
		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba($color: #000, $alpha: 0.25);
			border-radius: inherit;
			z-index: 2;
		}
		&-image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			z-index: 1;
			border-radius: inherit;
		}
		&-date {
			position: relative;
			z-index: 3;
			font-size: 0.75rem;
			font-weight: 400;
			padding-top: 0.5rem;
		}
		&-title {
			position: relative;
			z-index: 3;
			font-weight: 500;
			font-size: 1.375rem;
			margin: auto 0;
			line-height: 1.125;
		}
	}
}
</style>
