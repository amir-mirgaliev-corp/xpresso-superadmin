<template>
	<div class="bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full question-card">
		<div class="flex items-center justify-between accordion__header select-none" @click="toggleAccordion">
			<p class="flex gap-2 items-center">
				<i class="fi fi-rs-angle-down transition ease-linear" :class="{ 'rotate-180': isOpen }"></i>
				{{ document.title_ru }}
			</p>
			<div class="flex items-center gap-x-2 action-btns">
				<button @click.stop="openEdit"><i class="fi fi-rs-pencil"></i></button>
				<button @click.stop="onDeleteClick"><i class="fi fi-rr-trash"></i></button>
			</div>
		</div>
		<div class="accordion__content" ref="content" :style="{ maxHeight: isOpen ? contentHeight + 'px' : '0px' }">
			<div class="accordion__inner">
				<ul>
					<li v-for="lang in ['ru', 'uz', 'en']" :key="lang">
						<a
							class="cursor-pointer inline-flex items-center gap-x-2 text-sm border-b py-4 w-full select-none"
							:href="document[`link_${lang}`]"
						>
							<span><i class="fi fi-rr-file"></i></span>
							<span>
								{{ lang.toUpperCase() }}
							</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	emits: ["openEditModal", "onDeleteClick"],
	props: {
		document: {
			type: Object,
			required: true,
		},
	},

	data: () => ({
		contentHeight: 0,
		isOpen: false,
	}),

	methods: {
		openEdit() {
			this.$emit("openEditModal", this.document.id);
		},

		onDeleteClick() {
			this.$emit("onDeleteClick", this.document.id);
		},

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
		padding-left: 12px;
	}

	ul {
		li {
			a {
				text-decoration: none;
				transition: color 0.3s;

				&:hover {
					color: #0056b3;
				}
			}
		}
	}
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
