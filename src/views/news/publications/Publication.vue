<template>
	<PublicationForm
		v-if="publication"
		:initial-data="publication"
		:edit-enabled="editEnabled"
		@cancel-edit="toggleEdit"
	/>

	<div v-if="!editEnabled" class="flex justify-end gap-4 mt-4">
		<CustomButton icon="fi-rr-file-edit" class="h-12 width-fit purple" @click="toggleEdit">
			Редактировать
		</CustomButton>

		<CustomButton icon="fi-rr-trash" class="h-12 width-fit" @click="toggleDelete">Удалить новость</CustomButton>
	</div>

	<DangerModal v-if="deleteModalOpen" @close="toggleDelete" @confirm="deletePublication" />
</template>

<script>
import PublicationForm from "@/components/pages/news/components/PublicationForm.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import news from "@/api/news";

export default {
	data() {
		return {
			editEnabled: false,
			deleteModalOpen: false,
			publication: null,
		};
	},

	methods: {
		async fetchNewsByID() {
			const publication_id = this.$route.params.publication_id;

			if (publication_id) {
				const response = await news.getPublicationByID(publication_id);
				this.publication = response;
			} else {
				this.$router.push("/news");
			}
		},

		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		toggleDelete() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},

		async deletePublication() {
			const id = this.$route.params.publication_id;
			const status = await news.deletePublication(id);

			if (status === 204) {
				this.deleteModalOpen = false;
				this.$router.push("/news");
			}
		},
	},

	mounted() {
		this.fetchNewsByID();
	},

	components: { PublicationForm, CustomButton, DangerModal },
};
</script>
