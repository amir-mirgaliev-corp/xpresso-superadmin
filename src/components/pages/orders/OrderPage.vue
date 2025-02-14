<template>
	<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)"> Назад </CustomButton>

	<div v-if="order" class="order bg-white p-6 border-[1px] rounded-[12px]">
		<div class="order__header">
			<div class="flex justify-between items-center mb-4">
				<div class="order__status" :style="{ backgroundColor: orderStatus.color }">{{ orderStatus.name }}</div>

				<div class="order__actions">
					<button class="order__actions-btn">
						<i class="fi fi-rs-map"></i>
					</button>

					<button class="order__actions-btn">
						<i class="fi fi-rr-call-outgoing"></i>
					</button>
				</div>
			</div>

			<h3 class="order__id">#{{ order.orderId }}</h3>

			<p class="order__info">
				{{ order.orderBranches.orderBranchName }} • Заказ создан в
				{{ orderCreatedTime }}
			</p>
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
			<h3 class="mb-[4px]">Заказы:</h3>

			<div
				v-for="product in order.orderProducts.orderProductsList"
				:key="product.orderProductName"
				class="order__products-item"
			>
				<div class="flex justify-between items-center">
					<p>{{ product.orderProductName }}</p>
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

		<div v-if="order.orderComment" class="order__comment my-4">
			<h3>Коментарии к заказу:</h3>
			<p>{{ order.orderComment }}</p>
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

		<div
			v-if="['received', 'processing', 'pending'].includes(order.orderStatus)"
			class="order__controls grid grid-cols-2 gap-4 mt-4"
		>
			<CustomButton class="h-14" @click="updateOrderStatus">{{ submitButtonText }}</CustomButton>
			<CustomButton type="secondary" class="h-14" @click="cancelModalOpen = true">Отменить заказ</CustomButton>
		</div>
	</div>

	<OrderCancelModal v-if="cancelModalOpen" @close="cancelModalOpen = false" />
</template>

<script>
import CustomButton from "@/components/shared/CustomButton.vue";
import OrderCancelModal from "./OrderCancelModal.vue";

import formatNumberWithSpaces from "@/utils/formatNumbers";
import { mapGetters, mapActions } from "vuex";

import orders from "@/api/orders";

export default {
	data() {
		return {
			order: null,
			cancelModalOpen: false,
		};
	},
	computed: {
		...mapGetters(["getOneOrder"]),

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
							result.name = "Отменено администратором";
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

		orderCreatedTime() {
			const date = new Date(this.order.orderCreatedAt);
			const hours = date.getHours().toString().padStart(2, "0");
			const minutes = date.getMinutes().toString().padStart(2, "0");
			return `${hours}:${minutes}`;
		},

		submitButtonText() {
			let result = "Продолжить";

			switch (this.order.orderStatus) {
				case "received":
					result = "Принять заказ";
					break;
				case "processing":
					result = "Готов к выдаче";
					break;
				case "pending":
					result = "Выдан";
					break;
			}

			return result;
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

		calculateTotalPrice(product) {
			const basePrice = product.orderProductPrice || 0;
			const modificatorsPrice = product.orderModificators.reduce(
				(sum, mod) => sum + (mod.orderModificatorPrice || 0),
				0,
			);
			return this.formatPrice(basePrice + modificatorsPrice);
		},

		async updateOrderStatus() {
			const response_status = await orders.changeOrderStatus(this.$route.params.order_id);
			if (response_status === 200) location.reload();
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

	components: {
		CustomButton,
		OrderCancelModal,
	},
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
		border-radius: 70px;
		padding: 0.675rem 1rem;
		line-height: 1;
		color: $white;
	}
	&__actions {
		@include flex-center-vert;
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
		padding: 1rem 0;
		margin: 1rem 0;
		align-items: center;
		border-top: 2px dashed $primary;
		border-bottom: 2px dashed $primary;
	}
	&__detail {
		@include flex-center;
		gap: 1rem;
		&:nth-child(2) {
			border-left: 2px solid $primary;
			border-right: 2px solid $primary;
		}
		&-icon {
			font-size: 2.25rem;
			color: $primary;
		}
		&-content {
			color: #101828;
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
		p {
			color: #667085;
		}
	}
}
</style>
