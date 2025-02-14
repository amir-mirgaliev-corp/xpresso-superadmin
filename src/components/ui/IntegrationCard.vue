<template>
  <div
    class="integrationcard__content shadow-drop
		   flex items-center justify-center"
    :style="{
      background: bgColor,
      width: width,
      height: height,
      borderRadius: borderRadius,
    }"
  >
    <component :is="integrationLogo" class="svg-icon" />
  </div>
</template>

<script>
import Atmos from '../icons/integrationLogo/Atmos.vue';
import Eskiz from '../icons/integrationLogo/Eskiz.vue';
import Iiko from '../icons/integrationLogo/Iiko.vue'; 
import Jowi from '../icons/integrationLogo/Jowi.vue';

export default {
  props: {
    bgColor: {
      type: String,
      default: "#fff",
    },
    width: {
      type: String,
      default: "150px",
    },
    height: {
      type: String,
      default: "150px",
    },
    borderRadius: {
      type: String,
      default: "10px",
    },
    integrationLogo: {
      type: Object,
      required: true,
    },
  },
  components:{
	Jowi,
	Iiko,
	Atmos,
    Eskiz,
  }
};
</script>
