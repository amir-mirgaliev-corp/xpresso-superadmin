<template>
	<div v-if="count > limit" class="paginate flex justify-end">
		<div class="paginate__container flex items-center">
			<button class="paginate__button" @click="prevPage" :disabled="currentPage === 1">
				<i class="fi fi-bs-angle-left"></i>
			</button>

			<div class="paginate__content flex">
				<div v-if="visiblePages[0] > 2" class="flex items-center">
					<span class="paginate__item" :class="{ active: currentPage === 1 }" @click="setPage(1)"> 1 </span>
					<span class="paginate__space block mx-2 leading-none">...</span>
				</div>
				<div v-else-if="visiblePages[0] === 2" class="flex items-center">
					<span class="paginate__item" :class="{ active: currentPage === 1 }" @click="setPage(1)"> 1 </span>
				</div>

				<div class="paginate__items flex gap-[4px]">
					<span
						v-for="page in visiblePages"
						:key="page"
						class="paginate__item"
						:class="{ active: page === currentPage }"
						@click="setPage(page)"
					>
						{{ page }}
					</span>
				</div>

				<div v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="flex items-center">
					<span class="paginate__space block mx-2 leading-none">...</span>
					<span
						class="paginate__item"
						:class="{ active: totalPages === currentPage }"
						@click="setPage(totalPages)"
					>
						{{ totalPages }}
					</span>
				</div>
				<div v-else-if="visiblePages[visiblePages.length - 1] === totalPages - 1" class="flex items-center">
					<span
						class="paginate__item"
						:class="{ active: totalPages === currentPage }"
						@click="setPage(totalPages)"
					>
						{{ totalPages }}
					</span>
				</div>
			</div>

			<button class="paginate__button" @click="nextPage" :disabled="currentPage === totalPages">
				<i class="fi fi-bs-angle-right"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		currentPage: 1,
		pagesLimit: 5,
	}),

	props: {
		page: {
			type: Number,
			required: true,
			default: 1,
		},

		limit: {
			type: Number,
			required: true,
			default: 10,
		},

		count: {
			type: Number,
			required: true,
			default: 10,
		},
	},

	computed: {
		totalPages() {
			const total = Math.ceil(this.count / this.limit);
			return total > 1 ? total : 1;
		},

		visiblePages() {
			const halfLimit = Math.floor(this.pagesLimit / 2);
			let start = Math.max(this.currentPage - halfLimit, 1);
			let end = start + this.pagesLimit - 1;

			if (end > this.totalPages) {
				end = this.totalPages;
				start = Math.max(end - this.pagesLimit + 1, 1);
			}

			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
	},

	methods: {
		setPage(page) {
			if (page !== this.currentPage) {
				this.currentPage = page;
				this.$emit("update:page", page);
			}
		},

		prevPage() {
			if (this.currentPage > 1) {
				this.setPage(this.currentPage - 1);
			}
		},

		nextPage() {
			if (this.currentPage < this.totalPages) {
				this.setPage(this.currentPage + 1);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.paginate {
	&__button {
		@include flex-center;
		width: 2.25rem;
		height: 2.25rem;
		cursor: pointer;
		& > i {
			color: $primary;
			font-size: 0.75rem;
		}
		&:disabled {
			cursor: default;
			& > i {
				color: #ccc;
			}
		}
	}
	&__item {
		@include flex-center;
		width: 2.25rem;
		height: 2.25rem;
		transition: $transition;
		border-radius: 0.5rem;
		color: $black;
		cursor: pointer;
		font-size: 0.875rem;
		&.active {
			background-color: $primary;
			color: $white;
		}
	}
}
</style>
