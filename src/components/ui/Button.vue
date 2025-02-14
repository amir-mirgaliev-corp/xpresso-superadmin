<template>
    <button class="button flex items-center justify-center"
            :style="{ 
                color: color, 
                backgroundColor: bgColor, 
                width: width, 
                height: height, 
                borderRadius: borderRadius,
                border: `${borderWidth} solid ${borderColor}`
            }"
    >
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
            default: '123'
        },
        color: {
            type: String,
            default: '#1B2559'
        },
        bgColor: {
            type: String,
            default: '#1B2559'
        },
        width: {
            type: String,
            default: 'max-content'
        },
        height: {
            type: String,
            default: 'auto'
        },
        borderRadius: {
            type: String,
            default: '8px'
        },
        borderWidth: {
            type: String,
            default: '1px' 
        },
        borderColor: {
            type: String,
            default: '#000'
        }
    }
}
</script>

<style scoped>
    button {
        padding: 0.75rem 1rem;
    }
</style>