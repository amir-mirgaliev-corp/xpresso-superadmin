<template>
	<div class="additives">
		<div v-if="additives.length" class="mb-4">
			<div v-for="(item, category_index) in additives" class="additives__item drop-shadow max-w-lg">
				<div class="flex justify-between items-center mb-4">
					<h4 class="additives__category !mb-0" @click="editCategoryName(category_index)">
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

				<div v-if="item.data.length" class="additives__list mb-2">
					<div v-for="additive in item.data" class="additive">
						<div class="flex justify-between items-center mr-2 flex-auto">
							<div class="additive__title">{{ getAdditiveName(additive.id) }}</div>
							<div class="additive__price">{{ getAdditivePrice(additive.id) }}</div>
						</div>
					</div>
				</div>

				<CustomButton
					btn-type="button"
					type="secondary-red"
					class="h-12 radius-75"
					@click="addAdditive(category_index)"
				>
					{{ item.data.length ? "Изменить" : "Добавить" }}
				</CustomButton>
			</div>
		</div>

		<div v-if="additives.length < 5 && editEnabled" class="add-additives" @click="addAdditivesGroup">
			+ Добавить группу добавок
		</div>
	</div>

	<AdditivesModal
		v-if="additiveModalOpen"
		:initial-data="category_under_action"
		:additives="chain_additives"
		@update="handleAdditivesUpdate"
		@close="closeAdditivesModal"
	/>

	<CategoryNameModal
		v-if="categoryNameModalOpen"
		:initial-data="category_under_action"
		@update="handleCategoryUpdate"
		@close="closeCategoryModal"
	/>

	<DangerModal v-if="deleteAdditivesModalOpen" @confirm="deleteAdditive" @close="closeDeleteModal" />
</template>

<script>
import AdditivesModal from "./AdditivesModal.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import CategoryNameModal from "./CategoryNameModal.vue";
import DangerModal from "@/components/shared/modals/DangerModal.vue";

import formatNumberWithSpaces from "@/utils/formatters/formatNumbers";

import additives from "@/api/additives";

export default {
	props: {
		modelValue: Array,
		chain_id: String,
		editEnabled: Boolean,
	},

	data: () => ({
		additives: [],
		chain_additives: [],
		additiveModalOpen: false,
		categoryNameModalOpen: false,
		deleteAdditivesModalOpen: false,
		category_under_action: null,
		category_under_action_index: null,
	}),

	methods: {
		async loadAdditives() {
			const chain_id = this.chain_id || this.$route.params.chain_id;
			if (chain_id) {
				const response = await additives.getAdditives(chain_id, { page: 1, limit: 99 });

				if (response.items && response.items.length) {
					this.chain_additives = response.items;
				} else {
					this.chain_additives = [];
				}
			}
		},

		editCategoryName(index) {
			this.categoryNameModalOpen = true;
			this.category_under_action = this.additives[index];
			this.category_under_action_index = index;
		},

		addAdditive(index) {
			this.additiveModalOpen = true;
			this.category_under_action = this.additives[index];
			this.category_under_action_index = index;
		},

		handleCategoryUpdate(updatedCategory) {
			const additive = this.additives[this.category_under_action_index];

			if (additive) {
				additive.title = updatedCategory.category;
			}

			this.closeCategoryModal();
		},

		handleAdditivesUpdate(selectedAdditives) {
			const additive = this.additives[this.category_under_action_index];

			if (additive) {
				additive.data = selectedAdditives;
			}

			this.closeAdditivesModal();
		},

		addAdditivesGroup() {
			this.additives.push({
				title: {
					title_ru: "Новая группа",
					title_uz: "Yangi gruppa",
					title_en: "New group",
				},
				data: [],
			});
		},

		getAdditiveName(id) {
			return this.chain_additives.find(add => add.id === id)?.name_ru;
		},

		getAdditivePrice(id) {
			const price = this.chain_additives.find(add => add.id === id)?.price;
			return `${formatNumberWithSpaces(price)} сум`;
		},

		openDeleteCategoryModal(index) {
			this.deleteAdditivesModalOpen = true;
			this.category_under_action_index = index;
		},

		deleteAdditive() {
			this.additives.splice(this.category_under_action_index, 1);
			this.closeDeleteModal();
		},

		closeCategoryModal() {
			this.categoryNameModalOpen = false;
			this.category_under_action = null;
			this.category_under_action_index = null;
		},

		closeAdditivesModal() {
			this.additiveModalOpen = false;
			this.category_under_action = null;
			this.category_under_action_index = null;
		},

		closeDeleteModal() {
			this.deleteAdditivesModalOpen = false;
			this.category_under_action_index = null;
		},
	},

	mounted() {
		this.loadAdditives();
	},

	watch: {
		additives: {
			deep: true,
			handler() {
				this.$emit("update:modelValue", this.additives);
			},
		},
		chain_id: {
			immediate: true,
			handler(newValue) {
				if (newValue) this.loadAdditives();
			},
		},
		modelValue: {
			deep: true,
			immediate: true,
			handler(newValue) {
				this.additives = newValue;
			},
		},
	},

	components: {
		CustomButton,
		AdditivesModal,
		CategoryNameModal,
		DangerModal,
	},
};
</script>

<style lang="scss" scoped>
.additives {
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

.add-additives {
	@include flex-center;
	border-radius: 1rem;
	border: 2px dashed $primary;
	height: 6rem;
	cursor: pointer;
}

.additive {
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
