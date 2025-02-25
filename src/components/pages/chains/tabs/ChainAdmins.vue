<template>
	<div class="flex justify-end mt-[-63px] mb-6 max-lg:mt-0 max-lg:justify-start">
		<CustomButton icon="fi-br-plus" class="h-12 width-fit" @click="adminModalOpen = true">
			Добавить администратора
		</CustomButton>
	</div>

	<div v-if="admins.length">
		<TableLayout
			:table-options="tableOptions"
			:pagination-options="paginationOptions"
			@update:page="handlePageChange"
			@action="handleAction"
		>
			<template #title>
				<h2 class="table-title">Список администраторов сети</h2>
			</template>
		</TableLayout>
	</div>

	<div v-else class="p-6 bg-white border rounded-[12px]">
		<p>У этой сети еще нет администраторов</p>
	</div>

	<AdminModal
		v-if="adminModalOpen"
		type="chain"
		:initial-data="adminUnderAction"
		@create="createChainAdmin"
		@update="updateChainAdmin"
		@close="closeAdminModal"
	/>

	<DangerModal v-if="deleteModalOpen" @confirm="deleteChainAdmin(adminUnderAction.id)" @close="closeDangerModal" />

	<NewPasswordModal v-if="changePasswordModalOpen" @submit="changePassword" @close="closePasswordModal" />
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";
import AdminModal from "@/components/shared/modals/AdminModal.vue";
import NewPasswordModal from "@/components/shared/modals/NewPasswordModal.vue";

import { useToast } from "vue-toastification";
import { mapActions, mapGetters } from "vuex";
import admins from "@/api/admins";

export default {
	setup() {
		return {
			toast: useToast(),
		};
	},

	data: () => ({
		admins: [],
		adminModalOpen: false,
		deleteModalOpen: false,
		changePasswordModalOpen: false,
		adminUnderAction: null,
		paginationOptions: {
			page: 1,
			limit: 10,
			count: 0,
		},
		tableOptions: {
			thead: ["№", "Имя администратора", "Логин", "Роль", "Действия"],
			content: [],
			actions: [
				{ name: "edit", title: "Редактировать", icon: "fi-rs-file-edit" },
				{ name: "change-password", title: "Изменить пароль", icon: "fi-rr-lock" },
				{ name: "delete", title: "Удалить", icon: "fi-rr-trash" },
			],
		},
	}),

	components: {
		TableLayout,
		CustomButton,
		AdminModal,
		DangerModal,
		NewPasswordModal,
	},

	computed: {
		...mapGetters(["getChainAdmins"]),
	},

	methods: {
		...mapActions(["fetchChainAdmins"]),

		async loadAdmins() {
			const chain_id = this.$route.params.chain_id;

			// pagination
			const { page, limit } = this.paginationOptions;
			const filters = { page, limit };

			await this.fetchChainAdmins({ chain_id, filters });

			this.setAdminsTable();
		},

		setAdminsTable() {
			this.tableOptions.content = this.admins.map((admin, i) => {
				return {
					index: i + 1,
					name: `${admin.name} ${admin.last_name}`,
					login: admin.login,
					role: "Админ. сети",
					actions: true,
					id: admin.id,
				};
			});
		},

		handleAction(data) {
			this.adminUnderAction = this.admins.find(admin => admin.id === data.id);

			switch (data.action) {
				case "edit":
					this.adminModalOpen = true;
					break;
				case "delete":
					this.deleteModalOpen = true;
					break;
				case "change-password":
					this.changePasswordModalOpen = true;
					break;
				default:
					break;
			}
		},

		async createChainAdmin(data) {
			data.chain_id = this.$route.params.chain_id;
			const response_status = await admins.createChainAdmin(data);
			if (response_status === 201) this.loadAdmins();
			this.closeAdminModal();
		},

		async updateChainAdmin(data) {
			if (
				this.adminUnderAction.name === data.name &&
				this.adminUnderAction.last_name === data.last_name &&
				this.adminUnderAction.login === data.login
			) {
				this.toast.info("Нет изменений для обновления");
				return;
			} else {
				const response_status = await admins.updateAdmin(data);
				if (response_status === 200) this.loadAdmins();
				this.closeAdminModal();
			}
		},

		async deleteChainAdmin(id) {
			const response_status = await admins.deleteAdmin(id);
			if (response_status === 204) this.loadAdmins();
			this.closeDangerModal();
		},

		async changePassword(newPassword) {
			const response_status = await admins.updateAdminPassword(this.adminUnderAction.id, newPassword);
			if (response_status === 200) this.loadAdmins();
			this.closePasswordModal();
		},

		handlePageChange(newPage) {
			this.paginationOptions.page = newPage;
		},

		closeAdminModal() {
			this.adminModalOpen = false;
			this.adminUnderAction = null;
		},

		closeDangerModal() {
			this.deleteModalOpen = false;
			this.adminUnderAction = null;
		},

		closePasswordModal() {
			this.changePasswordModalOpen = false;
			this.adminUnderAction = null;
		},
	},

	mounted() {
		this.loadAdmins();
	},

	watch: {
		getChainAdmins: {
			deep: true,
			handler(newValue) {
				if (newValue) {
					this.admins = newValue.items;
					this.paginationOptions.count = newValue.total;
					this.setAdminsTable();
				}
			},
		},
	},
};
</script>
