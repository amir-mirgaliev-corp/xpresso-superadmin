<template>
    <div class="order__element w-full bg-white 
                border-[1px] rounded-[12px] shadow-order" 
         v-if="order && id">
        <div class="order__element-container p-[20px]">
            <div class="order__head flex justify-between">
                <Status :message="statusText" /> 
                <div class="order__element-icons flex gap-[10px]" v-if="order.orderClient">
                    <a :href="'tel:' + order.orderClient.orderClientPhone" class="oreder__phone-icon 
                        inline-block p-[12px] border-[2px] 
                        rounded-[10px] shadow-drop"
                    >
                        <Phone />
                    </a>
                    <span class="order__map-icon
                        inline-block p-[12px] border-[2px] 
                        rounded-[10px] shadow-drop cursor-pointer"
                    >
                        <Map />
                    </span>
                </div>
            </div>  
            <div class="order__element-info">
                <h2 class="order__id text-[18px] font-bold">#{{ order.orderId }}</h2>
                <div class="order__info-data flex">
                    <p class="order__info-text text-gray-500">{{ order.orderBranches?.orderBranchName }}</p>
                    <span class="order__info-snap m-[0_10px] text-gray-600">•</span>
                    <p class="order__info-text text-gray-500">Заказ создан в: {{ order.orderCreatedAt ? `${order.orderCreatedAt.split('T')[0].split('-').reverse().join('-')} ${order.orderCreatedAt.split('T')[1].substring(0, 5)}` : 'не указано' }} </p></div>
            </div>
            <div class="oreder__user-info flex justify-between mt-[30px]">
                <div class="oreder__user-item pr-[30px]" 
                    :class="index !== userData.length - 1 ? 'border-r-[1px]' : null"
                    v-for="(item, index) in userData" :key="item"
                    :style="{
                        display: item.text ? 'flex-col' : 'none',
                        alignItems: 'center'
                    }"
                >
                    <h2 class="order__user-title font-bold text-[18px]">{{ item.title }}</h2>
                    <div class="flex gap-[10px] items-center">
                        <p class="order__user-text mt-[10px]" v-if="item.text">{{ item.text }}</p>
                        <span class="user__item-color inline-block w-[15px] h-[15px] rounded-full mt-[10px]" :style="{ backgroundColor: item.hex }" v-if="item.hex"></span>
                    </div>
                </div>
            </div>
            <div class="order__products mt-[30px] border-b-[1px] pb-[30px]">
                <h1 class="order__products-title font-bold text-[22px]">Заказы</h1>

                <div class="order__products-item mt-[20px]" v-for="order in productsData" :key="order.id">
                    <div class="order__product-details flex justify-between mb-[20px]">
                        <h2 class="order__products-name font-bold text-[18px]">{{ order.productsName }}</h2>
                        <h2 class="order__product-price font-bold text-[18px]">{{ amount }} UZS</h2>
                    </div>

                    <div v-if="order.modificators && order.modificators.length" class="order__modificators">
                        <div v-for="mod in order.modificators" :key="mod.id" class="order__modificator-item flex justify-between mb-[10px]">
                            <h2 class="order__modificator-name text-[#667085] text-[15px]">{{ modificator.modificatorName }}</h2>
                            <h2 class="order__modificator-price text-[#667085] text-[15px]">{{ amount }} UZS</h2>
                        </div>
                    </div>

                    <div class="order__total flex justify-between mt-[15px] font-bold text-[18px]">
                        <h2 class="order__total-text">Общая цена:</h2>
                        <h2 class="order__total-price">{{ order.totalPrice }} UZS</h2>
                    </div>
                </div>
            </div>

            <div class="order__products mt-[30px] border-b-[1px] pb-[30px]">
                <h1 class="order__products-title font-bold text-[22px]">Посуда</h1>
                <div class="order__products-item flex justify-between mt-[20px] mb-[20px]" v-for="item in dishesData" :key="item">
                    <h2 class="order__products-name text-[#101828] text-lg font-semibold"> {{ item.dishesName }}</h2>
                    <div class="order__products-action flex justify-between gap-[20px]"> 
                        <h2 class="order__product-price text-[#101828] text-lg font-semibold">{{ amount }} UZS</h2>
                    </div>
                </div>
            </div>
            <div class="order__products mt-[30px] border-b-[1px] pb-[30px]">
                <h1 class="order__products-title font-bold text-[22px]">Коментарии к заказу:</h1>
                <div class="order__products-item flex justify-between mt-[20px] mb-[20px] pb-[20px]">
                    <div class="order__products-action flex justify-between gap-[20px]"> 
                        <p class="order__product-price text-[#667085] text-[16px]">{{ orderComment }}</p>
                    </div>
                </div>
            </div>
            <div class="order__pricelist mt-[30px]">
                <div class="order__deliver flex justify-between text-gray-500">
                    <h3 class="order__deliver-title">Сервис</h3>
                    <p class="order__deliver-price">{{ commission }} UZS</p>
                </div>
                <div class="order__deliver flex justify-between text-gray-500">
                    <h3 class="order__deliver-title">Посуда</h3>
                    <p class="order__deliver-price">{{  }}</p>
                </div>
                <div class="order__price flex justify-between font-bold text-[20px] mt-[10px]">
                    <h3 class="order__price-title">Итого</h3>
                    <p class="order__price-price">{{ amount  }} UZS</p>
                </div>
            </div>
            <div class="order__button-container flex gap-[20px] mt-[50px]" v-if="order.orderStatus === 'received'">
                <ApplyButton @click="updateStatus('pending')"/>
                <CancelButton @click="updateStatus('canceled')"/>
            </div>
        </div>

        <Loading v-if="loading" />
        <GoogleMapAPI />
    </div>
