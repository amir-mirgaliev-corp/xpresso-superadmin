<template>
    <div class="flex items-center p-4 bg-white 
                rounded-[20px] border border-gray-300 w-full">
        <img :src="defaultPath + chain.preview" alt="Starbucks Logo" 
             class="w-[150px] h-[150px] m-4 ml-[100px] rounded-full"
        />
        <div class="text-[40px] ml-[50px] w-[500px] font-bold text-black">
            {{ chain.name }}
        </div>
    </div>
</template>

<script>
import RestaranLogo from "@/assets/images/restaurantsLogo/default_user.jpg";

const env = import.meta.env;

export default {
    data: () => ({
        defaultPath: env.VITE_APP_STATIC_URL
    }),

    props: {
        chain: {
            type: Object,
            required: true
        }
    }
};
</script>
