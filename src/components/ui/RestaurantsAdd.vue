<template>
    <button class="inline-block flex max-w-[300px] items-center justify-center
                        px-4 py-2 bg-white rounded-[10px] border border-gray-300
                        font-bold text-black text-default shadow-sm hover:bg-gray-100 transition">
        <span class="text-xl font-bold mr-2">+</span>
        {{ buttonText }}
    </button>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            required: true,
            default: "Добавить сеть заведения",
        },
    },
};
</script>