<template>
	<NotificationForm :edit-enabled="editEnabled" />

	<div v-if="!editEnabled" class="flex justify-end gap-4 mt-4">
		<CustomButton icon="fi-rr-file-edit" class="h-12 width-fit purple" @click="toggleEdit">
			Редактировать
		</CustomButton>

		<CustomButton icon="fi-rr-trash" class="h-12 width-fit" @click="toggleDelete">Удалить уведомление</CustomButton>
	</div>

	<DangerModal v-if="deleteModalOpen" @close="toggleDelete" @confirm="deleteNotification" />
</template>

<script>
import NotificationForm from "@/components/pages/news/components/NotificationForm.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

export default {
	data() {
		return {
			editEnabled: false,
			deleteModalOpen: false,
		};
	},

	methods: {
		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		toggleDelete() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},

		deleteNotification() {},
	},

	components: { NotificationForm, CustomButton, DangerModal },
};
</script>
