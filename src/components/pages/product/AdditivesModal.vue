<template>
	<teleport to="body">
		<div class="modal-overlay" @click.self="$emit('close')">
			<button class="modal__close" @click="$emit('close')">
				<i class="fi fi-br-cross"></i>
			</button>

			<div class="modal">
				<h2 class="text-center mb-8 text-2xl">Список добавок</h2>

				<form class="form" @submit.prevent="submitForm">
					<div v-if="additives.length" class="additives__list grid grid-cols-2 gap-x-4 gap-y-6 mb-8">
						<CustomCheckbox
							v-for="item in additives"
							:key="item.id"
							:value="item"
							v-model="selectedAdditives"
							mode="list"
							size="lg"
						>
							{{ item.name_ru }}

							<template #detail>{{ formatNumberWithSpaces(item.price) }} сум</template>
						</CustomCheckbox>
					</div>

					<p v-else>У этой сети нет добавок</p>

					<div class="grid grid-cols-2 gap-4">
						<CustomButton type="secondary" class="h-12" @click="$emit('close')">Отменить</CustomButton>
						<CustomButton class="h-12" @click="applyChanges">Сохранить</CustomButton>
					</div>
				</form>
			</div>
		</div>
	</teleport>
</template>

<script>
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import CustomCheckbox from "@/components/shared/ui/CustomCheckbox.vue";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

import additives from "@/api/additives";

export default {
	emits: ["close", "update"],
	props: {
		additives: Array,
		initialData: {
			type: Object || null,
			default: null,
		},
	},

	data() {
		return {
			selectedAdditives: [],
		};
	},

	methods: {
		applyChanges() {
			const selectedIds = this.selectedAdditives.map(item => ({ id: item.id }));
			this.$emit("update", selectedIds);
		},

		formatNumberWithSpaces(value) {
			return formatNumberWithSpaces(value);
		},
	},

	mounted() {
		if (this.initialData && this.additives.length) {
			this.selectedAdditives = this.additives.filter(item =>
				this.initialData.data.some(add => add.id === item.id),
			);
		}
	},

	components: { CustomButton, CustomCheckbox },
};
</script>

<style lang="scss" scoped>
.modal {
	max-width: 650px;
}
.additives__list {
	max-height: 400px;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: block;
		width: 12px;
	}
	&::-webkit-scrollbar-track {
		opacity: 0;
	}
	&::-webkit-scrollbar-thumb {
		height: 3rem;
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: padding-box;
		border-radius: 9999px;
		background-color: #eaecf0;
	}
}

.form__field {
	&:not(:last-child) {
		margin-bottom: 0.75rem;
	}
}
</style>
