<template>
    <div class="tabs">
        <ul class="tabs__header">
            <li
                v-for="tab in tabs"
                :key="tab.title"
                @click="selectTab(tab)"
                class="tabs__header-item"
                :class="{ active: tab.name === selectedName }">
                {{ tab.title }}
            </li>
        </ul>
        <slot />
    </div>
</template>

<script>
    import { ref, provide } from "vue";

    export default {
        props: ["initialTab"],
        data() {
            return {
                tabs: [],
                selectedName: null,
            };
        },
        mounted() {
            this.tabs = this.$slots.default().map(tab => {
                return {
                    name: tab.props?.name,
                    title: tab.props.title
                }
            });

            this.initialTab ? this.selectedName = this.initialTab : this.selectedName = this.tabs[0].name;
        },
        methods: {
            selectTab(tab) {
                this.selectedName = tab.name;
                this.$router.replace({ query: { tab: tab.name } })
            }
        },
        setup() {
            const selectedName = ref(null);

            provide("selectedName", selectedName);

            return {
                selectedName,
            };
        },
        watch: {
            initialTab: {
                once: true,

                handler(newValue) {
                    if(newValue) this.selectedName = newValue;
                }
            }
        }
    };
</script>