<template>
	<div class="fixed inset-0 flex flex-col items-center justify-center bg-[#F7F7F7] z-[50]">
		<div class="flex justify-center items-center mt-4">
			<p class="text-[200px] font-bold text-[#F4350D]">4</p>
			<div class="flex flex-col justify-center items-center">
				<div class="flex space-x-2">
					<Smoke class="animate-smoke1 w-[20px] h-auto" />
					<Smoke1 class="animate-smoke2 w-[30px] h-auto" />
					<Smoke2 class="animate-smoke3 w-[70px] h-auto" />
					<Smoke3 class="animate-smoke4 w-[40px] h-auto" />
				</div>
				<Cup class="mt-3 w-[300px] h-auto animate-bounce" />
			</div>
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

<script>
import Smoke from '@/components/icons/notFound/Smoke.vue';
import Smoke1 from '@/components/icons/notFound/Smoke1.vue';
import Smoke2 from '@/components/icons/notFound/Smoke2.vue';
import Smoke3 from '@/components/icons/notFound/Smoke3.vue';
import Cup from '@/components/icons/notFound/Cup.vue';

export default {
	components: {
		Cup,
		Smoke,
		Smoke1,
		Smoke2,
		Smoke3,
	},
};
</script>

<style scoped>
@keyframes smokeMove1 {
	0% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
	50% {
		transform: translateY(-40px) scale(1.1);
		opacity: 0.7;
	}
	100% {
		transform: translateY(-80px) scale(1.2);
		opacity: 0;
	}
}

@keyframes smokeMove2 {
	0% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
	50% {
		transform: translateY(-60px) scale(1.15);
		opacity: 0.6;
	}
	100% {
		transform: translateY(-120px) scale(1.25);
		opacity: 0;
	}
}

@keyframes smokeMove3 {
	0% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
	50% {
		transform: translateY(-50px) scale(1.1);
		opacity: 0.8;
	}
	100% {
		transform: translateY(-100px) scale(1.3);
		opacity: 0;
	}
}

@keyframes smokeMove4 {
	0% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
	50% {
		transform: translateY(-70px) scale(1.2);
		opacity: 0.5;
	}
	100% {
		transform: translateY(-140px) scale(1.4);
		opacity: 0;
	}
}

.animate-smoke1 {
	animation: smokeMove1 3s infinite ease-in-out;
}

.animate-smoke2 {
	animation: smokeMove2 3.5s infinite ease-in-out;
}

.animate-smoke3 {
	animation: smokeMove3 4s infinite ease-in-out;
}

.animate-smoke4 {
	animation: smokeMove4 4.5s infinite ease-in-out;
}

@keyframes bounce {
	0%, 100% {
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
