<template>
	<div class="modifiers">
		<div v-if="modifiers.length" class="mb-4">
			<div v-for="(item, category_index) in modifiers" class="modifiers__item drop-shadow max-w-lg">
				<div class="flex justify-between items-center mb-4">
					<h4 class="modifiers__category !mb-0" @click="editCategoryName(category_index)">
						{{ item.title.title_ru }}
						<i class="fi fi-rr-edit"></i>
					</h4>

					<CustomButton
						btn-type="button"
						class="width-fit"
						icon="fi-rr-trash"
						type="primary"
						@click="openDeleteCategoryModal(category_index)"
					>
						Удалить
					</CustomButton>
				</div>

				<div v-if="item.data.length" class="modifiers__list mb-2">
					<div v-for="(modifier, modifier_index) in item.data" class="modifier">
						<div class="flex justify-between items-center mr-2 flex-auto">
							<div class="modifier__title">{{ modifier.name.name_ru }}</div>
							<div class="modifier__price">{{ formatNumberWithSpaces(modifier.price) }} сум</div>
						</div>

						<ActionsList
							:actions="actions"
							@action="action => handleAction(action, category_index, modifier_index, item)"
						/>
					</div>
				</div>

				<CustomButton
					btn-type="button"
					type="secondary-red"
					icon="fi-rr-plus"
					class="h-12 radius-75"
					@click="addModifier(category_index)"
				>
					Добавить модификатор
				</CustomButton>
			</div>
		</div>

		<div v-if="modifiers.length < 5 && editEnabled" class="add-modifiers" @click="addModifiersGroup">
			+ Добавить группу модификаторов
		</div>
	</div>

	<ModifierModal
		v-if="modifierModalOpen"
		:category="category_under_action"
		:initial-data="modifier_under_action"
		@update="handleModifierCreated"
		@close="closeModifierModal"
	/>

	<CategoryNameModal
		v-if="categoryNameModalOpen"
		:initial-data="category_under_action"
		@update="handleCategoryUpdate"
		@close="closeCategoryModal"
	/>

	<DangerModal v-if="deleteModifierModalOpen" @confirm="deleteModifier" @close="closeDeleteModal" />
</template>

<script>
import ModifierModal from "./ModifierModal.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import CategoryNameModal from "./CategoryNameModal.vue";
import ActionsList from "@/components/shared/ui/ActionsList.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

export default {
	props: {
		modelValue: Array,
		editEnabled: Boolean,
	},

	data: () => ({
		modifiers: [],
		modifierModalOpen: false,
		categoryNameModalOpen: false,
		deleteModifierModalOpen: false,
		category_under_action: null,
		category_under_action_index: null,
		modifier_under_action: null,
		actions: [
			{ name: "edit", title: "Редактировать", icon: "fi-rs-file-edit" },
			{ name: "delete", title: "Удалить", icon: "fi-rr-trash" },
		],
	}),

	methods: {
		formatNumberWithSpaces(price) {
			return formatNumberWithSpaces(price);
		},

		editCategoryName(index) {
			this.categoryNameModalOpen = true;
			this.category_under_action = this.modifiers[index];
			this.category_under_action_index = index;
		},

		addModifier(index) {
			this.modifierModalOpen = true;
			this.category_under_action = this.modifiers[index];
			this.category_under_action_index = index;
		},

		handleAction(action, category_index, modifier_index, category) {
			switch (action) {
				case "edit":
					this.addModifier(category_index);

					this.modifier_under_action = {
						modifier_index,
						...this.modifiers[category_index].data[modifier_index],
					};
					break;
				case "delete":
					const deleting_modifier = this.modifiers[category_index];
					deleting_modifier.data.splice(modifier_index, 1);
					break;
				default:
					break;
			}
		},

		handleCategoryUpdate(updatedCategory) {
			const modifier = this.modifiers[this.category_under_action_index];

			if (modifier) {
				modifier.title = updatedCategory.category;
			}

			this.closeCategoryModal();
		},

		handleModifierCreated(data) {
			const modifier = this.modifiers[this.category_under_action_index];

			if (modifier) {
				if (data.modifier_index !== null) {
					modifier.data[data.modifier_index] = data.modifier;
				} else {
					modifier.data.push(data.modifier);
				}
			}

			this.closeModifierModal();
		},

		addModifiersGroup() {
			this.modifiers.push({
				title: {
					title_ru: "Новая группа",
					title_uz: "Yangi gruppa",
					title_en: "New group",
				},
				data: [],
			});
		},

		openDeleteCategoryModal(index) {
			this.deleteModifierModalOpen = true;
			this.category_under_action_index = index;
		},

		deleteModifier() {
			this.modifiers.splice(this.category_under_action_index, 1);
			this.closeDeleteModal();
		},

		closeCategoryModal() {
			this.categoryNameModalOpen = false;
			this.category_under_action = null;
			this.category_under_action_index = null;
		},

		closeModifierModal() {
			this.modifierModalOpen = false;
			this.category_under_action = null;
			this.category_under_action_index = null;
			this.modifier_under_action = null;
		},

		closeDeleteModal() {
			this.deleteModifierModalOpen = false;
			this.category_under_action_index = null;
		},
	},

	watch: {
		modelValue: {
			deep: true,
			immediate: true,
			handler(newValue) {
				this.modifiers = newValue;
			},
		},
		modifiers: {
			deep: true,
			handler() {
				this.$emit("update:modelValue", this.modifiers);
			},
		},
	},

	components: {
		CustomButton,
		ModifierModal,
		CategoryNameModal,
		ActionsList,
		DangerModal,
	},
};
</script>

<style lang="scss" scoped>
.modifiers {
	&__group {
		background-color: $white;
		padding: 1rem;
		border-radius: 0.5rem;
	}
	&__category {
		@include flex-center-vert;
		font-weight: 600;
		font-size: 1.125rem;
		margin-bottom: 1rem;
		gap: 0.5rem;
		cursor: pointer;
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

.add-modifiers {
	@include flex-center;
	border-radius: 1rem;
	border: 2px dashed $primary;
	height: 6rem;
	cursor: pointer;
}

.modifier {
	@include flex-center-sb;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: $white;
	border: 1px solid #ddd;
	&:not(:last-child) {
		margin-bottom: 0.5rem;
	}
}
</style>
