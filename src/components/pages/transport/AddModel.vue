<template>
    <section class="add-transport transport__content">
        <CustomButton icon="fi-rr-arrow-left" class="mb-8 width-fit" @click="$router.go(-1)">Назад</CustomButton>

        <div class="transport-container w-full flex flex-col justify-center bg-white p-[24px] rounded-[12px] border-[1px]">
            <h2 class="table-title" v-if="transportMark">{{ isEditMode ? "Редактировать модель марки: " : "Добавить модель марки: " }} {{ transportMark.name }}</h2>

            <div class="py-4 w-[400px]">
                <form @submit.prevent="submitForm" class="form">
                    <div class="form__field">
                        <label for="model-name" class="form__label">Название модели:</label>

                        <input
                            type="text"
                            class="form__input"
                            id="model-name"
                            name="model"
                            placeholder="Cobalt"
                            v-model="model.value">

                        <span v-if="!model.isValid" class="form__error" v-text="model.message"/>
                    </div>

                    <CustomButton class="h-14 mt-5 radius-75" :loading="loading">Сохранить</CustomButton>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import transport from '@/api/transport';
import CustomButton from '@/components/shared/CustomButton.vue';

export default {
    components: {
        CustomButton
    },

    data: () => ({
        isEditMode: false,
        loading: false,
        transportMark: null,
        model: {
            value: '',
            isValid: true,
            message: ''
        },
    }),

    methods: {
        async setTransportMark () {
            const response = await transport.getOneTransportCategory(this.$route.params.mark_id);
            this.transportMark = response;
        },

        submitForm() {
            const model = this.model.value;

            if (!model) {
                this.model.isValid = false;
                this.model.message = 'Название не может быть пустым';
            } else {
                this.isEditMode ? this.updateModel() : this.createModel();
            }
        },

        async createModel () {
            const data = {
                name: this.model.value,
                description: "123",
                category_id: this.$route.params.mark_id
            };

            try {
                this.loading = true;
                const response = await transport.createTransportModel(data);
                if(response) this.$router.push(`/transport?mark_id=${this.$route.params.mark_id}`);
            } catch(err) {
                console.log("Ошибка при добавлении модели: ", err)
            } finally {
                this.loading = false;
            }
        },

        async updateModel () {
            const data = {
                name: this.model.value,
                description: "123",
                category_id: this.$route.params.mark_id
            };

            try {
                this.loading = true;
                const response = await transport.updateTransportModel(data, this.$route.query.model_id);
                if(response) this.$router.push(`/transport?mark_id=${this.$route.params.mark_id}`);
            } catch(err) {
                console.log("Ошибка при обновлении модели: ", err)
            } finally {
                this.loading = false;
            }
        }
    },

    async mounted() {
        this.setTransportMark();

        this.isEditMode = this.$route.query.model_id && this.$route.query.mode === "edit";

        if(this.isEditMode) {
            const response = await transport.getOneTransportModel(this.$route.query.model_id);
            this.model.value = response.name;
        }
    }
};
</script>