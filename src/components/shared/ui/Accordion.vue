<template>
	<div
		class="bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full question-card"
		:class="accordionClass"
	>
		<div
			class="flex items-center justify-between accordion__header select-none"
			@click="toggleAccordion"
			:class="triggerClass"
		>
			<slot name="trigger" />
			<div class="mr-2">
				<i class="fi fi-rr-angle-right transition-all" :class="{
                    'rotate-90': isOpen
                }"></i>
			</div>
		</div>
		<div class="accordion__content" ref="content" :style="{ maxHeight: isOpen ? contentHeight + 'px' : '0px' }">
			<div class="accordion__inner">
				<slot name="content" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		accordionClass: {
			type: String,
			required: false,
		},
		triggerClass: {
			type: String,
			required: false,
		},
	},
	data: () => ({
		contentHeight: 0,
		isOpen: false,
	}),
	// emits: ["openEditModal", "onDeleteClick"],
	methods: {
		// openEdit() {
		// 	this.$emit("openEditModal", this.name);
		// },
		// onDeleteClick() {
		// 	this.$emit("onDeleteClick", this.name);
		// },
		toggleAccordion() {
			this.isOpen = !this.isOpen;
			this.$nextTick(() => {
				this.contentHeight = this.isOpen ? this.$refs.content.scrollHeight : 0;
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.accordion {
	border: 1px solid #ddd;
	border-radius: 12px;
	overflow: hidden;
	background: white;
	margin-bottom: 10px;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		font-weight: bold;
	}

	&__content {
		overflow: hidden;
		transition: max-height 0.3s ease-in-out;
	}

	&__inner {
		padding: 12px;
	}
}
</style>
