<template>
    <section class="profile__content mt-[30px]">
        <div class="profile-container flex flex-col
            items-center p-8 pb-20 bg-white
            rounded-[15px] shadow-drop"
        >
            <h1 class="text-[40px] font-bold mb-6 text-[#1B2559]">Профиль</h1>

            <div
                class="avatar-placeholder flex items-center
                    justify-center w-[210px] h-[210px] mb-6
                    rounded-full border-2 border-gray-300 cursor-pointer"
                
            >
                <img
                    src="@/assets/images/avatars/default_avatar.svg"
                    alt="Аватар"
                    class="w-full h-full rounded-full"
                />
            </div>

            <div class="grid grid-cols-2 gap-10 w-full max-w-[600px]">
                <FormInput
                    settingsLabel="Имя" 
                    height="50px" 
                    v-model="name.value"
                    :isValid="name.isValid"
                    :message="name.message"
                />
                
                <FormInput
                    settingsLabel="Фамилия" 
                    height="50px"
                    v-model="surname.value"
                    :isValid="surname.isValid"
                    :message="surname.message"
                />

                <FormInput
                    settingsLabel="Логин"
                    height="50px"
                    v-model="login.value"
                    :isValid="login.isValid"
                    :message="login.message"
                />

                <FormInput
                    settingsLabel="Пароль"
                    height="50px"
                    type="password"
                    v-model="password.value"
                    :isValid="password.isValid"
                    :message="password.message"
                />
            </div>

            <Transition name="settings-piker">
                <AvatarPicker
                    v-if="isAvatarPickerOpen"
                    :avatars="avatars"
                    @select="selectAvatar"
                    @close="closeAvatarPicker"
                />
                
            </Transition>
            <div class="w-[600px] mt-[20px]">
                <Button 
                    :text="changeUser.text"
                    :color="changeUser.color"
                    :bg-color="changeUser.bgColor"
                    :border-color="changeUser.borderColor"
                    :width="changeUser.width"
                    @click="updateProfile"
                />
            </div>
        </div>
        <Loading v-if="loading" />
    </section>
</template>

<script>
import admins from '@/api/admins';
import AvatarPicker from '@/components/ui/AvatarPicker.vue';
import Button from '@/components/ui/Button.vue';
import FormInput from '@/components/ui/FormInput.vue';
import Loading from '@/views/Loading.vue';

import { mapActions, mapGetters } from 'vuex';

import Validator from '@/utils/validatorLogin';

export default {
    name: 'Profile',
    components: {
        AvatarPicker,
        FormInput,
        Button,
        Loading
    },
    data: () => ({
        isAvatarPickerOpen: false,
        selectedAvatar: 'avatar1.png',
        loading: false,
        name: {
            value: '',
            isValid: true,
            message: ''
        },
        surname: {
            value: '',
            isValid: true,
            message: ''
        },
        login: {
            value: '',
            isValid: true,
            message: ''
        },
        password: {
            value: '',
            isValid: true,
            message: ''
        },
        changeUser: {
            text: 'Редактировать профиль',
            color: '#000000',
            bgColor: '#FFFFFF',
            borderColor: '#CCCCCC',    
            width: '200px'
        },
    }),

    computed: {
        ...mapGetters(['getProfile'])
    },

    methods: {
        ...mapActions(['fetchProfile']),

        openAvatarPicker() {
            this.isAvatarPickerOpen = true;
        },

        validateInputs () {
            const login = this.login.value;
            const password = this.password.value;

            const validator = new Validator({ login, password });

            const isValidLogin = validator.validateLogin(true);
            const isValidPassword = validator.validatePassword(true);

            if (!isValidLogin.isValid) {
                this.login.isValid = false;
                this.login.message = isValidLogin.message;
            }

            if (!isValidPassword.isValid) {
                this.password.isValid = false;
                this.password.message = isValidPassword.message;
            }
        },

        async updateProfile () {
            const userId = this.getProfile.admin.id;
            const { name, surname, login, password } = this;

            this.validateInputs();

            if (!(this.login.isValid || this.password.isValid)) {
                return;
            }

            const profileNewData = {
                name: name.value,
                surname: surname.value,
                login: login.value,
                password: password.value,
            };

            this.loading = true;
        
            const updatedProfile = await admins.updateMyAdminAccount(userId, profileNewData);
            if (updatedProfile) {
                location.reload();
            }
        },

        closeAvatarPicker() {
            this.isAvatarPickerOpen = false;
        },
        
        selectAvatar(avatar) {
            this.selectedAvatar = avatar;
            this.closeAvatarPicker();
        },
    },

    async mounted () {
        await this.fetchProfile();

        this.name.value = this.getProfile.admin.name;  
        this.surname.value = this.getProfile.admin.surname; 
        //this.login.value = this.getProfile.admin.login; 
    }
};
</script>
