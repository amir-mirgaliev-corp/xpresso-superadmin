<template>
	<router-link :to="`/order/${order.orderId}`" :class="['order', { 'order--ended': isOrderEnded }]">
		<div class="order__wrapper">
			<div class="order__content">
				<div class="flex items-center gap-2">
					<span class="order__status" :style="{ backgroundColor: orderStatus.color }">
						{{ orderStatus.name }}
					</span>

					<span v-if="isOrderEnded" class="order__status ended">Просрочен</span>
				</div>

				<p class="order__id">#{{ order.orderId }}</p>

				<h3 class="order__amount">{{ formattedAmount }}</h3>
			</div>

			<div v-if="showTimer" class="order__timer">
				<ProgressTimer
					:startTime="order.orderCreatedAt"
					:endTime="order.orderEndedAt || ''"
					:currentTime="order.orderCurrentTime"
					@ended="handleOrderEnd"
				/>
			</div>
		</div>
	</router-link>
</template>

<script>
import ProgressTimer from "../ProgressTimer.vue";
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
			this.order.orderStatus === "processing" && !this.isOrderEnded;
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
							result.name = "Отменено пользователем";
							break;
						case "BRANCH":
							result.name = "Отменено заведением";
							break;
						default:
							result.name = "Отменено";
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

	components: { ProgressTimer },
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
	.order__wrapper {
		@include flex-center-sb;
		height: 100%;
		.order__id {
			font-size: 1.125rem;
			margin: 0.75rem 0;
			line-height: 1;
		}
		.order__amount {
			font-size: 1.25rem;
			font-weight: bold;
			line-height: 1;
		}
	}
	&__status {
		border-radius: 16px;
		padding: 0.325rem 0.75rem;
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
