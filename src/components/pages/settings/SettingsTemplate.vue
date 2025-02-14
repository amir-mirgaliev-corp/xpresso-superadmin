<template>
	<section class="settings m-[30px]">
		<SettingsButtons />

        <TransitionGroup name="settings-layout"
            @before-enter="onBeforeEnter" 
            @after-leave="onAfterLeave"
        >
            <AdminProfile v-if="pageLayout === 'profile' && activeLayout === 'profile'"/>
            <IntegrationsSettings v-if="pageLayout === 'integrations' && activeLayout === 'integrations'"/>
            <TariffOption v-if="pageLayout === 'tariff'  && activeLayout === 'tariff'" />
            <DocumentsContent v-if="pageLayout === 'documents' && activeLayout === 'documents'" />
        </TransitionGroup>
	</section>
</template>

<script>
import AdminProfile from '@/components/pages/settings/AdminProfile.vue';
import SettingsButtons from '@/components/pages/settings/SettingsButtons.vue';
import TariffOption from '@/components/pages/settings/TariffOption.vue';
import IntegrationsSettings from './IntegrationsSettings.vue';
import DocumentsContent from './DocumentsContent.vue';

export default{
    data: () => ({
        pageLayout: 'profile',
        activeLayout: 'profile'
    }),
    methods: {
        changePageLayout () {
            this.pageLayout = this.$route.query.page_layout;
            console.log(this.pageLayout);
            
        },
        onBeforeEnter() {
            this.isTransitioning = true;
        },
        onAfterLeave() {
            this.activeLayout = this.pageLayout;
            this.isTransitioning = false;
        },
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler () {
                this.changePageLayout(); 
            }
        }
    },
    mounted () {
        this.$router.replace({ query: { page_layout: 'profile' }});
    },
	components: {
		SettingsButtons,
		AdminProfile,
        IntegrationsSettings,
        DocumentsContent,
		TariffOption
	}
}
</script>