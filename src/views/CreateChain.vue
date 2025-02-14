<template>
	<section class="chains-layout">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/chains')">
			Назад
		</CustomButton>

		<ChainForm />
	</section>
</template>

<script>
import CustomButton from "@/components/shared/CustomButton.vue";
import ChainForm from "@/components/pages/chains/components/ChainForm.vue";

export default {
	components: {
		CustomButton,
		ChainForm,
	},
};
</script>
