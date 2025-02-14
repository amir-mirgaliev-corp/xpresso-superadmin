<template>
	<section class="login__wrapper flex justify-center items-center w-full h-full">
		<LoginContent />
	</section>
</template>

<script>
import LoginContent from "@/components/pages/login/LoginContent.vue";

export default {
	components: {
		LoginContent,
	},
};
</script>
