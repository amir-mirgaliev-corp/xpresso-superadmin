<template>
	<div class="bg-white rounded-[12px] p-6 border-[1px] w-full">
		<h2 class="table-title">{{ title }}</h2>

		<div class="">
			<div class="mb-6">
				<label class="form__label">Фотография филиала</label>

				<div class="w-[400px] max-sm:max-w-full">
					<ImageUploader
						width="100%"
						height="175px"
						border-radius="16px"
						:disabled="!editEnabled"
						:image="background_preview"
						@update:image="background_preview = $event"
						@send:file="branchData.background_img = $event"
					/>
				</div>

				<span v-if="v$.branchData.background_img.$errors.length" class="form__error">Загрузите фото</span>
			</div>

			<form class="form max-w-[1100px] w-full" @submit.prevent="submitForm">
				<div class="flex items-center gap-6 mb-6">
					<Switcher v-model="branchData.delivery_to_vehicle" :disabled="!editEnabled" label="Вынос к авто" />
					<Switcher v-if="initialBranchData" v-model="branchData.is_open_now" label="Технические работы" />
				</div>

				<fieldset class="grid grid-cols-2 gap-4 w-full" :disabled="!editEnabled">
					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-name" class="form__label">Название филиала</label>
						<input
							v-model="branchData.name"
							type="text"
							class="form__input"
							id="branch-name"
							name="branch-name"
							placeholder="Введите название"
							:class="{ error: v$.branchData.name.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-phone" class="form__label">Номер телефона</label>
						<input
							v-model="branchData.phone_number"
							type="text"
							class="form__input"
							id="branch-phone"
							name="branch-phone"
							placeholder="+998"
							:class="{ error: v$.branchData.phone_number.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-time" class="form__label">Время приготовления</label>
						<div class="form__field-preparing_time">
							<input
								v-model="branchData.preparing_time"
								type="text"
								class="form__input max-sm:!w-full"
								id="branch-time"
								name="branch-time"
								placeholder="Введите время"
								:class="{ error: v$.branchData.preparing_time.$errors.length }"
								@input="branchData.preparing_time = branchData.preparing_time.replace(/\D/g, '')"
							/>

							<span class="cooking-time-unit"> минут </span>
						</div>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-latitude" class="form__label">Широта</label>
						<input
							v-model="branchData.latitude"
							type="text"
							class="form__input"
							id="branch-latitude"
							name="branch-latitude"
							placeholder="Введите широту"
							:class="{ error: v$.branchData.latitude.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-longitude" class="form__label">Долгота</label>
						<input
							v-model="branchData.longitude"
							type="text"
							class="form__input"
							id="branch-longitude"
							name="branch-longitude"
							placeholder="Введите долготу"
							:class="{ error: v$.branchData.longitude.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-address-ru" class="form__label">Адрес на русском</label>
						<input
							v-model="branchData.address_ru"
							type="text"
							class="form__input"
							id="branch-address-ru"
							name="branch-address-ru"
							placeholder="Введите адрес"
							:class="{ error: v$.branchData.address_ru.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-address-uz" class="form__label">Адрес на узбекском</label>
						<input
							v-model="branchData.address_uz"
							type="text"
							class="form__input"
							id="branch-address-uz"
							name="branch-address-uz"
							placeholder="Введите адрес"
							:class="{ error: v$.branchData.address_uz.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-address-en" class="form__label">Адрес на английском</label>
						<input
							v-model="branchData.address_en"
							type="text"
							class="form__input"
							id="branch-address-en"
							name="branch-address-en"
							placeholder="Введите адрес"
							:class="{ error: v$.branchData.address_en.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-iiko-id" class="form__label">API Login IIKO</label>
						<input
							v-model="branchData.iiko_id"
							type="text"
							class="form__input"
							id="branch-iiko-id"
							name="branch-iiko-id"
							placeholder="Введите значение"
							:class="{ error: v$.branchData.iiko_id.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-atmos-id" class="form__label">ATMOS ID</label>
						<input
							v-model="branchData.payment_id_atmos"
							type="text"
							class="form__input"
							id="branch-atmos-id"
							name="branch-atmos-id"
							placeholder="Введите значение"
							:class="{ error: v$.branchData.payment_id_atmos.$errors.length }"
						/>
					</div>

					<div class="form__field max-sm:flex max-sm:flex-col max-sm:justify-between">
						<label for="branch-atmos-id" class="form__label">PAYLOV ID</label>
						<input
							v-model="branchData.payment_id_paylov"
							type="text"
							class="form__input"
							id="branch-atmos-id"
							name="branch-atmos-id"
							placeholder="Введите значение"
							:class="{ error: v$.branchData.payment_id_paylov.$errors.length }"
						/>
					</div>

					<div class="form__field col-span-full">
						<label class="form__label">График работы</label>
						<BranchSchedule v-model:schedule="branchData.working_time" :edit-enabled="editEnabled" />
					</div>
				</fieldset>

				<div v-if="!initialBranchData && editEnabled" class="col-span-2 mt-4">
					<CustomButton class="width-fit h-12" :loading="loading">Создать филиал</CustomButton>
				</div>

				<div
					v-if="initialBranchData && editEnabled"
					class="user-profile__controls grid grid-cols-2 gap-4 mt-4 max-w-[400px]"
				>
					<CustomButton type="secondary" btn-type="button" class="h-12" @click="cancelEdit">
						Отменить
					</CustomButton>

					<CustomButton class="h-12" :loading="loading">Сохранить</CustomButton>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf, numeric, minValue } from "@vuelidate/validators";

