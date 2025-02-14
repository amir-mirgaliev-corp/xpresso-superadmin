<template>
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
        <select 
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)" 
            class="w-full px-3 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        >
            <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            required: true,
        },
    },
    emits: ['update:modelValue'],
};
</script>
