<template>
    <div class="order__card__line 
              bg-white w-full flex justify-between 
              items-center border border-gray-300 shadow-md 
              rounded-lg p-[1.25rem_3rem]"
              :class="{'pulse-animation': isTimeEnded}"
    >
      <div class="order__card__line__content flex items-center justify-center gap-12 w-full">
        <div class="order__card__line__progress flex flex-col items-center justify-center text-center">
          <h2 class="order__card__line__number text-default
                    p-[2px_15px] bg-[#ABEFC6] border-[1px] border-[#35C768]
                    rounded-[100px] transition-all ease-in-out duration-300 
                    hover:bg-[#35C768] hover:text-white"
          >
            #{{ card.orderId }}
          </h2>
          <div class="mt-2">
            <CircleProgressBar timer="5" :color="'#F8AE00'" />
          </div>
        </div>
  
        <div class="order__card__line__info flex items-center justify-around gap-10 w-full">
          <div class="order__card__line__client-info text-sm space-y-2 w-[250px]">
            <div class="order__card__line__client-info-item flex gap-2">
              <img src="@/assets/images/clients/client1.svg" alt="Client" class="order__card__line__client-info-icon h-6" />
              <p class="order__card__line__client-name text-default font-medium">
                {{ card.orderClient.orderClientFirstName }} 
                {{ card.orderClient.orderClientLastName }}
              </p>
            </div>
            <div class="order__card__line__client-info-item flex gap-2">
              <img src="@/assets/images/phone/phone.svg" alt="Phone" class="order__card__line__client-info-icon h-6" />
              <a :href="'tel:' + card.orderClient.orderClientPhone" class="order__card__line__client-phone text-m text-gray-600" @click.prevent.stop>
                {{ card.orderClient.orderClientPhone }}
              </a>
            </div>
          </div>
  
          <div class="order__card__line__operator-info flex justify-around w-full">
            <div class="order__card__line__operator-right">
              <p class="order__card__line__operator-label font-medium text-m text-gray-600">Приготовить к:</p>
              <p class="order__card__line__operator-time font-bold">{{ card.orderPreparedTime || 'Не указанно' }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="order__card__line__amount flex flex-wrap items-center w-[250px]">
        <div class="order__card__line__amount-text text-1xl font-bold">
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
        required: true,
      }
    },
  
    data() {
      return {
        isTimeEnded: false, 
      };
    },
    mounted() {
      // Example logic to update isTimeEnded after 5 seconds
      setTimeout(() => {
        this.isTimeEnded = true;
      }, 5000);
    },
  
    computed: {
      formattedOrderAmount() {
        return formatNumberWithSpaces(this.card.orderAmount);
      },
    }
  };
  </script>
  
  <style scoped>
  .order__card__line {
    transition: transform 0.5s ease, box-shadow 0.5s ease, background-color 0.3s ease, border 0.3s ease;
  }
  
  .pulse-animation {
    animation: gentle-pulse 1.5s ease-in-out infinite, soft-shadow 2s ease-in-out infinite;
    transition: all transform 0.3s ease, box-shadow 0.3s ease, background-color 2s ease;
  }
  
  @keyframes gentle-pulse {
    0% {
      transform: scale(1);
      background: linear-gradient(135deg, #ffffff, #f0f0f0);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
    }
    30% {
      transform: scale(1.01);
      background: linear-gradient(135deg, #f8ae00, #f2d12c);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      border-radius: 14px;
    }
    60% {
      transform: scale(1.01) ;
      background: linear-gradient(135deg, #f8ae00, #f2d12c); 
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      border-radius: 14px;
    }
    100% {
      transform: scale(1);
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
  