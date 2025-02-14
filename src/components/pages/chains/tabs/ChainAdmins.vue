<template>
	<div class="flex justify-end mt-[-63px] mb-6">
		<CustomButton icon="fi-br-plus" class="h-12 width-fit" @click="adminModalOpen = true">
			Добавить администратора
		</CustomButton>
	</div>

	<div v-if="admins.length">
		<TableLayout :table-options="tableOptions" @action="handleAction">
			<template #title>
				<h2 class="table-title">Список администраторов сети</h2>
			</template>
		</TableLayout>
	</div>

	<div v-else class="p-6 bg-white border rounded-[12px]">
		<p>У этой сети еще нет администраторов</p>
	</div>

	<AdminModal v-if="adminModalOpen" :initial-data="adminUnderAction" @close="closeAdminModal" />

	<DangerModal v-if="deleteModalOpen" @confirm="deleteChainAdmin(adminUnderAction.id)" @close="closeDangerModal" />

	<NewPasswordModal
		v-if="changePasswordModalOpen"
		@submit="handlePasswordChange"
		@close="changePasswordModalOpen = false"
	/>
</template>

<script>
import TableLayout from "@/components/shared/TableLayout.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";
import AdminModal from "../components/AdminModal.vue";
import NewPasswordModal from "@/components/shared/modals/NewPasswordModal.vue";

export default {
	data: () => ({
		admins,
		adminModalOpen: false,
		deleteModalOpen: false,
		changePasswordModalOpen: false,
		adminUnderAction: null,
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

	methods: {
		loadAdmins() {
			this.tableOptions.content = this.admins.map((admin, i) => {
				return {
					index: i + 1,
					name: `${admin.first_name} ${admin.last_name}`,
					login: admin.login,
					role: "Админ. сети",
					actions: true,
					id: admin.id,
				};
			});
		},

		handleAction(data) {
			this.adminUnderAction = this.admins.find(admin => admin.id === data.id);

			console.log(this.adminUnderAction);

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

		deleteChainAdmin(id) {},

		handlePasswordChange(newPassword) {},

		closeAdminModal() {
			this.adminModalOpen = false;
			this.adminUnderAction = null;
		},

		closeDangerModal() {
			this.deleteModalOpen = false;
			this.adminUnderAction = null;
		},
	},

	mounted() {
		this.loadAdmins();
	},
};

const admins = [
	{ id: 0, first_name: "Данил", last_name: "Сабитов", login: "danil_admin", role: "CHAIN ADMIN" },
	{ id: 1, first_name: "Данил", last_name: "Сабитов", login: "danil_admin1", role: "CHAIN ADMIN" },
	{ id: 2, first_name: "Данил", last_name: "Сабитов", login: "danil_admin2", role: "CHAIN ADMIN" },
	{ id: 3, first_name: "Данил", last_name: "Сабитов", login: "danil_admin3", role: "CHAIN ADMIN" },
];
</script>
