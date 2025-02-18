<template>
	<router-link :to="`/order/${order.orderId}`" :class="['order', { 'order--ended': isOrderEnded }]">
		<div class="order__content">
			<div class="flex justify-between items-center gap-2">
				<div class="flex items-center gap-2">
					<span class="order__status" :style="{ backgroundColor: orderStatus.color }">
						{{ orderStatus.name }}
					</span>

					<span v-if="isOrderEnded" class="order__status ended">Просрочен</span>
				</div>

				<OrderTimer
					v-if="showTimer"
					:endTime="order.schedule_time"
					:currentTime="order.current_time"
					@ended="handleOrderEnd"
				/>
			</div>

			<p class="order__id">#{{ order.orderId }}</p>

			<h3 class="order__amount">{{ formattedAmount }}</h3>
		</div>
	</router-link>
</template>

<script>
import OrderTimer from "../OrderTimer.vue";
import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

export default {
	props: {
		order: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			isOrderEnded: false,
		};
	},

	computed: {
		formattedAmount() {
			return formatNumberWithSpaces(this.order.orderAmount) + " UZS";
		},

		clientFullName() {
			return this.order.orderClient.orderClientFirstName + " " + this.order.orderClient.orderClientLastName;
		},

		showTimer() {
			return this.order.orderStatus === "processing" && !this.isOrderEnded;
		},

		orderStatus() {
			let result = {
				name: "Неизвестный статус",
				color: "#000",
			};

			switch (this.order.orderStatus) {
				case "pending":
					result.name = "Готов к выдаче";
					result.color = "#7f00f8";
					break;
				case "processing":
					result.name = "Готовится";
					result.color = "#f8ae00";
					break;
				case "canceled":
					switch (this.order.orderCanceledBy) {
						case "USER":
							result.name = "Отменен юзером";
							break;
						case "BRANCH":
							result.name = "Отменен заведением";
							break;
						default:
							result.name = "Отменен";
							break;
					}
					result.color = "#F6350D";
					break;
				case "received":
					result.name = "Новый";
					result.color = "#14cc14";
					break;
				case "completed":
					result.name = "Завершен";
					result.color = "#175CD3";
					break;
			}

			return result;
		},
	},

	methods: {
		handleOrderEnd() {
			this.isOrderEnded = true;
		},
	},

	components: { OrderTimer },
};
</script>

<style lang="scss" scoped>
.order {
	display: block;
	text-decoration: none;
	background-color: $white;
	color: #101828;
	border: 1px solid #d0d5dd;
	border-radius: 0.5rem;
	padding: 1rem;
	cursor: pointer;
	&--ended {
		background-color: $primary;
		color: $white;
	}
	&__content {
		height: 100%;
	}
	&__id {
		font-size: 1.125rem;
		margin: 0.75rem 0;
		line-height: 1;
	}
	&__amount {
		font-size: 1.25rem;
		font-weight: bold;
		line-height: 1;
	}
	&__status {
		border-radius: 3rem;
		padding: 0.5rem 0.75rem;
		line-height: 1;
		color: $white;
		font-size: 0.75rem;
		&.ended {
			background-color: $white;
			color: $primary;
		}
	}
}
</style>
