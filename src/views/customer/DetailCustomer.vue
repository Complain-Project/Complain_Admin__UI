<template>
    <section class="detail-customer">
        <section class="action">
            <el-row class="action-wrap">
                <el-col :span="24" class="action-wrap--col">
                    <Breadcrumb/>
                </el-col>
            </el-row>
        </section>
        <div class="detail-customer__wrapper">
            <el-card>
                <el-row :gutter="40">
                    <el-col :span="5" class="border-r border-solid h-[calc(81vh)]">
                        <div class="customer__contact">
                            <div class="font-bold text-base">
                                <div class="flex items-center mb-2">
                                    <div class="w-[31px] h-[31px] flex items-center justify-center rounded-full"
                                         :style="{backgroundColor: randomBackground()}"
                                         v-if="customer.name">
                                        <span class="font-bold text-xl text-white">{{customer.name.charAt(0)}}</span>
                                    </div>
                                    <el-avatar v-else :size="31" :src="avatarDefault" />
                                    <div v-if="customer.name" class="font-bold text-base ml-4">
                                        {{ customer.name }}
                                    </div>
                                    <i v-else class="text-muted ml-4">Đang cập nhật</i>
                                </div>
                            </div>

                            <hr class="mt-2 mb-6">

                            <div class="customer__contact__item flex items-center mb-3">
                                <inline-svg class="w-3 h-3" :src="icon.phone"/>
                                <div class="content ml-2">
                                    <span class="mr-2 font-bold">Số điện thoại :</span>
                                    <span v-if="customer.phone">{{customer.phone}}</span>
                                    <span class="text-muted" v-else>Đang cập nhật</span>
                                </div>
                            </div>
                            <div class="customer__contact__item flex items-center mb-3">
                                <inline-svg class="w-3 h-3" :src="icon.shield"/>
                                <div class="content ml-2">
                                    <span class="mr-2 font-bold">Xác thực :</span>
                                    <el-tag class="ml-2" :type="customer.phone_verified_at ? 'success' : 'info'">
                                        {{customer.phone_verified_at ? 'Đã xác thực' : 'Chưa xác thực'}}
                                    </el-tag>
                                </div>
                            </div>
                            <div class="customer__contact__item flex items-center mb-3">
                                <inline-svg class="w-3 h-3" :src="icon.points"/>
                                <div class="content ml-2">
                                    <span class="mr-2 font-bold">Điểm :</span>
                                    <span>{{customer.points}}</span>
                                </div>
                            </div>
                            <div class="customer__contact__item flex items-center mb-3">
                                <inline-svg class="w-3 h-3" :src="icon.referralCode"/>
                                <div class="content ml-2">
                                    <span class="mr-2 font-bold">Mã giới thiệu :</span>
                                    <span v-if="customer.ref" class="cursor-pointer">
                                        {{customer.ref}}
                                        <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            :content="isCopy"
                                            placement="top"
                                        >
                                            <el-icon class="ml-1" @click="copyRef()"><CopyDocument /></el-icon>
                                        </el-tooltip>
                                    </span>
                                    <i v-else class="text-muted">Chưa có</i>
                                </div>
                            </div>
                            <div class="customer__contact__item flex items-center mb-3">
                                <inline-svg class="w-3 h-3" :src="icon.status"/>
                                <div class="content ml-2">
                                    <span class="mr-2 font-bold">Trạng thái :</span>
                                    <span>{{customer.is_active ? "Kích hoạt" : "Khóa"}}</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <el-tabs v-model="activeTab" class="tabs">
                            <el-tab-pane v-if="hasPermission('list-laso')" label="Lá số tử vi" name="laSoTuVis">
                                <el-table
                                    v-if="laSoTuVis.length > 0"
                                    height="calc(70vh - 2px)"
                                    v-loading="loading"
                                    :data="laSoTuVis"
                                    style="width: 100%">
                                    <el-table-column
                                        label="Họ tên">
                                        <template #default="tuvi">
                                                <span v-if="tuvi.row.ho_ten" class="item-name font-bold text-[#417AB0FF]">
                                                    {{ tuvi.row.ho_ten }}
                                                </span>
                                            <i v-else class="text-muted">Đang cập nhật</i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="Giới tính">
                                        <template #default="tuvi">
                                                <span class="item-name">
                                                    {{ tuvi.row.gioi_tinh ? "Nam" : "Nữ" }}
                                                </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="Ngày sinh">
                                        <template #default="tuvi">
                                            <div v-if="fullBirthday(tuvi.row, true)">
                                                {{fullBirthday(tuvi.row, true)}} (DL)
                                            </div>
                                            <div v-if="fullBirthday(tuvi.row, false)">
                                                {{fullBirthday(tuvi.row, false)}} (AL)
                                            </div>
                                            <i class="text-muted" v-if="!fullBirthday(tuvi.row, true) && !fullBirthday(tuvi.row, false)">
                                                Đang cập nhật
                                            </i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        v-if="hasPermission('detail-laso')"
                                        align="center"
                                        prop="action"
                                        label="Hành động"
                                    >
                                        <template #default="tuvi">
                                            <div class="action">
                                                <el-tooltip v-if="hasPermission('detail-laso')" class="item" effect="dark" content="Xem lá số" placement="top">
                                                    <a  @click="detailLaSo(tuvi.row._id)"
                                                        class="btn btnRecharge el-button el-button--primary">
                                                        <el-icon><View /></el-icon>
                                                    </a>
                                                </el-tooltip>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="pagination-wrap" v-if="laSoTuVis.length > 0">
                                    <div class="pagination-wrap--view">
                                        <el-select v-model="viewSelected" placeholder="Select" @change="getListLaSo({page : 1})">
                                            <el-option
                                                v-for="item in views"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="pagination-wrap--page" v-if="page">
                                        <div class="mr-3">Tổng: {{ page.total }}</div>
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
                                <el-empty class="h-[calc(75vh_+_2px)]" v-else description="Không có dữ liệu" />
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </section>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import { onMounted, reactive, ref } from "vue";
import { Getters, Mutations } from "@/store/enums/_type_enum";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import api from "@/utils/services/_api_service";
import { useRoute, useRouter } from "vue-router";
import _ from "lodash";

