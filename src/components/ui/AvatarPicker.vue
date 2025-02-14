<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-lg w-[600px] shadow-drop">
            <h2 class="text-xl font-bold mb-4 text-center">Выбрать аватар</h2>
            <div class="grid grid-cols-5 gap-5">
                <div 
                    v-for="avatar in avatars" 
                    :key="avatar" 
                    class="cursor-pointer w-[80px] h-[80px] rounded-full border border-gray-300 p-2 hover:bg-red-500"
                    @click="$emit('select', avatar)"
                >
                    <img 
                        :src="avatar" 
                        class="rounded-full object-cover" 
                    />
                </div>
            </div>
            <div class="flex justify-end mt-4">
                <button 
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    @click="$emit('close')"
                >
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        avatars: {
            type: Array,
            required: true,
        },
    },
    emits: ['select', 'close'],
};
</script>
    