</template>

<script>

import Status from './Status.vue';
import Phone from '../icons/order/Phone.vue';
import Map from '../icons/order/Map.vue';
import Delete from '../icons/order/Delete.vue';
import ApplyButton from './ApplyButton.vue';
import CancelButton from './CancelButton.vue';
import GoogleMapAPI from './GoogleMapAPI.vue';
import Loading from '@/views/Loading.vue';

import formatPhoneNumber from '@/utils/formatPhone';
import formatNumberWithSpaces from '@/utils/formatNumbers';

import { mapActions, mapGetters } from 'vuex';

import orders from '@/api/orders';

export default {
    data: () => ({
        statusText: 'Новое',
        commission: 0,
        loading: false,
        order: {},
        userData: [
            {
                title: 'Приготовить к',
                text: '10:45'
            },
            {
                title: 'Марка и номер машины',
                text: '01 A111 AAA',
                hex: '' 
            },
            {
                title: 'Клиент',
                text: 'Мария  (+998) 93 461-41-88)'
            },
        ],

        productsData: [
            {
                productsName: 'Капучино',
                productPrice: '40 000',
            },
            {
                productsName: 'Латте',
                productPrice: '20 000',
            },
            {
                productsName: 'Американо',
                productPrice: '50 000',
            },
        ],
        
        dishesData: [
            {
                dishesName: 'Вилка',
                productPrice: '3 000',
            },
            {
                dishesName: 'Ложка',
                productPrice: '3 000',
            },
            
        ],

        modificator: [
            {
                modificatorName: 'Сахар',
                modificatorPrice: '3 000',
            },
            {
                modificatorName: 'Ложка',
                modificatorPrice: '3 000',
            },
            
        ],
        
    }),

    props: {
        id: {
            type: Number,
            required: false
        },
        orderComment: {
            default: 'Без сахара и больше молока меньше льда и сиропа'
        },
    },

    computed: {
        ...mapGetters([
            'getOneOrder',
            'getCommission'
        ]),

        amount () {
            return formatNumberWithSpaces(+this.order.orderAmount + +this.commission);
        }
    },

    methods: {
        ...mapActions([
            'fetchOneOrderById',
            'fetchCommission'
        ]),

        setUserData () {
            this.userData[0].text = this.order.orderPreparedTime || 'Через 20 минут';
            this.userData[1].text = this.order.orderClient.orderClientTransport.orderTransportNumber ? 
                                    `${this.order.orderClient.orderClientTransport.orderTransportName} ${this.order.orderClient.orderClientTransport.orderTransportNumber}` : 
                                    'Не указано';

            this.userData[1].hex = this.order.orderClient.orderClientTransport.orderTransportColor ? 
                                    this.order.orderClient.orderClientTransport.orderTransportColor.orderTransportColorHex : '';
            this.userData[2].text = `${this.order.orderClient.orderClientFirstName} (${formatPhoneNumber(this.order.orderClient.orderClientPhone)})`;
        },

        setProductData () {
            this.productsData = this.order.orderProducts.orderProductsList.map((product) => {
            return {
                productsName: product.orderProductName,
                productPrice: product.orderProductPrice,
                productCount: '2'
            }
            });
        },

        async updateStatus (status) {
            this.loading = true;
            const updatedOrder = await orders.updateOrder(this.id, {status});

            if (updatedOrder) {
                this.order.orderStatus = status;
                this.loading = false;
                this.$router.push(this.$route.path);
            }
        },

        async setAllData () {
            await this.fetchOneOrderById(this.id);
            await this.fetchCommission();

            this.order = this.getOneOrder.orders[0];
            this.commission = this.getCommission[0].amount;

            this.setUserData();
            this.setProductData();
        }
    },

    async mounted () {
        await this.setAllData();
    },

    watch: {
        id: {
            deep: true,
            immediate: true,

            async handler () {
                this.setAllData();
            }
        }
    },

    components: {
        GoogleMapAPI,
        CancelButton,
        ApplyButton,
        Loading,
        Delete,
        Status,
        Phone,
        Map,
    }
}

</script>

<style scoped>
.order__user-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.order__user-text {
    min-width: 0;
}
</style>


