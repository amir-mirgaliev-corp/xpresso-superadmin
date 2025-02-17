<template>
	<div v-if="transactions.length">
		<TableLayout :table-options="tableOptions" :pagination-options="paginationOptions">
			<template #title>
				<h2 class="table-title">Список транзакций</h2>
			</template>
		</TableLayout>
	</div>

	<div v-else>
		<p>Нет транзакций</p>
	</div>
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";
import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";
import { formatDate } from "@/utils/formatters/formatDate";
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			transactions: [],
			paginationOptions: {
				page: 1,
				limit: 10,
				count: 0,
			},
			tableOptions: {
				editLink: null,
				thead: [
					"№",
					"Имя пользователя",
					"Сумма",
					"Метод оплаты",
					"ID транзакции",
					"ID заказа",
					"Дата платежа",
					"Статус платежа",
				],
				content: [],
			},
		};
	},

	computed: {
		...mapGetters(["getTransactions"]),
	},

	methods: {
		...mapActions(["fetchTransactions"]),

		async loadTransactions() {
			// pagination
			const { page, limit } = this.paginationOptions;
			const pagination = { page, limit };

			// filters
			const searchField = this.$route.query.search_field;
			const filters = { searchField };

			await this.fetchTransactions({ pagination, filters });
			this.transactions = this.getTransactions;
			console.log(this.transactions);

			this.tableOptions.content = this.transactions.map((transaction, index) => {
				const statusTranslations = {
					success: "Успешно",
					canceled: "Отменено",
				};

				return {
					index: (page - 1) * limit + index + 1,
					userName: transaction.userName + " " + transaction.userSurname,
					amount: formatNumberWithSpaces(transaction.amount) + " UZS",
					paymentMethod: transaction.paymentMethod,
					transactionId: transaction.id,
					orderId: transaction.orderId || "-",
					date: formatDate(transaction.createdAt),
					status: statusTranslations[transaction.status],
				};
			});
		},
	},

	async mounted() {
		this.loadTransactions();
	},

	components: {
		TableLayout,
	},

	watch: {
		"$route.query.search_field": {
			deep: true,

			async handler() {
				await this.loadTransactions();
			},
		},
	},
};
</script>
