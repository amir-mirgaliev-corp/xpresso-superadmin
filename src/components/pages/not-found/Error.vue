<template>
	<div class="fixed inset-0 flex flex-col items-center justify-center bg-[#F7F7F7] z-[50]">
		<div class="flex justify-center items-center mt-4">
			<p class="text-[200px] font-bold text-[#F4350D]">4</p>
			<p class="text-[200px] font-bold text-[#F4350D]">0</p>
			<p class="text-[200px] font-bold text-[#F4350D]">4</p>
		</div>
		<div class="flex flex-col items-center">
			<p class="text-[35px] font-bold text-[#F4350D] mt-6">Страница не найдена</p>
			<router-link to="/dashboard">
				<p class="text-[22px] font-bold text-[#F4350D] mt-3 underline">На главную</p>
			</router-link>
		</div>
	</div>
</template>

<style scoped>
@keyframes bounce {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

.animate-bounce {
	animation: bounce 1.5s infinite;
}
</style>
