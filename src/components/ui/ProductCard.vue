<template>
    <div class="productcard__container w-[290px] h-[350px] rounded-[20px] border border-[#eaecf0] shadow-lg flex flex-col items-center justify-between p-4">
        <div class="productcard__image">
            <img :src="baseUrl + product.photo" alt="Product Image" class="w-auto h-[140px] rounded-md" />
        </div>
        <div class="productcard__contact">
            <p class="text-sm font-bold">Название:
                <span class="font-normal">
                    {{ product.name.ru }}
                </span>
            </p>
            <p class="text-sm font-bold">Время Приготовления: 
                <span class="font-normal">
                    {{ product.maxTime }} 
                </span>
            </p>
            <!-- <p class="text-sm  font-bold">Вынос к заказчику: 
                <span class="font-normal">
                    {{ takeawayCustomer }}
                </span>
            </p> -->
            <div class="w-full h-[3px] my-4 bg-[#FF4500] rounded-full flex justify-center items-center"></div>
            <p class="mt-2 text-lg font-bold flex justify-center items-center">Цена: 
                {{ price }} UZS
            </p>
        </div>
        <Button 
            class="mt-2 bg-orange-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-orange-600"
            text="Изменить"
            width="120px"
            height="40px"
            color="#fff"
            bgColor="#FF4500"
            borderWidth="0px"
        />
    </div>
</template>

<script>
import Button from './Button.vue';
import formatNumberWithSpaces from '@/utils/formatNumbers';

const env = import.meta.env;

export default {
    data: () => ({
        baseUrl: env.VITE_APP_STATIC_URL
    }),

    computed: {
        price () {
            return formatNumberWithSpaces(this.product.price);
        }
    },

    components: {
        Button,
    },

    props: {
        product: {
            type: Object,
            required: true
        }
    },
};
</script>
