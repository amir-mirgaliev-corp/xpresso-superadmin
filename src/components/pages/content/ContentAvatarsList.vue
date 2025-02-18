<template>
	<div class="bg-white gap-[16px] p-[16px_24px] rounded-[12px] border-[1px] w-full">
		<div class="flex gap-x-6">
			<h2 class="table-title">Аватарки</h2>
			<CustomButton icon="fi-br-plus" class="width-fit h-12 mb-6 ml-auto" @click="uploadModalOpen = true">
				Загрузить
			</CustomButton>
		</div>
		<div>
			<div v-if="avatarsList?.length">
				<div v-for="avatar in avatarsList" :key="avatar" class="flex items-center flex-wrap gap-3">
					<div class="size-[120px] avatar__img-wrapper">
						<img
							class="rounded-full w-full h-full object-contain"
							:src="avatar.avatar_url"
							alt="profile image"
						/>
						<button class="avatar__img-wrapper__btn--edit" @click="deleteModalOpen = true">
							<i class="fi fi-rr-trash"></i>
						</button>
					</div>
				</div>
			</div>

			<div v-else>
				<p>Нет созданных аватарок</p>
			</div>
			<!-- <div class="size-[120px] avatar__img-wrapper">
				<img class="rounded-full w-full h-full object-contain" :src="avatar?.avatar_url" alt="profile image" />
				<button class="avatar__img-wrapper__btn--edit" @click="openDeleteModal(avatar?.id)">
					<i class="fi fi-rr-trash"></i>
				</button>
			</div> -->
		</div>
		<ContentAvatarUploadModal v-if="uploadModalOpen" @close="uploadModalOpen = false" />
		<ContentAvatarDeleteModal
			v-if="deleteModalOpen"
			@close="deleteModalOpen = false"
			:avatarId="selectedAvatarId"
		/>
	</div>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ContentAvatarUploadModal from "./ContentAvatarUploadModal.vue";
import ContentAvatarDeleteModal from "./ContentAvatarDeleteModal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
	components: {
		CustomButton,
		ContentAvatarUploadModal,
		ContentAvatarDeleteModal,
	},
	data: () => ({
		uploadModalOpen: false,
		deleteModalOpen: false,
		selectedAvatarId: null,
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
