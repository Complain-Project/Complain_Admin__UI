<template>
    <div id="app">
        <MainLayout v-if="isAuthenticatedComputed"/>
        <LoginLayout v-if="!isAuthenticatedComputed"/>
    </div>
</template>

<script>
import MainLayout from "@/layouts/main-layout/MainLayout.vue"
import LoginLayout from '@/layouts/login-layout/LoginLayout.vue'
import {useStore} from "vuex";
import {computed} from "vue";

export default {
    name: "app",
    components: {
        MainLayout,
        LoginLayout
    },
    setup() {
        const store = useStore();

        /* Computed::start */
        const isAuthenticatedComputed = computed(() => store.state.authModule.isAuthenticated);
        /* Computed::end */

        return {
            isAuthenticatedComputed,
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/styles/scss/_global.scss";
</style>