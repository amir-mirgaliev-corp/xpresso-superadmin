<template>
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="19"
      height="19"
      rx="4"
      :stroke="color"
      stroke-width="2"
    />
    <rect x="5" y="5" width="5" height="5" rx="1" :fill="color" />
    <rect x="11" y="5" width="5" height="5" rx="1" :fill="color" />
    <rect x="5" y="11" width="5" height="5" rx="1" :fill="color" />
    <rect x="11" y="11" width="5" height="5" rx="1" :fill="color" />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#EAECF0',
    },
  },
};
</script>
