<template>
	<div class="flex flex-col items-center p-10 pb-16 bg-white rounded-xl shadow-lg space-y-8 mt-[30px]">
		<h2 class="text-3xl font-bold text-gray-800">Загрузите документ</h2>
		<div class="w-full flex justify-center items-center">
			<div class="w-[500px]">
				<FileInput @file-selected="handleFileSelected" />
				<Button
					:text="file.text"
					:color="file.color"
					:bg-color="file.bgColor"
					:border-color="file.borderColor"
					:width="file.width"
					@click="createDocument(selectedFile)"
					class="mt-4"
				/>
			</div>
		</div>
		<Loading v-if="loading" />
	</div>
</template>

<script>
import Button from '@/components/ui/Button.vue';
import FileInput from '@/components/ui/FileInput.vue';
import Loading from '@/views/Loading.vue';

import document from '@/api/docs';

export default {
	components: {
		FileInput,
		Button,
		Loading,
	},

	data: () => ({
		loading: false,
		selectedFile: null,
		file: {
			text: 'Сохранить',
			color: '#000000',
			bgColor: '#FFFFFF',
			borderColor: '#CCCCCC',
			width: '200px',
		},
	}),

	methods: {
		handleFileSelected(file) {
            this.selectedFile = file;
        },

		async createDocument(file) {
			const formData = new FormData();
			
			formData.append('name', file.name);
			formData.append('file', file);

			this.loading = true;
			const documentRes = await document.createDocument(formData);

			if (documentRes) {
				location.reload();
			}
		}
	}
};
</script>
