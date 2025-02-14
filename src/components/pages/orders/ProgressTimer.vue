<template>
	<div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
		<span
			class="absolute inset-0 flex items-center justify-center font-bold"
			:style="{
				fontSize: `${fontSize}px`,
				color: color,
			}"
		>
			{{ formattedTime }}
		</span>

		<svg :width="size" :height="size" :viewBox="`0 0 ${svgSize} ${svgSize}`" class="-rotate-90">
			<circle
				:cx="svgSize / 2"
				:cy="svgSize / 2"
				:r="radius"
				fill="none"
				stroke-opacity="0.25"
				:stroke-width="strokeWidth"
				:stroke="color"
			/>
			<circle
				class="transition-[stroke-dashoffset] duration-500"
				:style="{ 'stroke-dashoffset': strokeDashOffset, stroke: color }"
				:cx="svgSize / 2"
				:cy="svgSize / 2"
				:r="radius"
				fill="none"
				:stroke-width="strokeWidth"
				:stroke-dasharray="circumference"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		startTime: {
			type: String,
			required: true,
		},
		endTime: {
			type: String,
			required: true,
			default: "",
		},
		currentTime: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			default: 75,
		},
	},
	data: () => ({
		timeLeft: null,
		totalTime: null,
		interval: null,
	}),
	computed: {
		scaleFactor() {
			return this.size / 75;
		},
		svgSize() {
			return 50 * this.scaleFactor;
		},
		radius() {
			return 21 * this.scaleFactor;
		},
		strokeWidth() {
			return 4 * this.scaleFactor;
		},
		fontSize() {
			return 16 * this.scaleFactor;
		},
		circumference() {
			return 2 * Math.PI * this.radius;
		},
		strokeDashOffset() {
			const progress = (this.timeLeft / this.totalTime) * 100;
			return this.circumference * (1 - progress / 100);
		},
		formattedTime() {
			const minutes = Math.floor(this.timeLeft / 60);
			const seconds = Math.floor(this.timeLeft % 60);
			return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
		},
		color() {
			const percentage = this.timeLeft / this.totalTime;

			if (percentage > 0.5) {
				return "green";
			} else if (percentage > 0.2) {
				return "orange";
			} else {
				return "red";
			}
		},
	},
	methods: {
		startTimer() {
			this.interval = setInterval(() => {
				if (this.timeLeft > 0) {
					this.timeLeft--;
				} else {
					clearInterval(this.interval);
					this.timeLeft = 0;
					this.$emit("ended");
				}
			}, 1000);
		},
	},
	mounted() {
		const currentTime = new Date(this.currentTime).getTime();
		const createdAtTime = new Date(this.startTime).getTime();
		const endTimeTime = new Date(this.endTime).getTime();

		this.totalTime = (endTimeTime - createdAtTime) / 1000;
		this.timeLeft = Math.max((endTimeTime - currentTime) / 1000, 0);

		if (this.timeLeft > 0) {
			this.startTimer();
		} else {
			this.$emit("ended");
		}
	},
	beforeUnmount() {
		clearInterval(this.interval);
	},
	watch: {
		timeLeft: {
			handler(newVal) {
				if (newVal === 0) {
					clearInterval(this.interval);
					this.timeLeft = 0;
					this.$emit("ended");
				}
			},
		},
	},
};
</script>
