<template>
    <div 
        class="order__card hover-card-animation bg-white max-w-[260px] w-full border-[1px] shadow-soft rounded-[12px]" 
        :class="{'pulse-animation': isTimeEnded}"
    >
        <div class="order__card-container p-[16px] flex justify-between items-center">
            <div class="order__card-info" v-if="card">
                <h2 class="order__id text-[16px]">#{{ card.orderId }}</h2>
                <div class="order__container-transaction flex gap-[20px] mt-[15px]">
                    <h3 class="order__amount font-bold text-[18px]">
                        {{ formattedOrderAmount }} UZS
                    </h3>
                </div>
            </div>
            <div class="order__card-progress flex items-center">
                <CircleProgressBar 
                    :timer="timer" 
                    :color="'#F8AE00'"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CircleProgressBar from './CircleProgressBar.vue';
import formatNumberWithSpaces from "@/utils/formatNumbers";

export default {
    components: {
        CircleProgressBar,
    },

    props: {
        paymentMethod: {
            type: String,
            required: true,
            default: 'cash'
        },

        card: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            isTimeEnded: false,
            timer: 10, 
        };
    },

    computed: {
        formattedOrderAmount() {
            return formatNumberWithSpaces(this.card.orderAmount);
        },
    },

    mounted() {
        this.startTimer();
    },

    methods: {
        startTimer() {
            setTimeout(() => {
                this.isTimeEnded = true; 
            }, this.timer * 1000);
        }
    }
};
</script>

<style>
.pulse-animation {
    animation: gentle-pulse 3s ease-in-out infinite, soft-shadow 2s ease-in-out infinite;
    transition: all transform 0.3s ease, box-shadow 0.3s ease, background 2s ease;
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
