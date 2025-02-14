<template>
	<div class="order-card-tile bg-white w-[210px] h-[250px] flex flex-col justify-between hover-card-animation items-center border border-gray-300 shadow-md rounded-lg p-5 pt-2"
		 :class="{'pulse-animation': isTimeEnded}">
		<div class="order-card-tile__content flex flex-col items-center gap-2 w-full h-full">
			<div class="order-card-tile__progress flex items-center justify-center text-center gap-4">
				<h2 class="order-card-tile__number text-default p-[2px_15px] bg-[#ABEFC6] border-[1px] border-[#35C768] rounded-full">#{{ card.orderId }}</h2>
				<div class="mt-2">
					<CircleProgressBar timer="5" :color="'#F8AE00'" />
				</div>
			</div>

			<div class="order-card-tile__info flex flex-col items-center justify-around gap-4 w-full">
				<div class="order-card-tile__client-info text-sm space-y-2">
					<div class="order-card-tile__client-info-item flex justify-center items-center gap-2">
						<img src="@/assets/images/clients/client1.svg" alt="Client" class="order-card-tile__client-info-icon h-7" />
						<div>
							<p class="order-card-tile__client-name text-m font-medium">
								{{ card.orderClient.orderClientFirstName }} 
								{{ card.orderClient.orderClientLastName }}
							</p>
							<p class="order-card-tile__client-phone text-l text-gray-600">{{ card.orderClient.orderClientPhone }}</p>
						</div>
					</div>
				</div>

				<div class="order-card-tile__operator-info flex justify-around w-full">
					<div class="order-card-tile__operator-right">
						<p class="order-card-tile__operator-label font-medium text-l text-gray-600">Приготовить к:</p>
						<p class="order-card-tile__operator-time font-bold text-m">{{ card.orderPreparedTime || 'Не указанно' }}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="order-card-tile__divider w-full border-t border-gray-600 my-2"></div>

		<div class="order-card-tile__amount flex flex-wrap justify-center items-center w-[80%]">
			<div class="order-card-tile__amount-text text-xl font-bold text-center ">
				{{ formattedOrderAmount }} UZS
			</div>
		</div>
	</div>
</template>

<script>
import CircleProgressBar from "./CircleProgressBar.vue";
import formatNumberWithSpaces from "@/utils/formatNumbers";

export default {
	components: {
		CircleProgressBar,
	},

	props: {
		card: {
			type: Object,
			required: false
		}
	},

	data() {
		return {
			isTimeEnded: false
		};
	},

	computed: {
		formattedOrderAmount() {
			return formatNumberWithSpaces(this.card.orderAmount);
		}
	},

	mounted() {
		setTimeout(() => {
			this.isTimeEnded = true;
		}, 5000); 
	}
};
</script>

<style scoped>
.order-card-tile {
	transition: transform 0.5s ease, box-shadow 0.5s ease, background-color 0.3s ease, border 0.3s ease;
}

.pulse-animation {
	animation: gentle-pulse 3s ease-in-out infinite, soft-shadow 2s ease-in-out infinite;
	transition: all transform 0.3s ease, box-shadow 0.3s ease, background-color 2s ease;
}

@keyframes gentle-pulse {
	0% {
		transform: scale(1) rotate(0deg);
		background: linear-gradient(135deg, #ffffff, #f0f0f0);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;
	}
	30% {
		transform: scale(1.03) rotate(-1deg);
		background: linear-gradient(135deg, #f8ae00, #f2d12c);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
		border-radius: 14px;
	}
	60% {
		transform: scale(1.03) rotate(1deg);
		background: linear-gradient(135deg, #f8ae00, #f2d12c);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
		border-radius: 14px;
	}
	100% {
		transform: scale(1) rotate(0deg);
		background: linear-gradient(135deg, #ffffff, #f0f0f0);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;
	}
}

@keyframes soft-shadow {
	0% {
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	}
	50% {
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
	}
	100% {
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	}
}
</style>
