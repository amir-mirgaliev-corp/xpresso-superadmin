<template>
    <div
        class="avatar-placeholder flex items-center justify-center w-32 h-32 mb-6 rounded-full border-2 border-gray-300 cursor-pointer"
        @click="openAvatarPicker"
    >
        <img
            v-if="avatar"
            :src="avatar"
            alt="Аватар"
            class="w-full h-full rounded-full"
        />
       

        <!-- Модальное окно выбора аватара -->
        <AvatarPicker
            v-if="isPickerOpen"
            :avatars="avatars"
            @select="selectAvatar"
            @close="closeAvatarPicker"
        />
    </div>
</template>

<script>


export default {
    components: { 
		AvatarPicker 
	},
    props: {
        avatar: {
            type: String,
            default: null,
        },
        avatars: {
            type: Array,
            required: true,
        },
    },

    emits: ['update:avatar'],

    data:()=>( {
		isPickerOpen: false,
	}),
    
    methods: {
        openAvatarPicker() {
            this.isPickerOpen = true;
        },
        closeAvatarPicker() {
            this.isPickerOpen = false;
        },
        selectAvatar(avatar) {
            this.$emit('update:avatar', avatar);
            this.closeAvatarPicker();
        },
    },
};
</script>

