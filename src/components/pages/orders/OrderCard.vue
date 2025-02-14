<template>
	<router-link :to="`/order/${order.orderId}`" :class="[layout, 'order', { 'order--ended': isOrderEnded }]">
		<div v-if="layout === 'grid'" class="order__wrapper">
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

			<div class="order__timer">
				<ProgressTimer
					v-if="order.orderStatus === 'processing' && !isOrderEnded"
					:startTime="order.orderCreatedAt"
					:endTime="order.orderEndedAt || ''"
					:currentTime="order.orderCurrentTime"
					@ended="isOrderEnded = true"
				/>
			</div>
		</div>

		<div v-if="layout === 'column'" class="order__wrapper">
			<div class="order__top">
				<p class="order__id">#{{ order.orderId }}</p>

				<div class="order__timer">
					<ProgressTimer
						v-if="order.orderStatus === 'processing' && !isOrderEnded"
						:startTime="order.orderCreatedAt"
						:endTime="order.orderEndedAt || ''"
						:currentTime="order.orderCurrentTime"
						@ended="isOrderEnded = true"
					/>
				</div>
			</div>

			<div class="order__client">
				<i class="fi fi-rr-user"></i>

				<div>
					<h4>{{ clientFullName }}</h4>
					<p>{{ order.orderClient.orderClientPhone }}</p>
				</div>
			</div>

			<div class="order__info-wrapper">
				<div class="order__info">
					<p>Приготовить к</p>
					<h3>10:45</h3>
				</div>
			</div>

			<h2 class="order__amount">{{ formattedAmount }}</h2>
		</div>

		<div v-else-if="layout === 'line'" class="order__wrapper">
			<div class="order__column flex items-center gap-6">
				<p class="order__id">#{{ order.orderId }}</p>

				<div class="order__timer">
					<ProgressTimer
						v-if="order.orderStatus === 'processing' && !isOrderEnded"
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
				<div class="order__info">
					<p>Приготовить к</p>
					<h3>10:45</h3>
				</div>
			</div>

			<div class="order__column">
				<h2 class="order__amount">{{ formattedAmount }}</h2>
			</div>
		</div>
	</router-link>
</template>

<script>
import ProgressTimer from "./ProgressTimer.vue";
import formatNumberWithSpaces from "@/utils/formatNumbers";

export default {
	props: {
		order: {
			type: Object,
			required: true,
		},
		layout: {
			type: String,
			required: true,
		},
		status: String,
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
						case "ADMIN":
							result.name = "Отменен админом";
							break;
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

	components: {
		ProgressTimer,
	},
};
</script>

<style lang="scss" scoped>
.order {
	display: block;
	text-decoration: none;
	background-color: $white;
	height: 100%;
	color: #101828;
	cursor: pointer;
	&--ended {
		background-color: $primary;
		color: $white;
		&.column {
			.order__client > i {
				color: $white;
			}
			.order__info-wrapper {
				border-bottom-color: $white !important;
			}
		}
		&.line {
			.order__wrapper .order__client-info {
				color: $white !important;
				i {
					color: $white;
				}
			}
		}
		&.column,
		&.line {
			.order__id {
				background: $white !important;
				color: #000 !important;
			}
		}
	}
	&.grid {
		border: 1px solid #eaecf0;
		border-radius: 0.75rem;
		padding: 1rem;
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
	}
	&.line,
	&.column {
		.order__id {
			font-weight: normal;
			font-size: 1rem;
			padding: 8px 8px;
			background-color: #abefc6;
			background: linear-gradient(0deg, #abefc6, #abefc6),
				linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
			border-radius: 80px;
			min-width: 70px;
			text-align: center;
			line-height: 1;
		}
		.order__info {
			p {
				font-size: 1rem;
				margin-bottom: 4px;
			}
			h3 {
				font-size: 1.25rem;
				font-weight: bold;
				line-height: 1;
			}
		}
		.order__amount {
			font-size: 1.25rem;
			font-weight: bold;
		}
	}
	&.column {
		border-radius: 1.25rem;
		padding: 1rem;
		.order__top {
			@include flex-center-sb;
		}
		.order__client {
			@include flex-center;
			margin: 0.5rem 0;
			gap: 0.5rem;
			& > i {
				font-size: 1.25rem;
			}
			h4 {
				font-weight: bold;
				font-size: 14px;
			}
			p {
				font-size: 14px;
			}
		}
		.order__info-wrapper {
			padding-bottom: 12px;
			margin-bottom: 14px;
			border-bottom: 1px solid #101828;
			p {
				font-size: 14px;
				margin-bottom: 2px;
			}
			h3 {
				font-size: 16px;
			}
		}
	}
	&.line {
		border-radius: 1.25rem;
		padding: 1.75rem 1.5rem;
		filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
		.order__wrapper {
			display: grid;
			grid-template-columns: 1fr 1.5fr 1fr 1fr 2fr;
			grid-gap: 2rem;
			align-items: center;
			.order__client {
				&-info {
					@include flex-center-vert;
					gap: 0.5rem;
					font-weight: 500;
					color: #101828;
					& > i {
						font-size: 1.25rem;
					}
					&:not(:last-child) {
						margin-bottom: 0.75rem;
					}
				}
			}
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
