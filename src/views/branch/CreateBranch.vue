<template>
	<section class="create-restaurant">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

		<BranchForm :edit-enabled="true" />
	</section>
</template>

<script>
import BranchForm from "@/components/pages/branch/BranchForm.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";

export default {
	components: {
		BranchForm,
		CustomButton,
	},
	methods: {
		linkAddChainPage() {
			this.$router.replace({ path: "" });
		},
	},
};
</script>
