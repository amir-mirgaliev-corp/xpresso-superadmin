<template>
	<section class="client__table w-full mt-4">
		<TableLayout
			:table-options="tableOptions"
			:pagination-options="paginationOptions"
			@update:page="handlePageChange"
		>
			<template #title>
				<h2 class="table-title">Список клиентов</h2>
			</template>
		</TableLayout>
	</section>
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";

import { mapActions, mapGetters } from "vuex";

const env = import.meta.env;

import defaultAvatar from "@/assets/images/default_avatar.svg";

export default {
	data: () => ({
		paginationOptions: {
			page: 1,
			limit: 10,
			count: 0,
		},
		tableOptions: {
			editLink: "/user/profile",
			thead: ["№", "Аватар", "Имя", "Логин", "Номер телефона", "Машина", "Кол-во заказов"],
			content: [],
		},
	}),

	computed: {
		...mapGetters(["getUsers"]),
	},

	methods: {
		...mapActions(["fetchUsers"]),

		async loadClients() {
			// filters
			const { page, limit } = this.paginationOptions;
			const pagination = { page, limit };
			const make_id = this.$route.query.make_id;
			const model_id = this.$route.query.model_id;
			const sort_by_orders = this.$route.query.orders;
			const gender = this.$route.query.gender;
			const filters = { pagination, make_id, model_id, sort_by_orders, gender };

			await this.fetchUsers(filters);
			this.paginationOptions.count = this.getUsers.total;
			this.setUsersTable();
		},

		setUsersTable() {
			this.tableOptions.content = this.getUsers.items.map((user, index) => {
				return {
					index: (this.paginationOptions.page - 1) * this.paginationOptions.limit + index + 1,
					avatar: user.avatar || defaultAvatar,
					fullName: `${user.name} ${user.last_name}`,
					username: user.username || "",
					phone: user.phone_number || "",
					transport: user.vehicle || "",
					ordersCount: user.order_count,
					id: user.id,
				};
			});
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},
	},

	watch: {
		getUsers: {
			deep: true,
			handler(newValue) {
				if (newValue) {
					this.paginationOptions.count = newValue.total;
					this.setUsersTable();
				}
			},
		},

		"paginationOptions.page": {
			handler() {
				this.loadClients();
			},
		},

		"$route.query": {
			deep: true,
			immediate: true,

			handler() {
				this.loadClients();
			},
		},
	},

	components: {
		TableLayout,
	},
};
</script>
