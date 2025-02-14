<template>
    <div class="p-6 bg-white rounded-2xl shadow-drop w-full">

        <ImageUploader 
            :image= "branchData.image" 
            @update:image="branchData.image = $event"
            @send:file="branchData.file = $event"
        />

        <div class="grid grid-cols-2 gap-4">
            <FormInput 
                height="50px"
                label="Название филиала" 
                v-model="branchData.branchName.value" 
                placeholder="Введите название"
                :isValid="branchData.branchName.isValid" 
                :message="branchData.branchName.message"
            />

            <FormInput 
                height="50px"
                label="Долгота" 
                v-model="branchData.lang.value" 
                placeholder="Введите долготу" 
                type="number"
                :isValid="branchData.lang.isValid"
                :message="branchData.lang.message"
            />

            <FormInput 
                height="50px"
                label="Номер телефона" 
                v-model="branchData.phone.value" 
                placeholder="+998 00 000 00 00" 
                type="tel"
                :isValid="branchData.phone.isValid"
                :message="branchData.phone.message"
            />

            <FormInput 
                height="50px"
                label="Широта" 
                v-model="branchData.log.value"
                type="number" 
                placeholder="Введите широту" 
                :isValid="branchData.log.isValid"
                :message="branchData.log.message"
            />

            <FormSelect 
                label="Вынос к заказчику"
                height="50px"
                v-model="branchData.delivery" 
                :options="['Да', 'Нет']" 
            />

            <FormInput 
                height="50px"
                label="Время приготовления" 
                v-model="branchData.cookingTime" 
                placeholder="Введите время" 
                type="number"
            />

        </div>

        <div class="w-full flex gap-6">
            <div class="w-full  mt-6">
                <h3 class="text-lg font-medium mb-4">Часы работы</h3>
                <div class="border px-6 py-4 rounded-2xl">
                    <WorkSchedule 
                        :schedule="branchData.schedule" 
                        @update:schedule="branchData.schedule = $event" 
                        :days-of-week="daysOfWeek" 
                    />
                </div>
            </div>

            <div class="w-full mt-6">
                <h3 class="text-lg font-medium mb-4">Статус заведения</h3>
                <div class="border px-6 py-4 rounded-2xl">
                    <FormInput 
                        height="50px"
                        placeholder="Причина"
                    />
                    <div class="mt-4 gap-4 flex">
                        <Button
                            text="1 день"
                            color="#8E8E93"
                            bgColor="#FFFFFF"
                            borderColor="#DFEAF2"
                            width="100px"
                        />
                        <Button
                            text="3 дня"
                            color="#8E8E93"
                            bgColor="#FFFFFF"
                            borderColor="#DFEAF2"
                            width="100px"
                        />
                        <Button
                            text="1 неделя"
                            color="#8E8E93"
                            bgColor="#FFFFFF"
                            borderColor="#DFEAF2"
                            width="100px"
                        />
                    </div>
                    <div class="flex items-center justify-between mt-6">
                        <p>Не работаем</p>
                        <label class="user-profile__toggle inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="user-profile__toggle-input sr-only peer" v-model="isBaned" @change="banThisUser" />
                            <div
                                class="user-profile__toggle-switch relative 
                                        w-9 h-5 bg-gray-200 peer-focus:outline-none 
                                        rounded-full peer-checked:after:translate-x-full 
                                        rtl:peer-checked:after:-translate-x-full 
                                    peer-checked:after:border-white after:content-['']
                                        after:absolute after:top-[2px] after:start-[2px] 
                                    after:bg-white after:border-gray-300 after:border
                                        after:rounded-full after:h-4 after:w-4 after:transition-all
                                        dark:border-gray-600 peer-checked:bg-red-500"
                            ></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="branch__buttons m-[20px] flex gap-[20px]">
            <Button 
                :text="createBranch.text"
                :color="createBranch.color"
                :bg-color="createBranch.bgColor"
                :border-color="createBranch.borderColor"
                :width="createBranch.width"
                @click="createBranches"
            />
        </div>

        <Loading v-if="loading" />
    </div>
</template>

<script>
import FormInput from './FormInput.vue';
import FormSelect from './FormSelect.vue';
import ImageUploader from './ImageUploader.vue';
import WorkSchedule from './WorkSchedule.vue';
import Button from './Button.vue';
import branches from '@/api/branches';
import Loading from '@/views/Loading.vue';

import ValidatorBranch from '@/utils/validationBranches';

import { chain } from 'lodash';

export default {
    components: {
        ImageUploader,
        FormInput,
        FormSelect,
        WorkSchedule,
        Loading,
        Button
    },

    data: () => ({
        loading: false,
        createBranch: {
            text: 'Добавить заведение',
            color: '#FFFFFF',
            bgColor: '#19664D',
            borderColor: '#CCCCCC',    
            width: '200px'
        },

        branchData: {
            image: null,
            file: null,
            branchName: {
                value: '',
                isValid: true,
                message: ''
            },
            lang: {
                value: '',
                isValid: true,
                message: ''
            },
            log: {
                value: '',
                isValid: true,
                message: ''
            },
            phone: {
                value: '',
                isValid: true,
                message: ''
            },
            delivery: "Да",
            cookingTime: "",
            schedule: {
                Понедельник: { start: "", end: "", open: false },
                Вторник: { start: "", end: "", open: false },
                Среда: { start: "", end: "", open: false },
                Четверг: { start: "", end: "", open: false },
                Пятница: { start: "", end: "", open: false },
                Суббота: { start: "", end: "", open: false },
                Воскресенье: { start: "", end: "", open: false },
            },
        },
        daysOfWeek: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
    }),


    methods: {
        validateInputs() {
            const validator = new ValidatorBranch(this.branchData);

            const isValidBranchName = validator.validateBranchName();
            const isValidLang = validator.validateLang();
            const isValidLog = validator.validateLog();
            const isValidPhone = validator.validatePhone();

            if (!isValidBranchName.isValid) {
                this.branchData.branchName.isValid = false;
                this.branchData.branchName.message = isValidBranchName.message;

                return false;
            }

            if (!isValidLang.isValid) {
                this.branchData.lang.isValid = false;
                this.branchData.lang.message = isValidLang.message;

                return false;
            }

            if (!isValidLog.isValid) {
                this.branchData.log.isValid = false;
                this.branchData.log.message = isValidLog.message;

                return false;
            }

            if (!isValidPhone.isValid) {
                this.branchData.phone.isValid = false;
                this.branchData.phone.message = isValidPhone.message;

                return false;
            }

            return true;
        },

        async createBranches () {
            if (!this.validateInputs()) {
                return;
            }

            const formData = new FormData();
            const id = this.$route.params.chain_id;

            formData.append('name', this.branchData.branchName.value);
            formData.append('latitude', this.branchData.lang.value);
            formData.append('longitude', this.branchData.log.value);
            formData.append('phone', this.branchData.phone.value);
            formData.append('prepared_time', this.branchData.cookingTime.value);
            formData.append('logo', this.branchData.file);
            formData.append('media', this.branchData.file);
            formData.append('chain_id', id);

            console.log(this.branchData.file);
            
            const branch = await branches.createBranches(formData);

            this.loading = true;

            if (branch === 200) {
                location.reload();
            }
        }
    }
};
</script>
