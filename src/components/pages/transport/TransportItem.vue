<template>
	<div class="transport-item hover:bg-gray-100">
		<div v-if="icon || color" class="transport-item__icon">
			<img v-if="icon" :src="baseUrl + icon" :alt="`${icon} brand logo`" />
			<span v-else-if="color" class="transport-item__color shadow" :style="{ backgroundColor: color }" />
		</div>

		<p class="transport-item__title" v-text="title" />

		<div class="transport-item__actions">
			<ActionsList :actions="actions" @action="handleAction" />
		</div>
	</div>
</template>

<script>
import ActionsList from "@/components/shared/ui/ActionsList.vue";
const env = import.meta.env;

export default {
	emits: ["action"],

	props: {
		title: String,
		icon: String,
		color: String,
	},

	data() {
		return {
			baseUrl: env.VITE_APP_STATIC_URL,
			actions: [
				{ name: "edit", title: "Редактировать", icon: "fi-rs-file-edit" },
				{ name: "delete", title: "Удалить", icon: "fi-rr-trash" },
			],
		};
	},

	components: {
		ActionsList,
	},

	methods: {
		handleAction(action) {
			this.$emit("action", action);
		},
	},
};
</script>

<style lang="scss" scoped>
.transport-item {
	@include flex-center-vert;
	gap: 1rem;
	flex-wrap: wrap;
	border: 1px solid #dcdcdc;
	border-radius: 10px;
	padding: 0.75rem;
	user-select: none;
	transition: $transition;
	cursor: pointer;
	min-height: 60px;
	&__icon {
		img {
			width: 2rem;
			height: 2rem;
			object-fit: contain;
			border-radius: 0.5rem;
		}
	}
	&__color {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 8px;
	}
	&__actions {
		margin-left: auto;
	}

	@media screen and (max-width: 1450px) {
		gap: 8px;
	}
}
</style>
