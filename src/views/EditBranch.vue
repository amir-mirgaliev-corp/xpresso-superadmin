<template>
	<section class="create-restarant m-[30px]">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)"> Назад </CustomButton>

		<BranchForm />
	</section>
</template>

<script>
import CustomButton from "@/components/shared/CustomButton.vue";
import BranchForm from "@/components/pages/branch/BranchForm.vue";

export default {
	components: {
		CustomButton,
		BranchForm,
	},
	methods: {
		linkAddChainPage() {
			this.$router.replace({ path: "" });
		},
	},
};
</script>
