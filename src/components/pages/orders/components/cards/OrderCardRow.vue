<template>
	<router-link :to="`/order/${order.orderId}`" :class="['order', { 'order--ended': isOrderEnded }]">
		<div class="order__wrapper">
			<div class="order__column flex items-center">
				<div class="flex gap-2">
					<p class="order__id">#{{ order.orderId }}</p>

					<span class="order__status" :style="{ backgroundColor: orderStatus.color }">
						{{ orderStatus.name }}
					</span>

					<span v-if="isOrderEnded" class="order__status ended">Просрочен</span>
				</div>

				<div v-if="showTimer" class="order__timer">
					<ProgressTimer
						:startTime="order.orderCreatedAt"
						:endTime="order.orderEndedAt || ''"
						:currentTime="order.orderCurrentTime"
						@ended="isOrderEnded = true"
					/>
				</div>
			</div>

			<div class="order__column">
				<div class="order__client">
					<div class="order__client-info">
						<i class="fi fi-rr-user"></i>
						{{ clientFullName }}
					</div>

					<div class="order__client-info">
						<i class="fi fi-rr-phone-flip rotate-90"></i>
						{{ order.orderClient.orderClientPhone }}
					</div>
				</div>
			</div>

			<div class="order__column">
				<div class="order__info">Приготовить к <strong>10:45</strong></div>
				<div class="order__info">Оператор: <strong>Максим Иванов</strong></div>
			</div>

			<div class="order__column">
				<h2 class="order__amount">{{ formattedAmount }}</h2>
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
	height: 100%;
	color: #101828;
	border-radius: 1rem;
	padding: 1.75rem 1.5rem;
	border: 1px solid #d0d5dd;
	cursor: pointer;
	&--ended {
		background-color: $primary;
		color: $white;
		.order__id {
			background: $white;
			color: #000;
		}
		.order__wrapper .order__client-info {
			color: $white;
			i {
				color: $white;
			}
		}
	}
	.order__id {
		font-weight: normal;
		font-size: 0.875rem;
		padding: 0.5rem 0.875rem;
		background-color: #abefc6;
		background: linear-gradient(0deg, #abefc6, #abefc6),
			linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
		border-radius: 80px;
		text-align: center;
		line-height: 1;
	}
	.order__info {
		font-size: 1rem;
		line-height: 1;
		&:not(:last-child) {
			margin-bottom: 0.75rem;
		}
	}
	.order__amount {
		font-size: 1.25rem;
		font-weight: bold;
	}
	.order__wrapper {
		display: grid;
		grid-template-columns: repeat(4, auto);
		grid-gap: 2rem;
		align-items: center;
		.order__client {
			&-info {
				@include flex-center-vert;
				gap: 0.5rem;
				font-weight: 500;
				color: #101828;
				line-height: 1;
				& > i {
					font-size: 1.25rem;
				}
				&:not(:last-child) {
					margin-bottom: 1rem;
				}
			}
		}
	}
	&__status {
		@include flex-center;
		border-radius: 80px;
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
