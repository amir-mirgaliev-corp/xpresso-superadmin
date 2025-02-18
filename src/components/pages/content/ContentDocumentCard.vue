<template>
	<div class="bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full question-card">
		<div class="flex items-center justify-between">
			<a :href="file_link" download class="font-bold inline-flex items-center gap-x-2">
				<span><i class="fi fi-rr-file"></i></span>
				<span>
					{{ name }}
				</span>
			</a>
			<div class="flex items-center gap-x-2">
				<button @click="openEdit"><i class="fi fi-rs-pencil"></i></button>
				<button @click="deleteQuestion"><i class="fi fi-rr-trash"></i></button>
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
		file_link: {
			type: String,
			required: true,
			default: "Question content",
		},
	},
	emits: ["openEditModal", "deleteQuestion"],
	methods: {
		openEdit() {
			this.$emit("openEditModal", this.name);
		},
		deleteQuestion() {
			this.$emit("deleteQuestion", this.name);
		},
	},
};
</script>