export default {
    name: "DetailCustomer",
    components: {
        Breadcrumb
    },
    setup(){
        const store = useStore()
        const route = useRoute();
        const router = useRouter();

        const avatarDefault = reactive('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
        const listBackground = reactive([
            "#000000",
            "#fc9b00",
            "#f24d34",
            "#00d0bf",
            "#8cbe5c",
            "#cb8f62"
        ])
        const isCopy = ref("Copy")
        const customer = reactive({
            _id: "",
            name: "",
            points: 0,
            ref: "",
            is_active: true,
            laSoTuVis: [
                {
                    _id: "9999",
                    gioi_tinh : 1,
                    user_id : "643678f2c372b12dd819c0a1",
                    ho_ten : "Nguyen Van Anh",
                    gio_sinh_al : "tys",
                    ngay_sinh_al : 4,
                    thang_sinh_al : 1,
                    nam_sinh_al : 1990,
                    am_duong : "Dương Nam",
                    ban_menh : "Lộ Bàng Thổ",
                    ban_menh_cuc : "Thổ Ngũ Cục",
                }
            ]
        })
        const activeTab = ref('laSoTuVis')
        const loading = ref(false)
        let page = reactive({
            currentPage: 1,
            pageSize: 10,
            total: 0,
        });
        let viewSelected = ref(20);
        let laSoTuVis = ref([]);
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
        const icon = reactive({
            shield: require("@/assets/images/icons/shield.svg"),
            status: require("@/assets/images/icons/sliders-simple.svg"),
            points: require("@/assets/images/icons/bullseye-pointer.svg"),
            referralCode: require("@/assets/images/icons/share-from-square.svg"),
            phone: require("@/assets/images/icons/phone.svg"),
        })

        /* Lifecycle hooks::start */
        onMounted(() => {
            store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 4)
            store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
                {
                    path: '/',
                    name: 'Trang Chủ',
                },
                {
                    path: '/customers',
                    name: 'Danh sách khách hàng',
                },
                {
                    path: window.location.pathname,
                    name: 'Chi tiết khách hàng',
                    icon: 'el-icon-shopping-cart-2'
                }
            ])
            detailCustomer()
        })
        /* Lifecycle hooks::end */
        const handleChangeCurrentPage = (page) => {
            getListLaSo({page : page})
        }
        const randomBackground = () => {
            let colors = localStorage.getItem("color-customer");
            let color = listBackground[Math.floor(Math.random() * listBackground.length)]
            let customerView = {
                _id: customer._id,
                color: color
            }
            if (colors){
                let list = JSON.parse(colors)
                let index = _.findIndex(list, (o) => {
                    return customer._id === o._id
                })
                if(index !== -1){
                    color = list[index]['color']
                }else {
                    list.push(customerView)
                    localStorage.setItem("color-customer", JSON.stringify(list))
                }
            } else {
                localStorage.setItem("color-customer", JSON.stringify([customerView]))
            }
            return color;
        }

        const detailCustomer = () => {
            api.getDetailCustomer(route.params.id).then((res) => {
                customer._id = _.get(res, "data.data._id")
                customer.name = _.get(res, "data.data.name")
                customer.phone = _.get(res, "data.data.phone")
                customer.is_active = _.get(res, "data.data.is_active")
                customer.points = _.get(res, "data.data.points")
                customer.phone_verified_at = _.get(res, "data.data.phone_verified_at")
                customer.ref = _.get(res, "data.data.ref")
                randomBackground()
                if(hasPermission('list-laso')){
                    getListLaSo()
                }
            })
        }

        const getListLaSo = ( params = {}) => {
            params.per_page = viewSelected.value
            api.getListLaSo(params, customer._id).then((res) => {
                page.currentPage = _.get(res, 'data.data.currentPage');
                page.pageSize = parseInt(_.get(res, 'data.data.perPage'));
                page.total = _.get(res, 'data.data.total', 0);
                laSoTuVis.value = _.get(res, 'data.data.data')
                loading.value = false
            })
        }

        const copyRef = async () => {
            try {
                isCopy.value = "Copied"
                await navigator.clipboard.writeText(customer.ref);
                setTimeout(() => {
                    isCopy.value = "Copy"
                }, 1500)
            } catch ($e) {
                ElMessage.error("Không thể copy")
            }
        }
        const fullBirthday = (data, type) => {
            let birthday = "";
            if(type){
                if(data.ngay_sinh_dl && data.thang_sinh_dl && data.nam_sinh_dl){
                    birthday += data.ngay_sinh_dl + '/' + data.thang_sinh_dl + '/' + data.nam_sinh_dl
                }
            }else{
                if(data.ngay_sinh_al && data.thang_sinh_al && data.nam_sinh_al){
                    birthday += data.ngay_sinh_al + '/' + data.thang_sinh_al + '/' + data.nam_sinh_al
                }
            }
            return birthday ? birthday : false
        }

        const detailLaSo = (id) => {
            const routeData  =  router.resolve({ name: 'LaSoTuVi', params: {idUser: customer._id, idLaSo: id}})
            window.open(routeData.href, '_blank')
        }

        const hasPermission = (per) => {
            return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per)
        }

        return{
            icon,
            customer,
            avatarDefault,
            activeTab,
            loading,
            page,
            viewSelected,
            views,
            isCopy,
            laSoTuVis,
            copyRef,
            randomBackground,
            handleChangeCurrentPage,
            fullBirthday,
            detailLaSo,
            getListLaSo,
            hasPermission
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/customer/detail.scss";
</style>