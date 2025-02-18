<template>
	<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)"> Назад </CustomButton>

	<div v-if="order" class="order bg-white p-6 border-[1px] rounded-[12px]">
		<div class="order__header">
			<div class="flex justify-between items-center mb-4">
				<div class="flex gap-4">
					<div class="order__status" :style="{ backgroundColor: orderStatus.color }">
						{{ orderStatus.name }}
					</div>

					<span v-if="isOrderEnded" class="order__status ended">Просрочен</span>

					<OrderTimer
						v-if="showTimer"
						:endTime="order.schedule_time"
						:currentTime="order.current_time"
						style="font-size: 1rem; padding: 0.675rem 1rem; gap: 0.5rem"
						@ended="handleOrderEnd"
					/>
				</div>

				<div class="order__actions">
					<button class="order__actions-btn">
						<i class="fi fi-rr-call-outgoing"></i>
					</button>
				</div>
			</div>

			<h3 class="order__id">
				Номер заказа: <strong>#{{ order.orderId }}</strong>
			</h3>

			<p class="order__info">• Филиал: {{ order.orderBranches.orderBranchName }}</p>
			<p class="order__info my-2">• Заказ создан {{ orderCreatedTime }}</p>
			<p class="order__info">• Оператор: Максим Иванов</p>
		</div>

		<div class="order__details">
			<div class="order__detail">
				<div class="order__detail-icon">
					<i class="fi fi-rr-alarm-clock"></i>
				</div>

				<div class="order__detail-content">
					<p>Приготовить к:</p>
					<strong>{{ formatTime(order.orderEndedAt) || "-" }}</strong>
				</div>
			</div>

			<div class="order__detail">
				<div class="order__detail-icon">
					<i class="fi fi-rr-car-alt"></i>
				</div>

				<div class="order__detail-content">
					<p>Номер машины:</p>
					<strong>{{ order.orderClient.orderClientTransport.orderTransportNumber || "-" }}</strong>
				</div>
			</div>

			<div class="order__detail">
				<div class="order__detail-icon">
					<i class="fi fi-rr-user"></i>
				</div>

				<div class="order__detail-content">
					<p>Клиент:</p>
					<strong>
						{{ order.orderClient.orderClientFirstName }} ({{ order.orderClient.orderClientPhone }})</strong
					>
				</div>
			</div>
		</div>

		<div class="order__products">
			<h3 class="mb-2 flex items-end gap-2 leading-none">
				Товары
				<strong class="text-lg leading-none">({{ order.orderProducts.orderProductsList.length }}):</strong>
			</h3>

			<div
				v-for="(product, index) in order.orderProducts.orderProductsList"
				:key="product.orderProductName"
				class="order__products-item"
			>
				<div class="flex justify-between items-center">
					<p>{{ index + 1 }}) {{ product.orderProductName }}</p>
					<p>{{ formatPrice(product.orderProductPrice) }}</p>
				</div>

				<div v-if="product.orderModificators.length">
					<div v-for="modificator in product.orderModificators" class="flex justify-between items-center">
						<span>{{ modificator.orderModificatorName }}</span>
						<span>{{ formatPrice(modificator.orderModificatorPrice) }}</span>
					</div>
				</div>

				<span v-else>Без модификаторов</span>

				<div class="flex justify-between items-center product-total-price">
					<h4>Цена</h4>
					<h4>{{ calculateTotalPrice(product) }}</h4>
				</div>
			</div>
		</div>

		<div class="order__total">
			<div class="flex justify-between items-center">
				<span>Комиссия</span>
				<span>{{ formatPrice(order.orderCommission) }}</span>
			</div>

			<div class="flex justify-between items-center">
				<h3>Итого:</h3>
				<h3>{{ formatPrice(order.orderAmount) }}</h3>
			</div>
		</div>

		<div class="order__comment">
			<h3>Коментарии к заказу:</h3>
			<p>Побольше сахара, повкуснее пожирнее</p>
		</div>
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import OrderTimer from "./components/OrderTimer.vue";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";
import { formatDate } from "@/utils/formatters/formatDate";
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			order: null,
			isOrderEnded: false,
		};
	},

	computed: {
		...mapGetters(["getOneOrder"]),

		showTimer() {
			return this.order.orderStatus === "processing";
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

		orderCreatedTime() {
			return formatDate(this.order.orderCreatedAt, true);
		},
	},

	methods: {
		...mapActions(["fetchOneOrderById"]),

		formatPrice(price) {
			return formatNumberWithSpaces(price) + " UZS";
		},

		formatTime(isoString) {
			if (!isoString) return "-";

			const date = new Date(isoString);
			const hours = date.getHours().toString().padStart(2, "0");
			const minutes = date.getMinutes().toString().padStart(2, "0");
			return `${hours}:${minutes}`;
		},

		handleOrderEnd() {
			this.isOrderEnded = true;
		},

		calculateTotalPrice(product) {
			const basePrice = product.orderProductPrice || 0;
			const modificatorsPrice = product.orderModificators.reduce(
				(sum, mod) => sum + (mod.orderModificatorPrice || 0),
				0,
			);
			return this.formatPrice(basePrice + modificatorsPrice);
		},
	},

	async mounted() {
		const orderId = this.$route.params.order_id;

		if (orderId) {
			await this.fetchOneOrderById(orderId);
			this.order = this.getOneOrder.orders[0];
			console.log(this.order);
		} else {
			this.$router.push("/orders");
		}
	},

	watch: {
		"$route.params.order_id": {
			deep: true,

			async handler() {
				const orderId = this.$route.params.order_id;

				if (orderId) {
					await this.fetchOneOrderById(orderId);
					this.order = this.getOneOrder.orders[0];
					console.log(this.order);
				} else {
					this.$router.push("/orders");
				}
			},
		},
	},

	components: { CustomButton, OrderTimer },
};
</script>