import CustomSelect from "@/components/shared/ui/CustomSelect.vue";
import Switcher from "@/components/shared/ui/Switcher.vue";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ImageUploader from "@/components/shared/ui/ImageUploader.vue";
import BranchSchedule from "../components/BranchSchedule.vue";

import branches from "@/api/branches";

export default {
	props: ["update", "cancel-edit"],

	setup() {
		return {
			v$: useVuelidate(),
			toast: useToast(),
		};
	},

	validations() {
		return {
			branchData: {
				background_img: { required: requiredIf(() => !this.initialBranchData) },
				name: { required },
				phone_number: { required },
				preparing_time: { required, numeric, minValue: minValue(1) },
				iiko_id: { required },
				payment_id_atmos: { required },
				payment_id_paylov: { required },
				latitude: { required, numeric },
				longitude: { required, numeric },
				address_ru: { required },
				address_uz: { required },
				address_en: { required },
			},
		};
	},

	props: {
		editEnabled: Boolean,
		initialBranchData: Object,
	},

	components: {
		ImageUploader,
		BranchSchedule,
		CustomSelect,
		CustomButton,
		Switcher,
	},

	data: () => ({
		loading: false,
		background_preview: null,
		editEnabled: false,
		branchData: {
			background_img: null,
			name: "",
			phone_number: "",
			delivery_to_vehicle: false,
			preparing_time: "",
			iiko_id: "",
			payment_id_atmos: "",
			payment_id_paylov: "",
			latitude: "",
			longitude: "",
			address_ru: "",
			address_uz: "",
			address_en: "",
			working_time: {
				monday: "08:00-23:00",
				tuesday: "08:00-23:00",
				wednesday: "08:00-23:00",
				thursday: "08:00-23:00",
				friday: "08:00-23:00",
				saturday: "",
				sunday: "",
			},
		},
	}),

	computed: {
		title() {
			return this.initialBranchData ? `Филиал ${this.initialBranchData?.full_name}` : "Новый филиал";
		},
	},

	methods: {
		async createBranch() {
			const formData = new FormData();
			const chain_id = this.$route.params.chain_id;

			const { background_img, ...dataWithoutImg } = this.branchData;
			formData.append("data", JSON.stringify(dataWithoutImg));
			formData.append("background_img", background_img);

			this.loading = true;
			const response_status = await branches.createBranch(chain_id, formData);
			this.loading = false;

			if (response_status === 201) {
				setTimeout(() => {
					this.$router.push(`/chain/${chain_id}?tab=branches`);
				}, 1500);
			}
		},

		async updateBranch() {
			const formData = new FormData();
			const branch_id = this.$route.params.branch_id;
			const updatedFields = {};

			Object.keys(this.branchData).forEach(key => {
				if (key !== "background_img") {
					const currentValue = this.branchData[key];
					const initialValue = this.initialBranchData[key];

					const isObject = typeof currentValue === "object" && currentValue !== null;

					if (!isObject && currentValue !== initialValue) {
						updatedFields[key] = currentValue;
					} else if (isObject && JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
						updatedFields[key] = currentValue;
					}
				}
			});

			if (Object.keys(updatedFields).length > 0) {
				formData.append("data", JSON.stringify(updatedFields));
			}

			if (this.branchData.background_img) {
				formData.append("background_img", this.branchData.background_img);
			}

			if (!formData.has("data") && !formData.has("background_img")) {
				this.toast.info("Нет изменений для обновления");
				return;
			}

			this.loading = true;
			const status = await branches.updateBranch(branch_id, formData);
			this.loading = false;

			if (status === 200) {
				this.$emit("update");
				this.$emit("cancel-edit");
			}
		},

		setBranchData() {
			this.background_preview = this.initialBranchData.background_img;
			this.branchData.name = this.initialBranchData.name;
			this.branchData.phone_number = this.initialBranchData.phone_number;
			this.branchData.preparing_time = this.initialBranchData.preparing_time;
			this.branchData.delivery_to_vehicle = this.initialBranchData.delivery_to_vehicle;
			this.branchData.longitude = this.initialBranchData.longitude;
			this.branchData.latitude = this.initialBranchData.latitude;
			this.branchData.address_ru = this.initialBranchData.address_ru;
			this.branchData.address_uz = this.initialBranchData.address_uz;
			this.branchData.address_en = this.initialBranchData.address_en;
			this.branchData.iiko_id = this.initialBranchData.iiko_id;
			this.branchData.payment_id_atmos = this.initialBranchData.payment_id_atmos;
			this.branchData.payment_id_paylov = this.initialBranchData.payment_id_paylov;
			this.branchData.working_time = this.initialBranchData.working_time;
		},

		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.initialBranchData ? this.updateBranch() : this.createBranch();
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
.form__field-preparing_time {
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
