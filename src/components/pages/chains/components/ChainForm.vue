<template>
	<form class="form create-chain" @submit.prevent="submitForm">
		<div class="flex items-center gap-8 bg-white p-[24px_32px] rounded-[12px] border-[1px]">
			<div>
				<ImageUploader
					:image="logoPreview"
					@update:image="logoPreview = $event"
					@send:file="formData.logo = $event"
				/>

				<span v-if="v$.formData.logo.$errors.length" class="form__error max-w-[150px] text-center"
					>Загрузите логотип</span
				>
			</div>

			<div class="form__field">
				<input
					type="text"
					name="new-chain"
					v-model="formData.name"
					placeholder="Введите название сети"
					class="form__input"
					:class="{ error: v$.formData.name.$errors.length }"
				/>

				<span v-if="v$.formData.name.$errors.length" class="form__error">Введите имя</span>
			</div>
		</div>

		<div class="max-w-72 mt-6">
			<CustomButton class="h-16 text-lg" :loading="loading">Сохранить</CustomButton>
		</div>
	</form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import CustomButton from "@/components/shared/ui/CustomButton.vue";
import ImageUploader from "@/components/shared/ui/ImageUploader.vue";
import chains from "@/api/chains";

const env = import.meta.env;

export default {
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	props: {
		value: {
			type: Object || null,
			required: false,
			default: null,
		},
	},

	data: () => ({
		loading: false,
		logoPreview: null,
		formData: {
			logo: "",
			name: "",
		},
	}),

	validations() {
		return {
			formData: {
				logo: { required },
				name: { required },
			},
		};
	},

	methods: {
		async submitForm() {
			const result = await this.v$.$validate();

			if (result) {
				this.value ? this.updateChain() : this.createChain();
			}
		},

		async createChain() {
			const fd = new FormData();

			fd.append("name", this.formData.name);
			fd.append("preview", this.formData.logo);

			try {
				this.loading = true;
				const status = await chains.createChain(fd);
				if (status === 201) this.$router.push("/chains");
			} catch (err) {
				console.log("Error creating chain: ", err);
			} finally {
				this.loading = false;
			}
		},

		async updateChain() {
			const fd = new FormData();

			fd.append("name", this.formData.name);
			fd.append("preview", this.formData.logo);

			try {
				this.loading = true;
				const status = await chains.updateChain(this.value.id, fd);
				if (status === 201) this.$router.push("/chains");
			} catch (err) {
				console.log("Error updating chain: ", err);
			} finally {
				this.loading = false;
			}
		},
	},

	mounted() {
		if (this.value) {
			this.logoPreview = env.VITE_APP_STATIC_URL + this.value.preview;
			this.formData.name = this.value.name;
		}
	},

	components: {
		CustomButton,
		ImageUploader,
	},
};
</script>

<style lang="scss" scoped>
.create-chain {
	.form__input {
		padding: 1.25rem;
		font-size: 1.5rem;
		height: 4.5rem;
		max-width: 600px;
		border-width: 2px;
	}
}
</style>
