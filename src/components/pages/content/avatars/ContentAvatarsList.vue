<template>
	<div class="bg-white gap-[16px] px-4 py-6 rounded-[12px] border-[1px] w-full max-sm:px-3 max-sm:py-3">
		<div class="flex gap-x-6 max-sm:gap-x-3">
			<h2 class="table-title">Аватарки</h2>
			<CustomButton
				icon="fi-br-plus"
				class="width-fit h-12 mb-6 ml-auto max-sm:!w-[160px]"
				@click="uploadModalOpen = true"
			>
				Загрузить
			</CustomButton>
		</div>
		<div>
			<div v-if="avatarsList?.length" class="flex items-center gap-6 flex-wrap">
				<div v-for="avatar in avatarsList" :key="avatar">
					<div class="size-[120px] avatar__img-wrapper">
						<img class="rounded-full w-full h-full object-cover" :src="avatar.image" alt="profile image" />
						<button
							class="avatar__img-wrapper__btn--edit"
							@click="
								deleteModalOpen = true;
								selectedAvatarId = avatar.id;
							"
						>
							<i class="fi fi-rr-trash"></i>
						</button>
					</div>
				</div>
			</div>

			<div v-else>
				<p>Нет созданных аватарок</p>
			</div>
		</div>
		<DangerModal
			v-if="deleteModalOpen"
			@close="deleteModalOpen = false"
			@confirm="deleteAvatar"
			title="Вы уверены что хотите удалить аватар?"
		/>
		<ContentAvatarUploadModal v-if="uploadModalOpen" @close="uploadModalOpen = false" />
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ContentAvatarUploadModal from "../avatars/ContentAvatarUploadModal.vue";
import { mapActions, mapGetters } from "vuex";
import DangerModal from "@/components/shared/modals/DangerModal.vue";
import avatars from "@/api/avatars";

export default {
	components: {
		CustomButton,
		ContentAvatarUploadModal,
		DangerModal,
	},
	data: () => ({
		uploadModalOpen: false,
		deleteModalOpen: false,
		selectedAvatarId: null,
		deleteLoading: false,
	}),
	computed: {
		...mapGetters(["getAvatars"]),
		avatarsList() {
			return this.getAvatars;
		},
	},
	methods: {
		...mapActions(["fetchAvatars"]),
		openDeleteModal(id) {
			this.deleteModalOpen = true;
			this.selectedAvatarId = id;
		},
		async deleteAvatar() {
			try {
				this.deleteLoading = true;
				const { status } = await avatars.deleteAvatar(this.selectedAvatarId);
				console.log(status);
				if (status === 200) {
					await this.fetchAvatars();
					this.deleteModalOpen = false;
				}
			} catch (err) {
				console.log("Error creating avatar: ", err);
			} finally {
				this.deleteLoading = false;
			}
		},
	},
	async mounted() {
		await this.fetchAvatars();
	},
};
</script>

<style scoped lang="scss">
.avatar {
	&__img-wrapper {
		position: relative;
		&:hover .avatar__img-wrapper__btn--edit {
			display: block;
		}
		&__btn--edit {
			display: none;
			transition: all 0.4s;
			position: absolute;
			top: 0px;
			right: -10px;
			background-color: #f7f7f7;
			padding: 4px;
			border-radius: 100%;
		}
	}
}
</style>
