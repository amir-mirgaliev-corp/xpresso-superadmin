<template>
  <div>
    <div class="integrationcards__content grid grid-cols-4 
                items-center justify-center gap-5 mt-[50px] mb-[40px]"
    >
      <IntegrationCard 
        integrationLogo="Jowi" 
        bgColor="#fff" 
        width="200px" 
        height="120px" 
        borderRadius="15px" 
      />
		
      <IntegrationCard 
        integrationLogo="Iiko" 
        bgColor="#CC3434" 
        width="200px" 
        height="120px" 
        borderRadius="15px" 
      />
  
      <IntegrationCard 
        integrationLogo="Atmos" 
        bgColor="linear-gradient(130deg, #2BE9FE 0%, #09358D 100%)" 
        width="200px" 
        height="120px" 
        borderRadius="15px" 
      />
  
      <IntegrationCard 
        integrationLogo="Eskiz" 
        bgColor="linear-gradient(128deg, #FFB1DC 0%, #B70267 100%)" 
        width="200px" 
        height="120px" 
        borderRadius="15px" 
      />
    </div>
  </div>
</template>

<script>
import IntegrationCard from './IntegrationCard.vue'; 
  
export default {
    components: {
      IntegrationCard,
    },
  };
</script>