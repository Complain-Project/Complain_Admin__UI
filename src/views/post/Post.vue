<template>
    <div id="post">
        <section class="action">
            <el-row class="action-wrap">
                <el-col :span="12" class="action-wrap--col">
                    <Breadcrumb/>
                </el-col>
                <el-col :span="12" class="action-wrap--col action-btn">
                    <div v-if="hasPermission('POST-C')" class="action-wrap--col__btn">
                        <el-button class="btn-apply" @click="redirectPost('CreatePost')">
                            <el-icon class="mr-[5px]">
                                <CirclePlus/>
                            </el-icon>
                            Tạo mới bài viết
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </section>
        <div class="post-main">
            <el-card class="list-post">
                <div class="search-wrap">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-date-picker
                                    size="large"
                                    class="inputWrap mt-[5px] !w-full"
                                    v-model="date"
                                    type="daterange"
                                    range-separator=" - "
                                    start-placeholder="Bắt đầu"
                                    format="DD/MM/YYYY"
                                    clearable
                                    end-placeholder="Kết thúc">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="18" class="input">
                            <el-input
                                    class="input-search mb-5 mt-[5px] h-10"
                                    :prefix-icon="Search"
                                    v-model="search"
                                    @clear="handleClear"
                                    @keydown.enter="handleSearch(1)"
                                    clearable
                                    placeholder="Nhập vào tiêu đề bài viết để tìm kiếm"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="table-post">
                    <TablePost
                            :loading="loading"
                            :posts="posts"
                            :page="page"
                            @handleRefreshData="handleReset"
                    ></TablePost>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import {onMounted, reactive, ref, watch} from "vue";
import { Getters, Mutations } from "@/store/enums/_type_enum";
import {useStore} from "vuex";
import {Search} from '@element-plus/icons-vue'
import TablePost from "@/components/post/TablePost.vue";
import {useRouter} from "vue-router";
import {POST_STATUS} from "@/utils/constants/_constant";
import api from "@/utils/services/_api_service";
import _ from "lodash";
import {ElMessage} from "element-plus";
import moment from "moment";

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Post",
	components: {
		TablePost,
		Breadcrumb
	},
	setup: function () {
		const store = useStore();
		const router = useRouter();

		const tabs = ref([
			{
				label: "Tất cả",
				name: "all",
				key: "",
				value: "",
			},
			{
				label: "Chưa duyệt",
				name: "post_pending",
				key: "post_pending",
				value: POST_STATUS['PENDING'],
			},
			{
				label: "Đã duyệt",
				name: "post_accept",
				key: "post_accept",
				value: POST_STATUS['ACCEPT'],
			}
		])

		let search = ref("");
		let date = ref("");
		let activeTable = ref("all");
		let loading = ref(false);
		let posts = ref([])
		let page = reactive({
			currentPage: 1,
			pageSize: 20,
			total: 0,
		});

		onMounted(() => {
			store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 6)
			store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
				{
					path: '/',
					name: 'Trang Chủ',
				},
				{
					path: window.location.pathname,
					name: 'Bài viết',
				}
			])

            getListPosts()
		})

        watch(date, () => {
            handleSearch(1)
        })

		const handleSearch = (data = null) => {
			let payload = {}
			if (search.value.length > 0) {
				payload.q = search.value;
			}
			if (data) {
				payload.page = data
			} else {
				payload.page = page.currentPage
			}
            if (date.value) {
                payload.start = moment(date.value[0]).format('X')
                payload.end = moment(date.value[1]).format('X')
            }

            let tab = _.find(tabs.value, {'name' : activeTable.value})
			payload.status = tab.value

			getListPosts(payload)
		}

		const handleClear = () => {
			search.value = "";
			handleSearch(1);
		}

		const redirectPost = (name, param) => {
			router.push({name: name, params: param})
		}

		const handleChangeTab = () => {
            handleSearch(1)
		}

		const getListPosts = (params = {}) => {
            loading.value = true
			api.getPosts(params).then((res) => {
				page.currentPage = _.get(res, 'data.data.current_page');
				page.pageSize = parseInt(_.get(res, 'data.data.per_page'));
				page.total = _.get(res, 'data.data.total', 0);
				posts.value = _.get(res, 'data.data.data')

				loading.value = false
			}).catch(() => {
				ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
				loading.value = false
			})
		}
		const handleReset = (data) => {
			getListPosts(data)
		}
        const hasPermission = (per) => {
            return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per)
        }

		return {
			page,
			posts,
			tabs,
			search,
			Search,
			loading,
			activeTable,
            date,
			handleSearch,
			handleClear,
			redirectPost,
			handleChangeTab,
			handleReset,
            hasPermission,
		}
	}
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/post/index.scss";
</style>