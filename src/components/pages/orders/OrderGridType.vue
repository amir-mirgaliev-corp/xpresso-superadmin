<template>
    <div class="grid-type my-4">
        <div class="grid-type__item" @click="$emit('setLayout', 'grid')" :class="{ active: activeLayout === 'grid' }">
            <div class="grid-type__icon layout-grid"></div>
        </div>

        <div class="grid-type__item" @click="$emit('setLayout', 'column')" :class="{ active: activeLayout === 'column' }">
            <div class="grid-type__icon layout-column">
                <span></span> <span></span> <span></span> <span></span>
            </div>
        </div>

        <div class="grid-type__item" @click="$emit('setLayout', 'line')" :class="{ active: activeLayout === 'line' }">
            <div class="grid-type__icon layout-line"></div>
            <div class="grid-type__icon layout-line"></div>
        </div>
    </div>
</template>

<script>
    export default {
        emit: ["setLayout"],
        props: {
            activeLayout: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .grid-type {
        @include flex-center-vert;
        gap: 2rem;
        width: fit-content;
        margin-left: auto;
        border: 1px solid #D0D5DD;
        border-radius: 12px;
        background-color: $white;
        padding: 12px 20px;
        &__item {
            @include flex-center-column;
            width: 28px;
            height: 28px;
            border-radius: 6px;
            border: 2px solid #D0D5DD;
            padding: 4px;
            cursor: pointer;
            &.active {
                border-color: $black;
                & > *:not(.layout-column) {
                    background-color: $black;
                }
                & > .layout-column span {
                    background-color: $black;
                }
            }
        }
        &__icon {
            &.layout-grid {
                background-color: #D0D5DD;
                width: 14px;
                height: 8px;
                border-radius: 2px;
            }
            &.layout-column {
                @include grid(2, 1px);
                width: 100%;
                height: 100%;
                & > span {
                    display: block;
                    background-color: #D0D5DD;
                    border-radius: 1px;
                }
            }
            &.layout-line {
                background-color: #D0D5DD;
                width: 100%;
                height: 8px;
                border-radius: 2px;
                &:not(:last-child) {
                    margin-bottom: 2px;
                }
            }
        }
    }
</style>