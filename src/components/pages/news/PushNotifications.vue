<template>
	<div class="notifications__content bg-white p-6 rounded-[12px] border-[1px] w-full max-sm:p-3">
		<div class="notifications__header flex justify-between items-end gap-8 mb-4 max-sm:gap-4">
			<h2 class="table-title !mb-0">PUSH уведомления</h2>

			<div>
				<CustomButton icon="fi-rr-plus" @click="$router.push('/news/notification/create')">
					Создать
				</CustomButton>
			</div>
		</div>

		<div class="notifications__filters flex justify-between items-center mb-6 max-sm:flex-col max-sm:gap-y-4">
			<SearchInput v-model="searchQuery" />
			<Calendar />
		</div>

		<ul v-if="notifications.length" class="notifications__items grid grid-cols-2 gap-4 max-sm:grid-cols-1">
			<li v-for="item in notifications" :key="item.id" class="notifications__item" @click="linkToEdit(item.id)">
				<div class="notifications__item-icon">
					<i class="fi fi-rr-bell-notification-social-media"></i>
				</div>

				<div>
					<span class="notifications__item-date">
						Дата: {{ formatDate(item.scheduled_time || item.created_at) }}
					</span>
					<p class="notifications__item-title">{{ item.title_ru }}</p>
				</div>
			</li>
		</ul>

		<div v-else class="p-6 bg-white border rounded-[12px]">
			<p>Нет уведомлений</p>
		</div>

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

import push from "@/api/push";

export default {
	data() {
		return {
			notifications: [],
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

		async fetchNotifications() {
			const { page, limit } = this.pagination;
			const to_date = this.$route.query.to_date;
			const from_date = this.$route.query.from_date;
			const search = this.searchQuery;
			const filters = { page, limit, from_date, to_date, search };
			const response = await push.getNotifications(filters);
			this.notifications = response.items;
		},

		handlePageChange(newPage) {
			this.pagination.page = newPage;
		},

		linkToEdit(id) {
			this.$router.push(`/news/notification/${id}`);
		},
	},

	watch: {
		"$route.query.to_date": {
			deep: true,
			immediate: true,
			handler() {
				this.fetchNotifications();
			},
		},

		searchQuery() {
			this.fetchNotifications();
		},
	},

	components: { CustomButton, SearchInput, Calendar, Pagination },
};
</script>

<style lang="scss" scoped>
.notifications {
	&__item {
		@include flex-center-vert;
		gap: 1rem;
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		color: #1d2939;
		border: 1px solid #d0d5dd;
		cursor: pointer;
		&-icon {
			@include flex-center;
			width: 3rem;
			height: 3rem;
			flex-shrink: 0;
			border-radius: 0.75rem;
			background-color: #1d2939;
			color: $white;
		}
		&-date {
			display: block;
			font-size: 0.75rem;
			font-weight: 400;
			line-height: 1;
			color: #aaa;
			margin-bottom: 0.375rem;
		}
		&-title {
			font-weight: 500;
			font-size: 1.25rem;
			margin: auto 0;
			line-height: 1.125;
		}
	}
}
</style>
