<template>
	<div class="actions bg-white p-[24px] rounded-[12px] border-[1px]">
		<h2 class="table-title flex items-center gap-4">
			Недавние Действия

			<span
				v-if="totalActionsCount"
				class="flex justify-center items-center bg-gray-200 p-[2px_8px] w-[48px] h-[24px] rounded text-xs font-normal leading-none"
			>
				{{ totalActionsCount }}
			</span>
		</h2>

		<div class="actions__filters mb-4">
			<ul class="flex gap-4">
				<li
					v-for="filter in filters"
					:key="filter.id"
					class="actions__filter"
					:class="{ 'actions__filter--active': filter.name === activeFilter }"
					@click="setActiveFilter(filter.name)"
				>
					{{ filter.title }}
				</li>
			</ul>
		</div>

		<ul v-if="actions.length" class="actions__list">
			<li
				v-for="(action, index) in actions"
				:key="index"
				class="actions__item flex items-center border border-[#E5E9EB] py-3 px-4"
				:class="{
					'rounded-t-lg': index === 0,
					'rounded-b-lg': index === actions.length - 1,
					'border-b-0': index !== actions.length - 1,
				}"
			>
				<div class="actions__info">
					<p class="actions__text">{{ action.text }}</p>
					<span v-if="action.date" class="actions__date">{{ formatDate(action.date, true) }}</span>
				</div>
			</li>
		</ul>

		<div v-else class="p-4 border border-[#E5E9EB] rounded-lg">
			<p>Нет Действий</p>
		</div>

		<div class="actions__pagination mt-4">
			<Pagination :count="totalActionsCount" :page="page" :limit="limit" @update:page="handlePageChange" />
		</div>
	</div>
</template>

<script>
import { formatDate } from "@/utils/formatters/formatDate";
import { mapActions, mapGetters } from "vuex";
import Pagination from "@/components/shared/ui/Pagination.vue";

export default {
	data: () => ({
		actions: [],
		page: 1,
		totalActionsCount: 0,
		limit: 10,
		activeFilter: "all",
		filters: [
			{ id: 0, name: "all", title: "Все" },
			{ id: 2, name: "orders", title: "Заказы" },
			{ id: 3, name: "transports", title: "Транспорт" },
			{ id: 4, name: "promocode", title: "Промокоды" },
			{ id: 5, name: "profile", title: "Профиль" },
		],
	}),

	methods: {
		...mapActions(["fetchUserHistory"]),

		formatDate,

		setActiveFilter(data) {
			this.activeFilter = data;
			const actionType = this.activeFilter;

			if (actionType === "all") {
				const query = Object.assign({}, this.$route.query);
				delete query.actionType;
				this.$router.replace({ query });
			} else {
				this.$router.replace({ query: { ...this.$route.query, actionType } });
			}
		},

		async loadActions() {
			const { page, limit } = this;
			const actionTypeQuery = this.$route.query.actionType;
			if (actionTypeQuery) this.activeFilter = actionTypeQuery;
			const filter = { actionType: this.activeFilter === "all" ? null : this.activeFilter };
			const userId = this.$route.params.user_id;
			await this.fetchUserHistory({ userId, filter, pagination: { page, limit } });

			this.totalActionsCount = this.getUserHistory.totalActions;
			this.actions = this.getUserHistory.actions.map(action => {
				return {
					text: action.description.ru,
					date: action.createdAt,
				};
			});

			console.log(this.actions);
		},

		handlePageChange(newPage) {
			this.page = newPage;
		},
	},

	computed: {
		...mapGetters(["getUserHistory"]),
	},

	components: {
		Pagination,
	},

	watch: {
		page: {
			handler() {
				this.loadActions();
			},
		},

		"$route.query.actionType": {
			immediate: true,

			handler() {
				this.loadActions();
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.actions {
	&__filter {
		position: relative;
		font-size: 0.875rem;
		display: block;
		color: #667085;
		font-weight: 700;
		padding-bottom: 0.75rem;
		line-height: 1;
		min-width: 48px;
		user-select: none;
		cursor: pointer;
		&::before {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			width: 0;
			height: 3px;
			border-radius: 2px;
			background-color: #ea7c69;
		}
		&--active {
			color: #ea7c69;
			&::before {
				width: 100%;
				transition: width 0.25s ease-out;
			}
		}
	}
	&__info {
		@include flex-center-sb;
		width: 100%;
	}
	&__date {
		color: #bbb;
	}
}
</style>
