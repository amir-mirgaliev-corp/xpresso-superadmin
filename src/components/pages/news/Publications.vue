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
			<li v-for="item in news" :key="item.id" class="publications__item" @click="linkToEdit(item.id)">
				<img :src="item.image" class="publications__item-image" alt="" />
				<span class="publications__item-date">
					Дата: {{ formatDate(item.scheduled_time || item.created_at) }}
				</span>
				<p class="publications__item-title">{{ item.title_ru }}</p>
			</li>
		</ul>

		<div class="flex justify-end mt-4">
			<Pagination :page="pagination.page" :count="pagination.count" :limit="pagination.limit" />
		</div>
	</div>
</template>

<script>
import Calendar from "@/components/shared/ui/Calendar.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import SearchInput from "@/components/shared/ui/SearchInput.vue";
import Pagination from "@/components/shared/ui/Pagination.vue";

import { formatDate } from "@/utils/formatters/formatDate";

import news from "@/api/news";

export default {
	data() {
		return {
			news: [],
			searchQuery: "",
			pagination: {
				page: 1,
				limit: 10,
				count: 0,
			},
		};
	},

	methods: {
		formatDate(date) {
			return formatDate(date, true);
		},

		async fetchNews() {
			const { page, limit } = this.pagination;
			const to_date = this.$route.query.to_date;
			const from_date = this.$route.query.from_date;
			const search = this.searchQuery;
			const filters = { page, limit, from_date, to_date, search };
			const response = await news.getPublications(filters);
			this.news = response.items;
		},

		handlePageChange(newPage) {
			this.pagination.page = newPage;
		},

		linkToEdit(id) {
			this.$router.push(`/news/publication/${id}`);
		},
	},

	components: { CustomButton, SearchInput, Calendar },

	watch: {
		"$route.query.to_date": {
			deep: true,
			immediate: true,
			handler() {
				this.fetchNews();
			},
		},

		searchQuery() {
			this.fetchNews();
		},
	},
};
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
			background-color: rgba($color: #000, $alpha: 0.5);
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
			line-height: 1.25;
		}
	}
}
</style>
