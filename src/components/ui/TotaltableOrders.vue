<template>
	<section class="content__container bg-white p-[24px] rounded-[12px] border-[1px] shadow-drop">
		<div class="content__container-top flex justify-between">
			<slot name="title" />
			<slot name="filter" />
		</div>
		<div class="content__container-center mb-[20px]">
			<slot name="content" />
		</div>
		<div class="content__container-bottom">
			<slot name="paginate" />
		</div>
	</section>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		content: {
			type: Object || Array,
			required: true
		},
		paginate: {
			type: Array,
			required: true
		}
	}
}
</script>