<template>
    <div class="modificator__create mt-[30px] border-b-[2px] p-[20px_0]">
        <h2 class="title font-bold text-[24px] text-dark-blue-text">Добавить модификаторы</h2>
        <div v-for="modificator in modificators" :key="modificator.id">
            <ModificatorForm />
        </div>
        <div class="button flex items-center gap-[10px] 
                    cursor-pointer p-[0_20px]" 
                    @click="addModificator"
                    :class="`w-[${button.width}]`"
        >
            <span><Add /></span>
            <Button 
                :bg-color="button.bgColor"
                :color="button.color"
                :width="button.width"   
                :height="button.height"
                :border-color="button.borderColor"
                :text="button.text"
                :type="button.type"
            />
        </div>
    </div>
</template>

<script>

import Button from './Button.vue';
import ModificatorForm from './ModificatorForm.vue';
import Add from '../icons/add/Add.vue';

export default {
    data: () => ({
        button: {
            text: 'Добавить модификатор',
            type: 'button',
            color: '#000000',
            bgColor: 'white',
            width: '250px',
            height: '50px',
            borderColor: 'none',
            type: 'button'
        },

        modificators: []
    }),

    methods: {
        addModificator() {
            this.modificators.push({
                nameUz: '',
                nameRu: '',
                nameEn: '',
            });
        }
    },

    components: {
        Button,
        ModificatorForm,
        Add
    }
}

</script>