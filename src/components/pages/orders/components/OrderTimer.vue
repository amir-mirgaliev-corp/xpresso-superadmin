<template>
	<div class="order__timer">
		<i class="order__timer-icon fi fi-rs-stopwatch"></i>

		<span class="order__timer-countdown">
			{{ formattedTime }}
		</span>
	</div>
</template>

<script>
export default {
	props: {
		endTime: {
			type: String,
			required: true,
		},
		currentTime: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			timeLeft: null,
			interval: null,
			localCurrentTime: null,
		};
	},

	computed: {
		formattedTime() {
			if (this.timeLeft === null) return "--:--";

			const totalSeconds = Math.floor(this.timeLeft);
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const seconds = totalSeconds % 60;

			if (hours > 0) {
				return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
			} else {
				return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
			}
		},
	},

	methods: {
		toLocalTime(isoString) {
			const date = new Date(isoString);
			return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
		},

		updateTimer() {
			this.localCurrentTime.setSeconds(this.localCurrentTime.getSeconds() + 1);
			this.timeLeft = Math.max((this.endTimeMs - this.localCurrentTime.getTime()) / 1000, 0);

			if (this.timeLeft === 0) {
				clearInterval(this.interval);
				this.$emit("ended");
			}
		},

		startTimer() {
			this.localCurrentTime = this.toLocalTime(this.currentTime);
			this.endTimeMs = this.toLocalTime(this.endTime).getTime();

			this.initialTime = (this.endTimeMs - this.localCurrentTime.getTime()) / 1000;
			this.timeLeft = Math.max(this.initialTime, 0);

			if (this.timeLeft > 0) {
				this.interval = setInterval(this.updateTimer, 1000);
			} else {
				this.$emit("ended");
			}
		},
	},

	mounted() {
		this.startTimer();
	},

	beforeUnmount() {
		clearInterval(this.interval);
	},
};
</script>

<style lang="scss" scoped>
.order__timer {
	@include flex-center;
	gap: 0.25rem;
	border-radius: 3rem;
	background-color: #5a5a5a;
	color: $white;
	width: fit-content;
	padding: 0.5rem;
	font-size: 0.75rem;
	&-countdown {
		display: block;
		font-family: monospace;
		line-height: 1;
	}
}
</style>
