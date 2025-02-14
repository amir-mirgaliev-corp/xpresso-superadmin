<template>
  <div class="flex flex-col gap-4 py-6">
    <div class="flex items-center gap-4">
      <input 
        v-model="hexValue" 
        type="text" 
        placeholder="#FFFFFF" 
        @input="updateColor" 
        class="w-full p-[15px] border rounded-lg focus:outline-none"
      />
      <div class="w-12 h-12 rounded-full border border-gray-300" 
        :style="{ backgroundColor: isValidHex ? hexValue : '#ffffff' }">
      </div>
    </div>
    <p v-if="!isValidHex" class="text-red-500">Неправильный формат HEX</p>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hexValue: this.modelValue,
      isValidHex: false
    };
  },
  watch: {
    modelValue(newValue) {
      this.hexValue = newValue;
      this.validateHex();
    }
  },
  methods: {
    updateColor() {
      this.validateHex();
      if (this.isValidHex) {
        this.$emit('update:modelValue', this.hexValue);
      }
    },
    validateHex() {
      const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
      this.isValidHex = hexPattern.test(this.hexValue);
    }
  }
};
</script>
