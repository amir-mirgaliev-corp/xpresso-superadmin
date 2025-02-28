<template>
	<NotificationForm
		v-if="notification"
		:edit-enabled="editEnabled"
		:initial-data="notification"
		@update="handleUpdate"
		@cancel-edit="toggleEdit"
	/>

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

import push from "@/api/push";

export default {
	data() {
		return {
			notification: null,
			editEnabled: false,
			deleteModalOpen: false,
		};
	},

	methods: {
		async fetchNotificationByID() {
			const notification_id = this.$route.params.notification_id;

			if (notification_id) {
				const response = await push.getNotificationByID(notification_id);
				this.notification = response;
			} else {
				this.$router.push("/news?tab=push");
			}
		},

		toggleEdit() {
			this.editEnabled = !this.editEnabled;
		},

		toggleDelete() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},

		handleUpdate() {
			this.editEnabled = false;
			this.fetchNotificationByID();
		},

		async deleteNotification() {
			const id = this.$route.params.notification_id;
			const status = await push.deleteNotification(id);

			if (status === 204) {
				this.deleteModalOpen = false;
				this.$router.push("/news?tab=push");
			}
		},
	},

	mounted() {
		this.fetchNotificationByID();
	},

	components: { NotificationForm, CustomButton, DangerModal },
};
</script>
