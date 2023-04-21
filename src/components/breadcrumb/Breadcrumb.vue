<template>
    <div class="breadcrumb-wrap" v-if="breadcrumbComputed.length > 0">
        <div v-for="(data, index) in breadcrumbComputed" :key="index">
            <div v-if="index === 0" class="item-bread-crumb">
                <router-link :to="data.path" class="text-breadcrumb text-main">
                    <el-tooltip class="item" effect="dark" :content="data.name" placement="top-start">
                        <el-icon class="!text-[22px]"><HomeFilled /></el-icon>
                    </el-tooltip>
                </router-link>
                <span class="icon-bread-crumb">
                    <el-icon class="!text-[15px]"><ArrowRightBold /></el-icon>
                </span>
            </div>

            <div class="item-bread-crumb" v-else-if="index === breadcrumbComputed.length - 1">
                <span class="!text-[18px] text-breadcrumb text-current">{{ data.name }}</span>
            </div>

            <div class="item-bread-crumb" v-else>
                <router-link :to="data.path" class="text-breadcrumb">
                    {{ data.name }}
                </router-link>
                <span class="icon-bread-crumb">
                    <el-icon class="!text-[15px]"><ArrowRightBold /></el-icon>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
    name: "BreadcrumbComponent",
    setup() {
        const store = useStore();

        const breadcrumbComputed = computed(() => store.state.homeModule.breadcrumb);

        return {
            breadcrumbComputed
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/components/breadcrumb/index";
</style>