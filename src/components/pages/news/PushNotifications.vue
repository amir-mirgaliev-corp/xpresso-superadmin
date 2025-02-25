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

		<ul class="notifications__items grid grid-cols-2 gap-4 max-sm:grid-cols-1">
			<li v-for="item in filteredNotifications" :key="item.id" class="notifications__item">
				<div class="notifications__item-icon">
					<i class="fi fi-rr-bell-notification-social-media"></i>
				</div>

				<div>
					<span class="notifications__item-date">Дата: {{ formatDate(item.scheduled_time) }}</span>
					<p class="notifications__item-title">{{ item.title.ru }}</p>
				</div>
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
			notifications,
			searchQuery: "",
		};
	},

	computed: {
		filteredNotifications() {
			return this.notifications;
		},
	},

	methods: {
		formatDate(date) {
			return formatDate(date, true);
		},
	},

	components: { CustomButton, SearchInput, Calendar },
};

const notifications = [
	{
		id: 1,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 2,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		scheduled_time: "2025-03-01T08:00:00Z",
	},
	{
		id: 3,
		title: {
			ru: "Открытие новой кофейни",
			uz: "Yangi qahvaxona ochilishi",
			en: "Opening of a new coffee shop",
		},
		scheduled_time: "2025-02-20T10:00:00Z",
	},
	{
		id: 4,
		title: {
			ru: "Скидки на кофе",
			uz: "Qahva uchun chegirmalar",
			en: "Discounts on coffee",
		},
		scheduled_time: "2025-03-01T08:00:00Z",
	},
];
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
