<template>
    <div class="status p-[5px_10px] inline-block rounded-[20px] h-[35px]" :class="bgClass">
        <p class="status__text text-white">{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true,
            default: 'orange' 
        }
    },

    computed: {
        bgClass() {
            switch (this.color) {
                case 'green':
                    return 'bg-bg-green'; 
                case 'orange':
                    return 'bg-orange'; 
                default:
                    return 'bg-orange'; 
            }
        }
    }
}
</script>
