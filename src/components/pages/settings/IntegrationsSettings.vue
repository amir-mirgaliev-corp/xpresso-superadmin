.<template>
	<div class="mt-[30px] w-full bg-white
				p-10 rounded-[10px]"
	>
		<h1 class="text-[40px] text-center font-bold mb-6 text-[#1B2559]">Интеграции</h1>
		<IntegrationCards />
  </div>
</template>

<script>
import IntegrationCards from '@/components/ui/IntegrationCards.vue';

export default {
	components:{
		IntegrationCards
	}
}
</script>

<style>

</style>