<template>
    <button class="button button-apply
        p-[12px_16px] bg-green-bg text-white rounded-[10px]"
        :class="`w-${width}`"
    >
        {{ text }}
    </button>
</template>

<script>

export default {
    props: {
        text: {
            type: Object,
            required: true,
            default: 'Принять'
        },

        width: {
            type: Number || String,
            required: true,
            default: 'full'
        }
    }
}

</script>