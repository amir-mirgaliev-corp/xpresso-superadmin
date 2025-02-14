<template>
	<section v-if="chain" class="chains-layout">
		<CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.push('/chains')">
			Назад
		</CustomButton>

		<ChainForm :value="chain" />
	</section>
</template>

<script>
import CustomButton from "@/components/shared/CustomButton.vue";
import ChainForm from "@/components/pages/chains/components/ChainForm.vue";

import chains from "@/api/chains";

export default {
	data() {
		return {
			chain: null,
		};
	},

	async mounted() {
		const chain_id = this.$route.params.chain_id;

		if (chain_id) {
			const response = await chains.getOneChain(chain_id);
			this.chain = response;
		} else {
			this.$router.push("/chains");
		}
	},

	components: {
		CustomButton,
		ChainForm,
	},
};
</script>
