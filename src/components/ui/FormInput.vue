<template>
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
        <label class="block mb-1 text-[18px] font-bold text-[#1B2559]">{{ settingsLabel }}</label>
        <input 
            :type="type" 
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)" 
            :placeholder="placeholder" 
            :class="{'invalid-placeholder': !isValid}"
            :style="{
                width: width,
                height: height,
                borderColor: isValid ? '#cccccc' : '#FF0000'
            }"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <p class="message text-red-500" v-if="message">{{ message }}</p>
    </div>
</template>

<script>

export default {
    props: {
        label: {
            type: String,
            required: true,
        },

        settingsLabel: {
            type: String,
            required: true,
        },

        modelValue: {
            type: [String, Number],
            default: '',
        },

        placeholder: {
            type: String,
            default: '',
        },

        type: {
            type: String,
            default: 'text',
        },

        isValid: {
            type: Boolean,
            default: true,
        },

        message: {
            type: String,
            default: '',
        },

        width: {
            type: String,
            default: '100%',
        },

        height: {
            type: String,
            default: '100%',
        },

    },
    emits: ['update:modelValue'],
};
</script>
