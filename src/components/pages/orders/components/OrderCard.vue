<template>
	<component :is="currentComponent" :order="order" :isOrderEnded="isOrderEnded" />
</template>

<script>
import OrderCardCompact from "./cards/OrderCardCompact.vue";
import OrderCardVertical from "./cards/OrderCardVertical.vue";
import OrderCardRow from "./cards/OrderCardRow.vue";

export default {
	props: {
		order: {
			type: Object,
			required: true,
		},
		layout: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			isOrderEnded: false,
		};
	},

	computed: {
		currentComponent() {
			switch (this.layout) {
				case "compact":
					return OrderCardCompact;
				case "vertical":
					return OrderCardVertical;
				case "row":
					return OrderCardRow;
				default:
					return OrderCardCompact;
			}
		},
	},
};
</script>
