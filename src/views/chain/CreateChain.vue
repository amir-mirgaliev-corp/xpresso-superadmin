<template>
	<section class="chains-layout">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/chains')">
			Назад
		</CustomButton>

		<ChainForm :edit-enabled="true" />
	</section>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ChainForm from "@/components/pages/chains/components/ChainForm.vue";

export default {
	components: {
		CustomButton,
		ChainForm,
	},
};
</script>