<style lang="scss" scoped>
.order {
	h3 {
		font-size: 1.25rem;
		color: #101828;
		font-weight: bold;
	}
	h4 {
		font-size: 1.125rem;
		color: #101828;
		font-weight: bold;
	}
	span {
		color: #667085;
		font-weight: 500;
		margin: 2px 0;
	}
	&__status {
		@include flex-center;
		border-radius: 70px;
		padding: 0.675rem 1rem;
		line-height: 1;
		color: $white;
		&.ended {
			background-color: $primary;
			color: $white;
		}
	}
	&__actions {
		// @include flex-center-vert;
		display: none;
		gap: 0.5rem;
		&-btn {
			@include flex-center;
			width: 3rem;
			height: 3rem;
			border-radius: 0.75rem;
			cursor: pointer;
			background-color: $white;
			border: 1px solid #eaecf0;
			& > i {
				font-size: 1.2rem;
				color: #344054;
			}
		}
	}
	&__id {
		font-size: 1.125rem;
		color: #101828;
		font-weight: bold;
		margin-bottom: 0.25rem;
	}
	&__info {
		font-size: 1rem;
		color: #667085;
		line-height: 1;
	}
	&__details {
		@include grid(3, 1rem);
		margin: 1rem 0;
		gap: 1rem;
	}
	&__detail {
		@include flex-center;
		gap: 1rem;
		border: 2px solid #5a5a5a;
		padding: 1rem;
		border-radius: 0.75rem;
		color: #1d2939;
		&-icon {
			@include flex-center;
			font-size: 2rem;
			background-color: #5a5a5a;
			color: $white;
			border-radius: 0.75rem;
			width: 4rem;
			height: 4rem;
			flex-shrink: 0;
		}
		&-content {
			p {
				font-size: 1rem;
				margin-bottom: 4px;
			}
			strong {
				display: block;
				line-height: 1;
				font-size: 1.125rem;
				font-weight: bold;
			}
		}
	}
	&__products {
		&-item {
			border-bottom: 1px solid rgba($color: #8a8f93, $alpha: 0.16);
			padding-bottom: 1rem;
			margin-bottom: 1rem;
			p {
				font-size: 1.125rem;
				color: #101828;
			}
		}
	}
	&__comment {
		border-top: 1px solid rgba(138, 143, 147, 0.16);
		padding-top: 1rem;
		margin-top: 1rem;
		p {
			color: #667085;
		}
	}
}
</style>
