<template>
    <div class="flex flex-col w-full max-w-md space-y-3">
        <label for="file_input" class="w-full">
            <div 
                class="flex items-center justify-between px-4 py-3 border text-gray-500 font-medium 
                       rounded-lg cursor-pointer hover:bg-orange-600 
                       transition duration-300"
            >
                <span>{{ selectedFile ? selectedFile.name : 'Выберите файл' }}</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        fill-rule="evenodd"
                        d="M8 2a1 1 0 00-1 1v4H5a1 1 0 000 2h2v4H5a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2H9V9h2a1 1 0 100-2H9V3a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <input id="file_input" type="file" class="hidden" @change="validateFile" accept=".doc,.pdf,.txt" />
        </label>
        <p class="text-sm text-gray-500">
            Поддерживаемые форматы: Doc, PDF, txt.
        </p>
        <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            errorMessage: '',
            selectedFile: null
        };
    },
    methods: {
        validateFile(event) {
            const file = event.target.files[0];
            const validExtensions = ['doc', 'pdf', 'txt'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (!validExtensions.includes(fileExtension)) {
                this.errorMessage = 'Неподдерживаемый формат файла. Пожалуйста, выберите файл в формате Doc, PDF или txt.';
                event.target.value = ''; 
            } 
			else {
                this.errorMessage = '';
                this.selectedFile = {
                    name: file.name,
                    path: file.webkitRelativePath || file.name
                };
                this.$emit('file-selected', file);
            }
        }
    }
};
</script>