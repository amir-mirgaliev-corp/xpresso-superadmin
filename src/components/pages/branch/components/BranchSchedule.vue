<template>
	<div class="bg-white p-4 rounded-[12px] border-[1px] max-w-xl">
		<div
			v-for="(dayKey, index) in dayKeys"
			:key="dayKey"
			class="flex items-center justify-between border-b-[1px] pb-4 [&:not(:last-child)]:mb-4 max-sm:flex-col max-sm:gap-y-2"
		>
			<div class="flex items-center">
				<input type="checkbox" v-model="localSchedule[dayKey].open" class="w-5 h-5" @change="updateSchedule" />
				<span class="text-md font-medium text-gray-700 mr-auto ml-4">{{ daysOfWeek[index] }}</span>
			</div>

			<div class="flex items-center space-x-2">
				<template v-if="!localSchedule[dayKey].allDay">
					<input
						type="time"
						v-model="localSchedule[dayKey].start"
						class="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 max-sm:px-1"
						:disabled="!localSchedule[dayKey].open || localSchedule[dayKey].allDay"
						@input="updateSchedule"
					/>
					<input
						type="time"
						v-model="localSchedule[dayKey].end"
						class="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 max-sm:px-1"
						:disabled="!localSchedule[dayKey].open || localSchedule[dayKey].allDay"
						@input="updateSchedule"
					/>
				</template>

				<p v-else>Круглосуточно</p>

				<button
					@click="toggleAllDay(dayKey)"
					type="button"
					class="px-3 py-1 text-sm border rounded-lg outline-none"
					:class="{
						'bg-blue-500 text-white': editEnabled && localSchedule[dayKey].allDay,
						'bg-gray-300 text-white': !editEnabled && localSchedule[dayKey].allDay,
					}"
				>
					24h
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	emits: ["update:schedule"],

	props: {
		editEnabled: Boolean,
		schedule: {
			type: Object,
			required: false,
			default: () => ({}),
		},
	},

	data() {
		return {
			localSchedule: {},
			daysOfWeek: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
			dayKeys: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
		};
	},

	methods: {
		parseSchedule(rawSchedule = {}) {
			const parsed = {};
			this.dayKeys.forEach(day => {
				const value = rawSchedule[day];

				if (value === "24h") {
					parsed[day] = { open: true, start: "08:00", end: "23:00", allDay: true };
				} else if (typeof value === "string" && value.includes("-")) {
					const [start, end] = value.split("-");
					parsed[day] = { open: true, start, end, allDay: false };
				} else {
					parsed[day] = { open: false, start: "08:00", end: "23:00", allDay: false };
				}
			});
			return parsed;
		},

		formatSchedule() {
			const formatted = {};
			this.dayKeys.forEach(day => {
				const { open, start, end, allDay } = this.localSchedule[day] || {};

				if (!open) {
					formatted[day] = "";
				} else if (allDay) {
					formatted[day] = "24h";
				} else {
					formatted[day] = `${start}-${end}`;
				}
			});
			return formatted;
		},

		updateSchedule() {
			this.$emit("update:schedule", this.formatSchedule());
		},

		toggleAllDay(day) {
			const scheduleDay = this.localSchedule[day];
			if (!scheduleDay) return;

			scheduleDay.allDay = !scheduleDay.allDay;

			if (scheduleDay.allDay) {
				scheduleDay.open = true;
				scheduleDay.start = "00:00";
				scheduleDay.end = "23:59";
			}

			this.updateSchedule();
		},
	},

	watch: {
		schedule: {
			deep: true,
			immediate: true,
			handler(newSchedule) {
				this.localSchedule = this.parseSchedule(newSchedule);
			},
		},
	},
};
</script>
