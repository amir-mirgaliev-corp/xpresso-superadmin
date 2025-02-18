<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<h2 class="text-center mb-4 text-2xl">Вы дейстивтельно хотите удалить аватарку?</h2>

				<div class="modal__actions grid grid-cols-2 gap-4 mt-6">
					<CustomButton class="h-12" @click="submit">Удалить</CustomButton>
					<CustomButton class="h-12" @click="$emit('close')" type="secondary-filled">Закрыть</CustomButton>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import avatars from "@/api/avatars";

export default {
	components: {
		CustomButton,
	},
	props: {
		id: {
			type: String,
			default: null,
		},
	},
	data: () => ({
		loading: false,
	}),

	methods: {
		async submit() {
			try {
				this.loading = true;
				const status = await avatars.deleteAvatar(this.id);
				if (status === 201) this.$router.push("/content");
			} catch (err) {
				console.log("Error creating avatar: ", err);
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>

<style></style>
