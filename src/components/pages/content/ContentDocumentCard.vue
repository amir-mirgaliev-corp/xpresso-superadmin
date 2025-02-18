<template>
	<div class="bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full question-card">
		<div class="flex items-center justify-between accordion__header" @click="toggleAccordion">
			{{ name }}
			<div class="flex items-center gap-x-2">
				<button @click.stop="openEdit"><i class="fi fi-rs-pencil"></i></button>
				<button @click.stop="deleteQuestion"><i class="fi fi-rr-trash"></i></button>
			</div>
		</div>
		<div class="accordion__content" ref="content" :style="{ maxHeight: isOpen ? contentHeight + 'px' : '0px' }">
			<div class="accordion__inner">
				<ul>
					<li v-for="lang in ['ru', 'uz', 'en']" :key="lang">
						<a class="cursor-pointer inline-flex items-center gap-x-2 text-sm" :href="links[lang]" download>
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
	props: {
		name: {
			type: String,
			required: true,
			default: "File title",
		},
		links: {
			type: Object,
			required: true,
			default: {},
		},
	},
	data: () => ({
		contentHeight: 0,
		isOpen: false,
	}),
	emits: ["openEditModal", "deleteQuestion"],
	methods: {
		openEdit() {
			this.$emit("openEditModal", this.name);
		},
		deleteQuestion() {
			this.$emit("deleteQuestion", this.name);
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
		padding: 12px;
		padding-bottom: 0;
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
</style>
