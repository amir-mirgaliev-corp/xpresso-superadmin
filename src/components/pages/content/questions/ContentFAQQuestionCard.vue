<template>
	<div class="bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full question-card">
		<div class="flex items-center justify-between">
			<h4 class="font-bold">{{ title }}</h4>
			<div class="flex items-center gap-x-2 action-btns">
				<button @click="openEdit"><i class="fi fi-rs-pencil"></i></button>
				<button @click="onDeleteClick"><i class="fi fi-rr-trash"></i></button>
			</div>
		</div>
		<div class="w-full h-[1px] bg-[#ebedee] my-2"></div>
		<p>{{ content }}</p>
	</div>
</template>

<script>
export default {
	emits: ["openEditModal", "onDeleteClick"],

	props: {
		title: {
			type: String,
			required: true,
			default: "Question title",
		},
		content: {
			type: String,
			required: true,
			default: "Question content",
		},
		id: {
			type: String,
			required: true,
			default: "2",
		},
	},

	methods: {
		openEdit() {
			this.$emit("openEditModal", this.id);
		},

		onDeleteClick() {
			this.$emit("onDeleteClick", this.id);
		},
	},
};
</script>

<style lang="scss" scoped>
.question-card:not(:last-child) {
	margin-bottom: 1rem;
}

.action-btns {
	& > button {
		@include flex-center;
		padding: 0.75rem;
		border-radius: 0.5rem;
		color: $white;
		&:first-child {
			background-color: $purple;
		}
		&:last-child {
			background-color: $primary;
		}
	}
}
</style>
