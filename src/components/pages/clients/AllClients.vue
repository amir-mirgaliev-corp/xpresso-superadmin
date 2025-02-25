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
			thead: ["№", "Аватар", "Имя", "Номер телефона", "Машина", "Кол-во заказов"],
			content: [],
		},
	}),

	computed: {
		...mapGetters(["getUsers"]),
	},

	methods: {
		...mapActions(["fetchUsers"]),

		async loadClients() {
			// pagination
			const { page, limit } = this.paginationOptions;
			const pagination = { page, limit };

			// filters
			const transport_mark = this.$route.query.transport_mark;
			const transport_model = this.$route.query.transport_model;
			const orders_count_sort = this.$route.query.orders;
			const filter = { transport_mark, transport_model, orders_count_sort };

			console.log(filter);

			await this.fetchUsers({ filter, pagination });

			console.log(this.getUsers.users);

			this.paginationOptions.count = this.getUsers.count;

			this.tableOptions.content = this.getUsers.users.map((user, index) => {
				const transportName = user.userTransport?.userTransportName || "";
				const transportNumber = user.userTransport?.userTransportNumber || "";

				return {
					index: (this.paginationOptions.page - 1) * this.paginationOptions.limit + index + 1,
					avatar: user.userAvatar ? `${env.VITE_APP_STATIC_URL}${user.userAvatar}` : defaultAvatar,
					fullName: `${user.firstName} ${user.lastName}`,
					phone: user.userPhone || "Не указан",
					id: user.userId,
					transport: [transportName, transportNumber].filter(Boolean).join(", ") || "-",
					ordersCount: user.userOrderCount,
				};
			});
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},
	},

	watch: {
		"paginationOptions.page": {
			async handler() {
				await this.loadClients();
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
