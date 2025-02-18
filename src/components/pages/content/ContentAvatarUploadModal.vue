<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<h2 class="text-center mb-4 text-2xl">Загрузить аватарку</h2>
				<div class="flex w-full justify-center">
					<ImageUploader
						:image="avatarPreview"
						@update:image="avatarPreview = $event"
						@send:file="formData.avatar = $event"
					/>
				</div>

				<div class="modal__actions grid grid-cols-2 gap-4 mt-6">
					<CustomButton class="h-12" :disabled="!avatarPreview" @click="submit">Загрузить</CustomButton>
					<CustomButton class="h-12" @click="$emit('close')" type="secondary-filled">Закрыть</CustomButton>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ImageUploader from "@/components/shared/ui/ImageUploader.vue";
import { required } from "@vuelidate/validators";
import avatars from "@/api/avatars";
import useVuelidate from "@vuelidate/core";

export default {
    setup() {
		return {
			v$: useVuelidate(),
		};
	},
	components: {
		ImageUploader,
		CustomButton,
	},
	data: () => ({
		avatarPreview: null,
		formData: {
			avatar: "",
		},
		loading: false,
	}),
	validations() {
		return {
			formData: {
				avatar: { required },
			},
		};
	},
	methods: {
		async submit() {
			const result = await this.v$.$validate();

			if (result) {
				this.value ? this.updateAvatar() : this.createAvatar();
			}
		},
		async createAvatar() {
			const fd = new FormData();
			fd.append("image", this.formData.avatar);

			try {
				this.loading = true;
				const status = await avatars.createAvatar(fd);
				if (status === 201) this.$router.push("/content");
			} catch (err) {
				console.log("Error creating avatar: ", err);
			} finally {
				this.loading = false;
			}
		},
		async updateAvatar() {
			const fd = new FormData();
			fd.append("avatar", this.formData.avatar);

			try {
				this.loading = true;
				const status = await avatars.updateAvatar(fd);
				if (status === 201) this.$router.push("/content");
			} catch (err) {
				console.log("Error updating avatar: ", err);
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>

<style></style>
