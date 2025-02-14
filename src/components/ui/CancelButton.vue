<template>
    <button class="button button-apply
        p-[12px_16px] border-[1px] rounded-[10px]"
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
            default: 'Отменить'
        },

        width: {
            type: Number || String,
            required: true,
            default: 'full'
        }
    }
}

</script>