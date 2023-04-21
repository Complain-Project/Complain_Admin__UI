<template>
	<div id="main__layout__container">
		<el-container>
			<el-aside>
				<Sidebar/>
			</el-aside>

			<el-main class="!p-0 h-[100vh] bg-[#f2f3f8]">
                <el-header class="!p-0">
                    <Heading></Heading>
                </el-header>
				<router-view class="max-h-[calc(100vh_-_62px)] p-[20px] overflow-x-hidden overflow-y-auto"/>
			</el-main>
            <Profile/>
		</el-container>
	</div>
</template>

<script>
import Sidebar from "@/layouts/main-layout/sidebar/Sidebar.vue";
import Profile from "@/layouts/main-layout/profile/Profile.vue";
import Heading from "@/layouts/main-layout/heading/Heading.vue";

export default {
	name: "MainLayout",
	components: {
        Heading,
		Sidebar,
        Profile
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/layouts/main-layout/main_layout";
</style>