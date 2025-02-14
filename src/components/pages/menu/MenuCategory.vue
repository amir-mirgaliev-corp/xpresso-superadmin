<template>
    <div class="flex justify-start items-start
                flex-col rounded-[20px] w-[300px]
              bg-white p-6 shadow-lg"
    >
  
      <div class="flex justify-center items-center
                  flex-row px-4 py-2 border rounded-lg
                  mb-6 shadow-md hover:shadow-drop
                  cursor-pointer transition-all"
      >
        <Back />
        <div class="text-[#344054] text-[15px] font-semibold ml-3">
          Назад
        </div>
      </div>
  
      <transition-group name="fade" tag="div">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="flex justify-between items-center
                 rounded-[15px] mb-4 px-3 py-2
                 hover:shadow-drop transition-all 
                 duration-200 ease-in-out"
        >
          
          <input v-model="categories[index]"
            @input="updateCategory(index)"
            class="flex-1 text-[#344054] font-semibold text-sm
                   bg-transparent border-b-2 border-transparent
                   focus:border-[#E73B36] focus:outline-none"
          />
  
          <button @click="removeCategory(index)" 
                  class="text-red-500 ml-2 p-1 hover:text-red-600 
                          transition-all duration-200"
          >
            <TrashRed color="#E73B36"/>
          </button>
        </div>
      </transition-group>
  
      <div class="flex flex-row cursor-pointer mt-6" @click="addCategory">
        <div class="flex justify-start items-center 
                    flex-row rounded-md px-4 py-2 
                    hover:shadow-drop transition-all duration-200 
                    ease-in-out"
        >
          <p class="flex-1 text-[#344054] font-semibold text-sm">
            Добавить категорию
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Back from "@/components/icons/back/Back.vue";
  import TrashRed from "@/components/icons/delete/TrashRed.vue";
  
  export default {
    data: () => ({
      categories: ["Горячee кофе", "Холодный кофе"],
    }),
    methods: {
      addCategory() {
        const newCategory = `Категория ${this.categories.length + 1}`;
        this.categories.push(newCategory);
      },
      updateCategory(index) {
        console.log(`Категория ${index + 1} изменена на: ${this.categories[index]}`);
      },
      removeCategory(index) {
        this.categories.splice(index, 1);
      },
    },
    components: {
      Back,
      TrashRed,
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
  