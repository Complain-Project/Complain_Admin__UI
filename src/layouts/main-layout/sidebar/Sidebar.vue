<template>
	<section
		class="bg-gray-900 h-screen w-[64px] transition-all duration-300 ease-in"
		:class="{'!w-[240px]': collapseSidebarComputed}"
	>
		<!-- Top::start -->
		<section
			class="flex items-center px-2.5 py-4 transition-all duration-300 ease-in"
			:class="{'!px-5': collapseSidebarComputed}"
		>
			<div class="w-full">
				<!-- Logo::start -->
				<router-link
					to="/"
					class="opacity-100 float-left flex items-center h-[30px] transition-all duration-300 ease-in w-full flex justify-center"
				>

                    <img v-if="collapseSidebarComputed"
                         class="opacity-0 h-0 transition-all duration-300 ease-in"
                         :class="{'!opacity-100 !h-9': collapseSidebarComputed}"
                         :src="defaultLogo"
                         alt="Logo"
                    />
                    <img v-else class="opacity-100 h-9 transition-all duration-300 ease-in"
                         :class="{'!opacity-0 !h-0': collapseSidebarComputed}"
                         :src="defaultLogoCollapse"
                         alt="logo">
				</router-link>
				<!-- Logo::end -->
			</div>
		</section>
		<!-- Top::end -->
		
		<!-- Hr::start -->
		<section class="transition-all duration-300 ease-in">
			<hr class="border-gray-700">
		</section>
		<!-- Hr::end -->
		
		<!-- Main menu::start -->
		<section
			id="menu-wrap"
			class="px-2.5 h-[calc(100vh_-_143px)] pt-4 mb-4 overflow-y-auto transition-all duration-300 ease-in"
			:class="{'!px-5 !h-[calc(100vh_-_159px)]': collapseSidebarComputed}"
		>
			<ul>
				<li v-for="(menu, index) in menusComputed" :key="index">
					<!-- Heading::start -->
					<div
						v-if="menu.hasOwnProperty('heading') && collapseSidebarComputed && hasPermissionHeading(menu.pages)"
						class="pl-3 pt-5 pb-1.5 uppercase text-gray-500 font-semibold w-max"
					>
						{{ menu.heading }}
					</div>
					<!-- Heading::end -->
					
					<!-- Page::start -->
					<div v-for="(page, key) in menu.pages" :key="key">
						<!-- Sub page::start -->
						<div v-if="page.hasOwnProperty('sectionTitle')">
							<div v-if="page.permission.length > 0 ? hasPermission(page.permission) : true"
                                class="menu-item flex items-center justify-between"
								:class="{'!text-white': handleActiveParentMenu(page.subs)}"
								@click="handleCollapseMenuItem(page)"
							>
								<div class="flex items-center relative">
									<el-tooltip
										v-if="!collapseSidebarComputed"
										popper-class="sub-page !left-1 !p-2.5 !bg-gray-900"
										effect="dark"
										placement="left-start"
									>
										<div class="px-3 py-3">
											<inline-svg :src="page.svgIcon" class="w-5 h-5"/>
										</div>
										
										<template #content>
											<ul class="flex flex-col w-48">
												<li v-for="(subPage, subKey) in page.subs" :key="subKey">
													<router-link
                                                        v-if="subPage.permission.length > 0 ? hasPermission(subPage.permission) : true"
														:to="`/${subPage.route}`"
														class="menu-item inline-block w-full py-3 relative"
														:class="{'menu-active': activeMenuComputed === subPage.index}"
													>
														<div class="w-max absolute left-[12px] text-sm">
															{{ subPage.title }}
														</div>
													</router-link>
												</li>
											</ul>
										</template>
									</el-tooltip>
									
									<div v-else class="px-3 py-3">
										<inline-svg :src="page.svgIcon" class="w-5 h-5"/>
									</div>
									
									<div v-if="collapseSidebarComputed" class="w-max absolute left-[44px]">
										{{ page.sectionTitle }}
									</div>
								</div>
								
								<div v-if="collapseSidebarComputed" class="pr-3 py-3">
									<inline-svg
										class="transition-all duration-700 h-3.5"
										:class="{'duration-450 rotate-90': page.open}"
										:src="subIcon"
									/>
								</div>
							</div>
							
							<div
								v-if="collapseSidebarComputed"
								class="pl-[21px] max-h-0 overflow-hidden transition-all duration-450 ease-in"
								:class="{'max-h-[1000px] !duration-700': page.open}"
							>
								<ul class="flex flex-col pl-5 border-l border-gray-700">
									<li v-for="(subPage, subKey) in page.subs" :key="subKey">
										<router-link
                                            v-if="subPage.permission.length > 0 ? hasPermission(subPage.permission) : true"
											:to="`/${subPage.route}`"
											class="menu-item inline-block w-full py-3 relative"
											:class="{'menu-active': activeMenuComputed === subPage.index}"
										>
											<div class="w-max absolute left-[12px]">
												{{ subPage.title }}
											</div>
										</router-link>
									</li>
								</ul>
							</div>
						</div>
						<!-- Sub page::end -->
						
						<!-- Main page::start -->
                        <div v-else>
                            <router-link
                                v-if="page.permission.length > 0 ? hasPermission(page.permission) : true"
                                :to="`/${page.route}`"
                                class="menu-item flex items-center relative"
                                :class="{
								'menu-active': activeMenuComputed === page.index,
								'mb-3': activeMenuComputed,
							}"
                            >
                                <el-tooltip
                                    v-if="!collapseSidebarComputed"
                                    popper-class="sub-page !left-1 !p-2.5 !bg-gray-900"
                                    effect="dark"
                                    placement="left-start"
                                >
                                    <div class="px-3 py-3">
                                        <inline-svg :src="page.svgIcon" class="w-5 h-5"/>
                                    </div>

                                    <template #content>
                                        <div class="text-sm">
                                            {{ page.title }}
                                        </div>
                                    </template>
                                </el-tooltip>

                                <div v-else class="px-3 py-3">
                                    <inline-svg :src="page.svgIcon" class="w-5 h-5"/>
                                </div>

                                <div v-if="collapseSidebarComputed" class="w-max absolute left-[44px]">
                                    {{ page.title }}
                                </div>
                            </router-link>
                        </div>

						<!-- Main page::end -->
					</div>
					<!-- Page::end -->
				</li>
			</ul>
		</section>
		<!-- Main menu::end -->
	</section>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {MENUS} from "@/utils/configs/_menu_config";
