<template>
	<div class="image-uploader" :style="{ width, height }" :class="{ 'image-uploader--disabled': disabled }">
		<input
			type="file"
			accept="image/*"
			class="image-uploader__input opacity-0 absolute top-0 left-0 rounded-full z-20"
			@change="uploadImage"
		/>

		<img
			v-if="image"
			:src="image"
			alt="Image Preview"
			class="image-uploader__preview drop-shadow relative z-10"
			:style="{ borderRadius }"
		/>

		<div v-else :style="{ borderRadius }" class="image-uploader__add relative z-10">
			<i class="fi fi-rr-cloud-upload-alt"></i>
			<p class="text-gray-500">{{ text }}</p>
		</div>
	</div>
</template>

<script>
export default {
	emits: ["update:image", "send:file"],

	props: {
		image: {
			type: String,
			default: null,
		},
		text: {
			type: String,
			default: "Загрузить",
		},
		width: {
			type: String,
			default: "150px",
		},
		height: {
			type: String,
			default: "150px",
		},
		borderRadius: {
			type: String,
		},
		disabled: {
			type: Boolean,
		},
	},

	methods: {
		uploadImage(event) {
			const file = event.target.files[0];
			if (file) {
				const imageURL = URL.createObjectURL(file);

				this.$emit("update:image", imageURL);
				this.$emit("send:file", file);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.image-uploader {
	position: relative;
	flex-shrink: 0;
	&--disabled {
		pointer-events: none;
		cursor: default;
	}
	&__add {
		@include flex-center-column;
		gap: 0.25rem;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px dashed $primary;
		i {
			font-size: 1.75rem;
			color: $primary;
		}
		p {
			text-align: center;
			font-size: 1.125rem;
			font-weight: bold;
		}
	}
	&__preview {
		border-radius: 50%;
	}
	&__preview,
	&__input {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
}
</style>
