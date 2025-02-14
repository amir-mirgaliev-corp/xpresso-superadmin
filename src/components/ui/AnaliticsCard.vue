<template>
	<div v-if="analytic" class="analytics__card bg-white shadow-drop rounded-[12px] p-[20px]">
		<div class="analytics__card-container">
			<div class="analytics__card-content flex justify-between">
				<div class="analytics__card-position">
					<h2 class="analytics__card-title text-[#5A5C5F]">{{ analytic.title }}</h2>
					<h2 class="analytics__card-sum text-2xl text-[#101828] font-bold">
						{{ formatAmount(analytic.amount) }} {{ analytic.unit }}
					</h2>
				</div>
				<div class="analytics__card-container-icon">
					<span
						class="analytics__card-icon border-[2px] rounded-[10px] shadow-drop w-12 h-12 flex justify-center items-center"
					>
						<i class="fi text-xl" :class="analytic.icon"></i>
					</span>
				</div>
			</div>

			<div
				v-if="analytic.profit > 0 || analytic.los > 0"
				class="analytics-line w-full h-[1px] m-[20px_0] bg-gray-300"
			></div>

			<div class="analytics__card-statistic flex justify-between" v-if="analytic.statistic">
				<div v-if="analytic.profit > 0" class="analytics__card-statistic-container flex items-center gap-[2px]">
					<div class="overflow-hidden">
						<i
							class="fi fi-rr-arrow-small-up text-2xl text-[#17B26A] animated-arrow arrow-up"
							:ref="setArrowRef"
						></i>
					</div>
					<h2 class="analytics__card-statistics-sum text-lg text-[#141414] font-bold">
						+{{ formatAmount(analytic.profit) }} {{ analytic.unit }}
					</h2>
				</div>

				<div v-if="analytic.los > 0" class="analytics__card-statistic-container flex items-center gap-[2px]">
					<div class="overflow-hidden">
						<i
							class="fi fi-rr-arrow-small-down text-2xl text-[#F2271C] animated-arrow arrow-down"
							:ref="setArrowRef"
						></i>
					</div>
					<h2 class="analytics__card-statistics-sum text-lg text-[#141414] font-bold">
						-{{ formatAmount(analytic.los) }} {{ analytic.unit }}
					</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

export default {
	data: () => ({
		screenItemCount: 3,
		arrowRefs: [],
	}),

	props: {
		analytic: {
			type: Object,
			required: true,
		},
	},

	methods: {
		formatAmount(amount) {
			return formatNumberWithSpaces(amount);
		},

		setArrowRef(el) {
			if (el) this.arrowRefs.push(el);
		},

		triggerAnimation() {
			if (this.arrowRefs.length === 0) return;

			this.arrowRefs.forEach(arrow => {
				arrow.classList.remove("active");
				setTimeout(() => {
					arrow.classList.add("active");
				}, 50);
			});
		},
	},

	watch: {
		arrowRefs: {
			handler() {
				this.triggerAnimation();
			},
			deep: true,
			immediate: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.animated-arrow {
	position: relative;
	transition: top 0.5s ease;
	&.arrow-up {
		top: 1.25rem;
	}
	&.arrow-down {
		top: -1.25rem;
	}
	&.active {
		top: 0;
	}
}
</style>
