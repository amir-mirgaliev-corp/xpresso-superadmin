<template>
	<div class="bg-white rounded-[12px] p-6 border-[1px] w-full">
		<h2 class="table-title">{{ initialBranchData ? `Филиал ${initialBranchData?.name}` : "Новый филиал" }}</h2>

		<div class="">
			<div class="mb-6">
				<label class="form__label">Фото филиала</label>

				<ImageUploader
					width="400px"
					height="175px"
					border-radius="16px"
					:disabled="!editEnabled"
					:image="mediaPreview"
					@update:image="mediaPreview = $event"
					@send:file="branchData.media = $event"
				/>

				<span v-if="v$.branchData.media.$errors.length" class="form__error">Загрузите фото</span>
			</div>

			<form class="form max-w-[1100px] w-full" @submit.prevent="submitForm">
				<fieldset class="block grid grid-cols-2 gap-4 w-full" :disabled="!editEnabled">
					<div class="form__field">
						<label for="branch-name" class="form__label">Название филиала</label>
						<input
							v-model="branchData.name"
							type="text"
							class="form__input"
							id="branch-name"
							name="branch-name"
							placeholder="Введите значение"
							:class="{ error: v$.branchData.name.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="branch-lang" class="form__label">Долгота</label>
						<input
							v-model="branchData.lang"
							type="text"
							class="form__input"
							id="branch-lang"
							name="branch-lang"
							placeholder="Введите долготу"
							:class="{ error: v$.branchData.lang.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="branch-phone" class="form__label">Номер телефона</label>
						<input
							v-model="branchData.phone"
							type="text"
							class="form__input"
							id="branch-phone"
							name="branch-phone"
							placeholder="+998"
							:class="{ error: v$.branchData.phone.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label for="branch-log" class="form__label">Введите широту</label>
						<input
							v-model="branchData.log"
							type="text"
							class="form__input"
							id="branch-log"
							name="branch-log"
							placeholder="Введите широту"
							:class="{ error: v$.branchData.log.$errors.length }"
						/>
					</div>

					<div class="form__field">
						<label class="form__label">Способ получения</label>
						<CustomSelect
							select-class="h-[52px] !rounded-[12px]"
							v-model="branchData.delivery"
							:disabled="!editEnabled"
							:options="deliveryOptions"
							:show-error="v$.branchData.delivery.$errors.length"
						/>
					</div>

					<div class="form__field">
						<label for="branch-time" class="form__label">Время приготовления</label>
						<div class="form__field-cookingTime">
							<input
								v-model="branchData.cookingTime"
								type="text"
								class="form__input"
								id="branch-time"
								name="branch-time"
								placeholder="Введите время"
								:class="{ error: v$.branchData.cookingTime.$errors.length }"
								@input="branchData.cookingTime = branchData.cookingTime.replace(/\D/g, '')"
							/>

							<span class="cooking-time-unit"> минут </span>
						</div>
					</div>

					<div class="form__field">
						<label for="branch-time" class="form__label">Время открытия</label>

						<div class="border px-6 py-4 rounded-2xl">
							<input
								type="time"
								v-model="branchData.start_time"
								class="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
							/>
						</div>

						<span v-if="v$.branchData.start_time.$errors.length" class="form__error"
							>Введите время открытия</span
						>
					</div>

					<div class="form__field">
						<label for="branch-time" class="form__label">Время закрытия</label>

						<div class="border px-6 py-4 rounded-2xl">
							<input
								type="time"
								v-model="branchData.end_time"
								class="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
							/>
						</div>

						<span v-if="v$.branchData.end_time.$errors.length" class="form__error"
							>Введите время закрытия</span
						>
					</div>
				</fieldset>

				<div v-if="!initialBranchData && editEnabled" class="col-span-2 mt-4">
					<CustomButton class="width-fit h-12">Добавить заведение</CustomButton>
				</div>

				<div
					v-if="initialBranchData && editEnabled"
					class="user-profile__controls grid grid-cols-2 gap-4 mt-4 max-w-[400px]"
				>
					<CustomButton type="secondary" btn-type="button" class="h-12" @click="cancelEdit">
						Отменить
					</CustomButton>

					<CustomButton class="h-12">Сохранить</CustomButton>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf, numeric, minValue } from "@vuelidate/validators";

import CustomSelect from "@/components/shared/CustomSelect.vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import ImageUploader from "@/components/shared/ImageUploader.vue";
import WorkSchedule from "@/components/ui/WorkSchedule.vue";

