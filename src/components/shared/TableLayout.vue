<template>
	<section class="content__container">
		<div class="flex justify-end">
			<slot name="filter" />
		</div>

		<div class="bg-white gap-[16px] p-[16px_24px] max-lg:p-4 rounded-[12px] border-[1px] w-full">
			<div class="content__container-top">
				<slot name="title" />
			</div>

			<div class="content__container-center mb-[20px]">
				<Table :content="tableOptions" :edit-link="tableOptions.editLink" @action="handleAction" />
			</div>

			<div v-if="paginationOptions" class="content__container-bottom">
				<Pagination
					:count="paginationOptions.count"
					:page="paginationOptions.page"
					:limit="paginationOptions.limit"
					@update:page="handlePageChange"
				/>
			</div>
		</div>
	</section>
</template>

<script>
import Table from "./ui/Table.vue";
import Pagination from "./ui/Pagination.vue";

export default {
	emits: ["update:page", "action"],

	props: {
		title: {
			type: String,
			required: true,
		},
		tableOptions: {
			type: Object,
			required: true,
		},
		paginationOptions: {
			type: Object,
			required: false,
		},
	},

	methods: {
		handlePageChange(newPage) {
			this.$emit("update:page", newPage);
		},

		handleAction(data) {
			this.$emit("action", { action: data.action, id: data.id });
		},
	},

	components: {
		Table,
		Pagination,
	},
};
</script>
