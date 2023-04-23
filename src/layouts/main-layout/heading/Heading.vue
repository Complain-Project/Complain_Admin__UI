<template>
    <section class="heading h-[62px] flex items-center justify-between bg-white relative px-5 w-full">
        <div class="header-left">
            <button
                class="flex-center float-right bg-white rounded-md w-[30px] h-[30px]"
                :class="{'mx-0': collapseSidebarComputed}"
                @click="handleCollapseSidebar()"
            >
                <inline-svg
                    class="w-5 h-5 text-[#8a8b8c] hover:text-[#009ef7]"
                    :src="collapseIcon"
                />
            </button>
        </div>
        <div class="header-right flex items-center">
            <div class="user-name mx-3 pl-3 font-bold text-[#6b798f] border-solid">{{authUserComputed.name}}</div>
            <el-dropdown>
                <span class="el-dropdown-link">
                  <el-avatar :size="37" :src="authUserComputed.avatar ? authUserComputed.avatar :userDefault" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toProfile">Thông tin tài khoản</el-dropdown-item>
                        <el-dropdown-item @click="logout" divided>Đăng xuất</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </section>
</template>

<script>
import { Actions, Mutations } from "@/store/enums/_type_enum";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
    name: "HeadingLayout",
    setup(){
        const store = useStore()
        const userDefault = ref(require("@/assets/images/userDefault.png"));
        const collapseIcon = ref(require("@/assets/images/icons/bars.svg"));
        const notification = ref(require("@/assets/images/icons/bell.svg"));

        const authUserComputed = computed(() => store.state.authModule.authUser);
        const collapseSidebarComputed = computed(() => store.state.layoutModule.collapseSidebar);

        const toProfile = () => {
            store.commit(`layoutModule/${Mutations.SET_COLLAPSE_PROFILE}`, true)
        }
        const logout = () => {
            store.commit(`homeModule/${Mutations.SET_IS_LOGIN}`, false)
            store.dispatch(`authModule/${Actions.LOGOUT}`)
        }
        const handleCollapseSidebar = () => {
            store.commit(`layoutModule/${Mutations.SET_COLLAPSE_SIDEBAR}`, !collapseSidebarComputed.value)
        };
        return {
            userDefault,
            collapseIcon,
            notification,
            authUserComputed,
            collapseSidebarComputed,
            toProfile,
            logout,
            handleCollapseSidebar
        }
    }
};
</script>

<style scoped lang="scss">
@import "src/assets/styles/scss/layouts/main-layout/heading/heading";
</style>