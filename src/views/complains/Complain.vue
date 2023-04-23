<template>
    <div id="complain">
        <section class="action">
            <el-row class="action-wrap">
                <el-col :span="24" class="action-wrap--col">
                    <Breadcrumb/>
                </el-col>
            </el-row>
        </section>
        <div class="complain-main">
            <el-card class="list-complain">
                <div class="search-wrap">
                    <el-row :gutter="20">
                        <el-col class="input" :span="16">
                            <el-input
                                    class="input-search"
                                    :prefix-icon="Search"
                                    v-model="searchKey"
                                    @clear="handleClear"
                                    @keydown.enter="handleSearch(1)"
                                    clearable
                                    placeholder="Nhập vào mã phiếu, tiêu đề hoặc tên người khiếu nại để tìm kiếm"
                            >
                            </el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="district"
                                       @change="handleSearch(1)"
                                       filterable
                                       clearable
                                       placeholder="Chọn huyện">
                                <el-option
                                        v-for="item in districts"
                                        :key="item._id"
                                        :label="item.name"
                                        :value="item._id"
                                />
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="status"
                                       @change="handleSearch(1)"
                                       clearable
                                       placeholder="Chọn Trạng thái">
                                <el-option
                                        v-for="item in listStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                />
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <el-table
                        height="calc(68vh - 5px)"
                        v-loading="loading"
                        :data="complains"
                        style="width: 100%">
                    <el-table-column
                            prop="code"
                            width="130px"
                            label="Mã khiếu nại"
                            fixed>
                        <template #default="complain">
                            <div class="flex items-center">
                                <p class="complain-name">{{ complain.row.code }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="150px"
                            label="Người khiếu nại">
                        <template #default="complain">
                            <div class="flex items-center">
                                <p class="complain-name">{{ complain.row.user.name }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="650px"
                            label="Tiêu đề">
                        <template #default="complain">
                            <p>{{ complain.row.title }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Huyện khiếu nại">
                        <template #default="complain">
                            <p>{{ complain.row.district.name }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Trạng thái">
                        <template #default="complain">
                            <el-tooltip v-if="complain.row.status === complainStatus['PROCESSED']"
                                        class="item" effect="dark" :content="'Phản hồi bởi '+ complain.row.respondent?.name"
                                        placement="top">
                                <el-tag class="cursor-context-menu" type="success">Đã xử lý</el-tag>
                            </el-tooltip>
                            <el-tag v-else class="cursor-context-menu" type="info">Chưa xử lý</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="220px"
                            align="center"
                            prop="action"
                            label="Hành động"
                    >
                        <template #default="complain">
                            <div class="action">
                                <el-tooltip class="item" effect="dark" content="Xem chi tiết" placement="top">
                                    <a  @click="detailComplain(complain.row._id)"
                                        class="btn btnRecharge el-button el-button--primary">
                                        <el-icon><View /></el-icon>
                                    </a>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-wrap" v-if="complains.length > 0">
                    <div class="pagination-wrap--view">
                        <el-select v-model="viewSelected" placeholder="Select" @change="handleSearch(1)">
                            <el-option
                                    v-for="item in views"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="pagination-wrap--page" v-if="page">
                        <div class="mr-4">Tổng: {{ page.total }}</div>
                        <el-pagination
                                layout="prev, pager, next"
                                :total="page.total"
                                :page-size="page.pageSize"
                                :current-page="page.currentPage"
                                @current-change="handleChangeCurrentPage()"
                        >
                        </el-pagination>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import {onMounted, reactive, ref} from "vue";
import {Mutations} from "@/store/enums/_type_enum";
import {useStore} from "vuex";
import { Search } from '@element-plus/icons-vue'
import {COMPLAIN_STATUS, COMPLAIN_STATUS_DATA} from "@/utils/constants/_constant";
import _ from "lodash";
import {ElMessage} from "element-plus";
import api from "@/utils/services/_api_service";
import router from "@/router";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Complain",
    components: {Breadcrumb},
    setup() {
        const store = useStore()

        const complainStatus = ref([])
        const complains = ref([])
        let viewSelected = ref(20);
        const district = ref("")
        const status = ref("")
        const districts = ref([])
        const listStatus = ref([])
        let views = reactive([
            {
                value: 20,
                label: 'Hiển thị 20'
            },
            {
                value: 50,
                label: 'Hiển thị 50'
            },
            {
                value: 100,
                label: 'Hiển thị 100'
            },
        ]);
        let searchKey = ref("");
        let loading = ref(false);
        let page = reactive({
            currentPage: 1,
            pageSize: 10,
            total: 0,
        });

        onMounted(() => {
            complainStatus.value = COMPLAIN_STATUS
            listStatus.value = COMPLAIN_STATUS_DATA
            store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 5)
            store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
                {
                    path: '/',
                    name: 'Trang Chủ',
                },
                {
                    path: window.location.pathname,
                    name: 'Danh sách khiếu nại',
                }
            ])
            getListComplains()
            getDistrictsComplain()
        })

        const getListComplains = (params= {}) => {
            loading.value = true
            params.per_page = viewSelected.value
            api.getListComplains(params).then((res) => {
                page.currentPage = _.get(res, 'data.data.current_page');
                page.pageSize = parseInt(_.get(res, 'data.data.per_page'));
                page.total = _.get(res, 'data.data.total', 0);
                complains.value = _.get(res, 'data.data.data')
                loading.value = false
            }).catch(() => {
                ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
            })
        }

        const getDistrictsComplain = () => {
            api.getDistrictsComplain().then((res) => {
                districts.value = _.get(res, 'data.data')
            }).catch(() => {
                ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
            })
        }

        const handleSearch = (data = null) => {
            let payload = {}
            if(typeof status.value === "number"){
                payload.status = status.value
            }

            if (searchKey.value.length > 0) {
                payload.q = searchKey.value;
            }
            if (data) {
                payload.page = data
            } else {
                payload.page = page.currentPage
            }
            if(district.value){
                payload.district = district.value
            }

            getListComplains(payload)
        }

        const handleClear = () => {
            searchKey.value = "";
            handleSearch(1);
        }

        const handleChangeCurrentPage = (page) => {
            handleSearch(page)
        }

        const detailComplain = (id) => {
            return router.push({name: "DetailComplain", params: {id: id}})
        }

        return{
            district,
            districts,
            status,
            listStatus,
            page,
            Search,
            complains,
            viewSelected,
            views,
            searchKey,
            loading,
            complainStatus,
            handleClear,
            handleSearch,
            detailComplain,
            handleChangeCurrentPage
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/complain/index";
</style>