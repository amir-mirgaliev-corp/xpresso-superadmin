<template>
    <div class="flex w-full items-center p-[40px]
              bg-white rounded-[30px] shadow-md
              text-gray-600 transition duration-300 hover:shadow-lg"
        v-if="branch"
    >

        <div class="branch__card-image-container w-[100px] h-[100px] rounded-full mr-[30px]">
            <img :src="baseUrl + branch.logo" alt="" class="branch__card-image w-[100px] h-[100px] rounded-full">
        </div>

        <div class="flex flex-col flex-grow min-w-[200px]">
            <h2 class="text-[30px] font-semibold
                       leading-none text-gray-800"
            >
                {{ branch.name }}
            </h2>
            <!-- <div class="mt-2 text-lg">
                {{ region }}
            </div> -->
            <div class="mt-2 text-[16px]">
                Адрес: {{ branch.address }}
            </div>
        </div>

        <div class="flex flex-col flex-grow items-start min-w-[260px]">
            <div class="text-[20px] font-bold text-[#555B70]">
                Время работы
            </div>
            <div class="mt-2 text-[16px] font-medium text-[#555B70]">
                По будням:  {{ workingHours }}
            </div> 
        </div>

        <div class="flex flex-col items-center gap-2 min-w-[90px]">
            <a :href="branch.phone ? 'tel:' + branch.phone : '#'" class="flex flex-col items-center focus:outline-none group">
                <Phone :strokeWidth="2.5" class="w-8 h-8 text-blue-400 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:text-blue-400 group-hover:drop-shadow-md" />
                <span class="mt-2 text-xs font-bold uppercase text-blue-400 transition-all duration-500 group-hover:text-blue-400 group-hover:tracking-wider">
                Телефон
                </span>
            </a>
        </div>


        <div class="flex flex-col items-center gap-2 min-w-[90px]">
            <router-link :to="`/restaurants/map/${branch.id}`" class="flex flex-col items-center focus:outline-none group">
                <Map class="w-8 h-8 text-blue-400 transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:text-blue-400 group-hover:drop-shadow-lg" />
                <span class="mt-2 text-xs font-bold uppercase text-blue-400 transition-all duration-500 group-hover:text-blue-400 group-hover:tracking-wide">
                    Карта
                </span>
            </router-link>
        </div>

        <div class="flex flex-col items-center gap-2 min-w-[90px]">
            <router-link :to="`/restaurants/menu/${branch.id}`" class="flex flex-col items-center focus:outline-none group">
                <Menu class="w-8 h-8 text-[#20B2AA] transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-[360deg] group-hover:text-[#008B8B]" />
                <span class="mt-2 text-xs font-bold uppercase text-[#20B2AA] transition-all duration-500 group-hover:text-[#008B8B] group-hover:tracking-widest">
                    Меню
                </span>
            </router-link>
        </div>

        <div class="flex flex-col items-center gap-2 min-w-[90px]">
            <router-link :to="`/restaurants/edit/${branch.id}`" class="flex flex-col items-center focus:outline-none group">
                <button class="flex flex-col items-center focus:outline-none group">
                    <Edit class="w-8 h-8 text-[#555B70] transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:text-red-400 group-hover:skew-x-3 group-hover:fill-current" />
                    <span class="mt-2 text-xs font-bold uppercase text-[#555B70] transition-all duration-500 group-hover:text-red-400 group-hover:tracking-wider">
                        Изменить
                    </span>
                </button>
            </router-link>
        </div>

    </div>
</template>

<script>
import Menu from '../icons/branchCards/Menu.vue';
import Phone from '../icons/branchCards/Phone.vue';
import Edit from '../icons/edit/Edit.vue';
import Map from '../icons/order/Map.vue';

const env = import.meta.env;

export default {
    data: () => ({
        baseUrl: env.VITE_APP_STATIC_URL,
    }),

    props: {
        branch: {
            type: Object,
            required: true
        }
    },

    components: {
        Menu,
        Phone,
        Edit,
        Map
    },
};
</script>
