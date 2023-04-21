<template>
    <div class="loginLayout">
        <router-view/>
        <div class="tip">
      <span
      >&copy; {{ new Date().getFullYear() }} Vận Trình Số. Được phát triển bởi <i class="fa fa-heart" style="color:#f46a6a"
                                                                               aria-hidden="true"></i>
        <a href="https://zentsoft.com/" target="_bank"> ZentSoft</a></span
      >
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginLayout',
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/layouts/login-layout/login_layout";
</style>
