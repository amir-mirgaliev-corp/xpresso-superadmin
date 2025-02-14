<template>
	<div>
		<div v-for="day in daysOfWeek" :key="day" class="flex items-center justify-between mb-4">
			<span class="text-sm font-medium text-gray-700">{{ day }}</span>
			<div class="flex items-center space-x-2">
				<input
					type="time"
					v-model="schedule[day].start"
					class="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
					:disabled="!schedule[day].open"
				/>
				<input
					type="time"
					v-model="schedule[day].end"
					class="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
					:disabled="!schedule[day].open"
				/>
				<input type="checkbox" v-model="schedule[day].open" class="w-5 h-5" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	watch: {
		modelValue(newValue) {
			this.$emit("update:modelValue", newValue);
		},
	},
	props: {
		schedule: {
			type: Object,
			required: true,
		},
		daysOfWeek: {
			type: Array,
			required: true,
		},
	},
	emits: ["update:schedule"],
};
</script>
