<template>
    <section
      class="flex flex-col w-[290px] h-[350px] 
             rounded-[20px] justify-center items-center
           border-gray-200 border-dashed border-[3px]
             shadow-drop hover:border-gray-300
             hover:shadow-xl hover:bg-gray-50 focus:outline-none
             focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
             transition-all bg-white"
      >
      <Add />
      <div class="text-gray-300 my-6 text-center font-semibold
                    text-sm hover:text-gray-700"
      >
        {{ text }}
      </div>
    </section>
</template>
  
<script>
import Add from '../icons/productAdd/Add.vue';
  
export default {
    components: {
        Add,
    },
    props: {
        text: {
        type: String,
          default: 'Добавить продукт',
        },
    },
};
</script>
  