import {useStore} from "vuex";
import { Getters, Mutations } from "@/store/enums/_type_enum";

export default {
	name: "TheSidebar",
	setup() {
		const store = useStore();

		/* Variables::start */
		const menus = ref(MENUS);
		
		const defaultLogo = ref(require("@/assets/images/logos/logo.png"));
		const defaultLogoCollapse = ref(require("@/assets/images/logos/logoCollapse.png"));
		const subIcon = ref(require("@/assets/images/icons/angle-right.svg"));
		const collapseIcon = ref(require("@/assets/images/icons/chevrons-left.svg"));
		/* Variables::end */
		
		/* Computed::start */
		const activeMenuComputed = computed(() => store.state.layoutModule.activeMenu);

		const collapseSidebarComputed = computed(() => store.state.layoutModule.collapseSidebar);
		
		const menusComputed = computed(() => {
			menus.value.map((menu) => {
				menu.pages.map((page) => {
					if ("sectionTitle" in page) {
						page.open = page.subs.some(subPage => subPage.index === activeMenuComputed.value);
					}
				})
			})
			
			return menus.value;
		});
		/* Computed::end */
		
		/* Lifecycle hooks::start */
		onMounted(() => {
		
		});
		/* Lifecycle hooks::end */
		
		/* Function::start */
		const handleActiveParentMenu = (subPages) => {
			return subPages.some(page => page.index === activeMenuComputed.value);
		};
		
		const handleCollapseMenuItem = (page) => {
			page.open = !page.open;
		};
		
		const handleCollapseSidebar = () => {
			store.commit(`layoutModule/${Mutations.SET_COLLAPSE_SIDEBAR}`, !collapseSidebarComputed.value)
		};

        const hasPermission = (per) => {
            return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per)
        }

        const hasPermissionHeading = (page) => {
            return page.some((item) => {
                return hasPermission(item.permission)
            })
        }
		/* Function::end */
		
		
		return {
			menus,
			menusComputed,
			activeMenuComputed,
			collapseSidebarComputed,
			defaultLogo,
            defaultLogoCollapse,
			subIcon,
			collapseIcon,
			handleActiveParentMenu,
			handleCollapseMenuItem,
			handleCollapseSidebar,
            hasPermission,
            hasPermissionHeading
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/layouts/main-layout/sidebar/_sidebar.scss";
</style>