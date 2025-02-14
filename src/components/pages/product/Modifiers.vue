<template>
	<div class="modifiers mt-4">
		<h2 class="text-lg text-bold mb-2">
			Модификаторы <template v-if="modifiers.length">({{ modifiers.length }})</template>
		</h2>

		<div class="modifiers__group drop-shadow w-full">
			<h4>Объем</h4>

			<CustomButton
				btn-type="button"
				type="secondary-red"
				icon="fi-rr-plus"
				class="h-12 width-fit radius-75"
				@click="addSizeModifier"
			>
				Добавить модификатор
			</CustomButton>
		</div>

		<!-- <div v-if="modifiers.length" class="mb-4">
			<div v-for="item in modifiers" class="modifiers__item drop-shadow max-w-lg">
				<div class="flex justify-between items-center mb-2">
					<p class="modifiers__item-name">{{ item.name.ru }}</p>
					<span class="modifiers__item-price">{{ formatNumberWithSpaces(item.price) }} сум</span>
				</div>

				<div class="flex justify-start gap-4">
					<CustomButton btn-type="button" class="width-fit" type="secondary" @click="editModifier">
						Изменить
					</CustomButton>

					<CustomButton btn-type="button" class="width-fit" type="primary" @click="deleteModifier">
						Удалить
					</CustomButton>
				</div>
			</div>
		</div> -->
	</div>

	<ModifierModal v-if="modifierModalOpen" :category="modifierCategory" @close="closeModal" />
</template>

<script>
import ModifierModal from "./ModifierModal.vue";
import CustomButton from "@/components/shared/CustomButton.vue";

import formatNumberWithSpaces from "@/utils/formatNumbers";

export default {
	data: () => ({
		modifiers: [],
		modifierModalOpen: false,
		modifierCategory: "",
	}),

	methods: {
		formatNumberWithSpaces(price) {
			return formatNumberWithSpaces(price);
		},

		addSizeModifier() {
			this.modifierModalOpen = true;
			this.modifierCategory = "size";
		},

		handleAction(action) {},
	},

	components: {
		CustomButton,
		ModifierModal,
	},
};
</script>

<style lang="scss" scoped>
.modifiers {
	&__group {
		background-color: $white;
		padding: 1rem;
		border-radius: 0.5rem;
		h4 {
			font-weight: 500;
			font-size: 1.25rem;
			margin-bottom: 1rem;
		}
	}
	&__item {
		background-color: $white;
		border-radius: 0.5rem;
		padding: 1rem;
		&:not(:last-child) {
			margin-bottom: 1rem;
		}
		&-name {
			font-weight: bold;
			font-size: 1.25rem;
		}
		&-price {
			display: block;
			font-size: 1.125rem;
			font-weight: 500;
		}
	}
}
</style>
