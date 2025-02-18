<template>
	<section class="create-publication">
		<PublicationForm :editEnabled="true" />
	</section>
</template>

<script>
import PublicationForm from "@/components/pages/news/components/PublicationForm.vue";

export default {
	components: { PublicationForm },
};
</script>