import branches from "@/api/branches";

const env = import.meta.env;

export default {
	props: ["cancelEdit"],

	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	validations() {
		return {
			branchData: {
				media: {
					required: requiredIf(() => {
						return !this.initialBranchData;
					}),
				},
				name: { required },
				lang: { required, numeric },
				log: { required, numeric },
				phone: { required },
				delivery: { required },
				cookingTime: { required, numeric, minValue: minValue(1) },
				start_time: { required },
				end_time: { required },
			},
		};
	},

	props: {
		editEnabled: Boolean,
		initialBranchData: {
			type: Object,
			required: true,
		},
	},

	components: {
		ImageUploader,
		WorkSchedule,
		CustomSelect,
		CustomButton,
	},

	data: () => ({
		loading: false,
		mediaPreview: null,
		editEnabled: false,
		branchData: {
			media: null,
			name: "",
			lang: "",
			log: "",
			phone: "",
			delivery: "",
			cookingTime: "",
			start_time: "",
			end_time: "",
		},
		deliveryOptions: [
			{ id: 0, name: "delivery", title: "Вынос к авто" },
			{ id: 1, name: "pickup", title: "Самовывоз" },
		],
	}),

	methods: {
		async createBranch() {
			const formData = new FormData();
			const id = this.$route.params.chain_id;

			formData.append("chain_id", id);
			formData.append("media", this.branchData.media);
			formData.append("name", this.branchData.name);
			formData.append("latitude", this.branchData.lang);
			formData.append("longitude", this.branchData.log);
			formData.append("phone", this.branchData.phone);
			formData.append("delivery_type", this.branchData.delivery.name);
			formData.append("prepared_time", +this.branchData.cookingTime);
			formData.append("start_time", this.branchData.start_time);
			formData.append("end_time", this.branchData.end_time);

			try {
				this.loading = true;
				const responseStatus = await branches.createBranch(formData);
				if (responseStatus === 200) this.$router.push(`/chain/${this.$route.params.chain_id}`);
			} catch (err) {
				console.log("Error creating branch", err);
			} finally {
				this.loading = false;
			}
		},

		async updateBranch() {
			console.log(this.initialBranchData);

			const formData = new FormData();
			const chain_id = this.initialBranchData.chainId;
			const branch_id = this.initialBranchData.id;

			formData.append("chain_id", chain_id);
			formData.append("name", this.branchData.name);
			formData.append("latitude", this.branchData.lang);
			formData.append("longitude", this.branchData.log);
			formData.append("phone", this.branchData.phone);
			formData.append("delivery_type", this.branchData.delivery.name);
			formData.append("prepared_time", +this.branchData.cookingTime);
			formData.append("start_time", this.branchData.start_time);
			formData.append("end_time", this.branchData.end_time);

			if (this.branchData.media) formData.append("media", this.branchData.media);

			try {
				this.loading = true;
				const responseStatus = await branches.updateBranch(branch_id, formData);
				if (responseStatus === 200) location.reload();
			} catch (err) {
				console.log("Error updating branch", err);
			} finally {
				this.loading = false;
			}
		},

		setBranchData() {
			this.mediaPreview = env.VITE_APP_STATIC_URL + this.initialBranchData.media;
			this.branchData.name = this.initialBranchData.name;
			this.branchData.log = this.initialBranchData.longitude;
			this.branchData.lang = this.initialBranchData.latitude;
			this.branchData.phone = this.initialBranchData.phone;
			this.branchData.cookingTime = this.initialBranchData.preparedTime;
			this.branchData.start_time = this.initialBranchData.startTime;
			this.branchData.end_time = this.initialBranchData.endTime;
			this.branchData.delivery = this.deliveryOptions.find(
				option => option.name === this.initialBranchData.deliveryType,
			);
		},

		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				if (this.initialBranchData) {
					this.updateBranch();
				} else {
					this.createBranch();
				}
			}
		},

		cancelEdit() {
			this.setBranchData();
			this.$emit("cancelEdit");
		},
	},

	mounted() {
		if (this.initialBranchData) {
			this.setBranchData();
		}
	},
};
</script>

<style lang="scss" scoped>
.form__input {
	height: 3.25rem;
}
.form__field-cookingTime {
	@include flex-center-vert;
	gap: 1rem;
	.form__input {
		width: fit-content;
	}
}
.form__label,
h3 {
	font-size: 1rem;
}

h3 {
	margin-bottom: 0.5rem;
}
</style>
