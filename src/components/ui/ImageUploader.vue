<template>
    <div class="flex justify-center mb-6">
        <div class="relative"
            :style="{
                width: width,
                height: height
            }">

            <input 
                type="file" 
                accept="image/*" 
                class="absolute top-0 left-0 w-full h-full rounded-full opacity-0 cursor-pointer" 
                @change="uploadImage">

            <img
                v-if="image"
                :src="image" 
                alt="Image Preview" 
                class="w-full h-full object-cover rounded-full">

            <div 
                v-else 
                class="flex items-center justify-center w-full h-full
                       border-2 border-dashed border-gray-300 rounded-full
                       text-center text-gray-500">
                {{ text }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            default: null,
        },
        text:{
            type: String,
            default: 'Загрузите фото', 
        },
        width: {
            type: String,
            default: '250px'
        },
        height: {
            type: String,
            default: '250px'
        }
    },
    emits: ['update:image', 'send:file'],
    methods: {
        uploadImage(event) {
            const file = event.target.files[0];
            if (file) {
                const imageURL = URL.createObjectURL(file);
                
                this.$emit('update:image', imageURL);
                this.$emit('send:file', file);
            }
        },
    },
};
</script>
