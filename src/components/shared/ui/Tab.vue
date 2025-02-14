<template>
    <div class="tab-content mt-4" v-show="name === selectedTabName">
        <slot />
    </div>
</template>

<script>
    import { inject } from "vue";

    export default {
        props: ["title", "name"],
        setup() {
            const selectedTabName = inject("selectedName");

            return {
                selectedTabName
            };
        }
    };
</script>