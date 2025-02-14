<template>
    <form class="modificator__form mt-[30px]">
        <div class="modificator__form-container flex flex-col ml-[100px] gap-[20px]">
            <h2 class="text-[20px] font-bold text-dark-blue-text">Создание модификатора</h2>
            <FormInput 
                :settings-label="modificatorNameRu.label"
                :placeholder="modificatorNameRu.placeholder"
                :type="modificatorNameRu.type"
                :height="modificatorNameRu.height"
                :width="modificatorNameRu.width"
            />

            <FormInput 
                :settings-label="modificatorNameEn.label"
                :placeholder="modificatorNameEn.placeholder"
                :type="modificatorNameEn.type"
                :height="modificatorNameEn.height"
                :width="modificatorNameEn.width"
            />

            <FormInput 
                :settings-label="modificatorNameUz.label"
                :placeholder="modificatorNameUz.placeholder"
                :type="modificatorNameUz.type"
                :height="modificatorNameUz.height"
                :width="modificatorNameUz.width"
            />

            <RadioButton 
                :text="radiobutton.text"
            />
        </div>
    </form>
</template>

<script>

import FormInput from './FormInput.vue';
import RadioButton from './RadioButton.vue';


export default {
    data: () => ({
        modificatorNameRu: {
            label: '',
            height: '50px',
            type: 'text',
            width: '80%',
            placeholder: 'Сахар'
        }, 

        modificatorNameEn: {
            label: '',
            height: '50px',
            type: 'text',
            width: '80%',
            placeholder: 'Sugar'
        },

        modificatorNameUz: {
            label: '',
            height: '50px',
            width: '80%',
            type: 'text',
            placeholder: 'Shakar'
        },

        radiobutton: {
            text: 'Обязательный'
        }
    }),

    components: {
        FormInput,
        RadioButton
    }
}

</script>