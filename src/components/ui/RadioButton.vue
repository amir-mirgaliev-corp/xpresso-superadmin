<template>
  <div class="flex items-center me-4">
    <!-- Радиокнопка -->
    <input
      id="custom-radio"
      type="radio"
      value=""
      name="custom-radio"
      class="w-6 h-6 border-4 border-gray-300 bg-white text-orange-500
             transition-all duration-300 ease-in-out transform hover:scale-110"
      :style="{ accentColor: color }"
    />
    <!-- Метка -->
    <label
      for="custom-radio"
      class="ms-2 cursor-pointer"
      :style="{
        color: labelColor,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textDecoration: textDecoration
      }"
    >
      {{ text }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: 'Custom Radio',
    },
    color: {
      type: String,
      required: false,
      default: '#f85b00',
    },
    labelColor: {
      type: String,
      required: false,
      default: '#000000', 
    },
    fontSize: {
      type: String,
      required: false,
      default: '1rem', 
    },
    fontWeight: {
      type: String,
      required: false,
      default: 'normal', 
    },
  },
};
</script>
