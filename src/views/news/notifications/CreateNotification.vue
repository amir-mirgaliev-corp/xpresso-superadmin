<template>
	<section class="create-notification">
		<NotificationForm :editEnabled="true" />
	</section>
</template>

<script>
import NotificationForm from "@/components/pages/news/components/NotificationForm.vue";

export default {
	components: { NotificationForm },
};
</script>
