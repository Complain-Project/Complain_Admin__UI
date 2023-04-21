<template>
    <div id="customer">
        <section class="action">
            <el-row class="action-wrap">
                <el-col :span="12" class="action-wrap--col">
                    <Breadcrumb/>
                </el-col>
                <el-col :span="12" class="action-wrap--col action-btn">
                    <div class="action-wrap--col__btn" v-if="hasPermission('add-user')">
                        <el-button @click="openModalCustomer()"
                                   class="btn-apply">
                            <el-icon class="mr-[5px]"><CirclePlus /></el-icon>
                            Tạo mới khách hàng
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </section>
        <div class="customer-main">
            <el-card class="list-customer">
                <div class="search-wrap">
                    <el-row>
                        <el-col class="input">
                            <el-input
                                class="input-search"
                                :prefix-icon="Search"
                                clearable
                                placeholder="Nhập vào tên hoặc số điện thoại để tìm kiếm"
                                v-model="searchKey"
                                @clear="handleClear"
                                @keydown.enter="handleSearch(1)"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <el-table
                    height="calc(68vh - 5px)"
                    v-loading="loading"
                    :data="customers"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="Họ tên"
                        fixed>
                        <template #default="customer">
                            <span @click="hasPermission('detail-user') ? redirectCustomer(customer.row._id) : ''"
                                  :class="hasPermission('detail-user') ? 'detail' : ''"
                                  class="customer-name">
                                    {{ customer.row.name }}
                                </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="Số điện thoại">
                        <template #default="customer">
                            <a :href="`tel: ${customer.row.phone}`" v-if="customer.row.phone" class="decoration-none">
                                <span class="admin_link">{{ customer.row.phone }}</span>
                            </a>
                            <span class="admin_link_none_cta" v-else>
                              <i class="text-muted">Đang cập nhật</i>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="phone_verified_at"
                        label="Xác thực">
                        <template #default="customer">
                            <el-tag class="ml-2" :type="customer.row.phone_verified_at ? 'success' : 'info'">
                                {{customer.row.phone_verified_at ? 'Đã xác thực' : 'Chưa xác thực'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="points"
                        align="center"
                        label="Điểm">
                        <template #default="customer">
                            <span class="customer_link_none_cta">
                              {{customer.row.points}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="ref"
                        label="Mã giới thiệu">
                        <template #default="customer">
                            <span v-if="customer.row.ref" class="cursor-pointer">
                                {{customer.row.ref}}
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    :content="isCopy"
                                    placement="top"
                                >
                                    <el-icon class="ml-1" @click="copyRef(customer.row.ref)"><CopyDocument /></el-icon>
                                </el-tooltip>
                            </span>
                            <i v-else class="text-muted">Chưa có</i>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="180px"
                        label="Trạng thái"
                        align="center"
                        v-if="hasPermission('edit-user')"
                    >
                        <template #default="customer">
                            <el-switch
                                @change="changeStatus(customer.row.is_active, customer.row._id)"
                                v-model="customer.row.is_active"
                                :inactive-value="false"
                                :active-value="true"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="220px"
                        align="center"
                        prop="action"
                        label="Hành động"
                        v-if="hasPermission('edit-user') || hasPermission('delete-user')"
                    >
                        <template #default="customer">
                            <div class="action">
                                <el-tooltip class="item" effect="dark" content="Chỉnh sửa" placement="top">
                                    <a  v-if="hasPermission('edit-user')"
                                        class="btn btnRecharge el-button el-button--primary"
                                        @click="openModalCustomer(customer.row)">
                                        <el-icon><EditPen /></el-icon>
                                    </a>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Đổi mật khẩu" placement="top">
                                    <a  v-if="hasPermission('edit-user')"
                                        class="btn btnRecharge el-button el-button--success"
                                        @click="modalResetPassword(customer.row._id)">
                                        <el-icon><Refresh /></el-icon>
                                    </a>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Xóa" placement="top">
                                    <a  v-if="hasPermission('delete-user')"
                                        class="btn btnRecharge el-button el-button--danger"
                                        @click="handleDeleteCustomer(customer.row._id)">
                                        <el-icon><Delete /></el-icon>
                                    </a>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-wrap" v-if="customers.length > 0">
                    <div class="pagination-wrap--view">
                        <el-select v-model="viewSelected" placeholder="Select">
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
        <el-dialog
            width="35%"
            :title="modalTitle"
            v-model="modalCustomer"
            class="modal-customer"
            :close-on-click-modal="false"
        >
            <div class="modal-customer__content">
                <div class="input-warp w-full">
                    <label>Họ tên
                        <span class="required">*</span>
                    </label>
                    <el-input v-model="customer.name"></el-input>
                    <div v-if="errors.name !== '' " class="error">
                        <span> {{ errors.name }} </span>
                    </div>
                </div>
                <div class="input-warp w-full">
                    <label>Số điện thoại
                        <span class="required">*</span>
                    </label>
                    <el-input v-model="customer.phone"></el-input>
                    <div v-if="errors.phone !== '' " class="error">
                        <span> {{ errors.phone }} </span>
                    </div>
                </div>
                <div v-if="!isUpdate" class="input-warp w-full">
                    <label>Mật khẩu <span class="required">*</span></label>
                    <el-input type="password" v-model="customer.password"></el-input>
                    <div v-if="errors.password !== '' " class="error">
                        <span> {{ errors.password }} </span>
                    </div>
                </div>
                <div class="input-warp mb-0">
                    <label class="mb-1 d-block">Trạng thái: <span class="font-weight-bold">{{
                            customer.is_active ? "Kích hoạt" : "Khóa"
                        }}</span>
                    </label>
                    <el-switch
                        v-model="customer.is_active"
                        :active-value="true"
                        :inactive-value="false"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </div>
            </div>
            <template #footer>
                <el-button class="btn-close" @click="closeModal">Hủy</el-button>
                <el-button class="btn-apply" @click="isUpdate ? handleUpdateCustomer() : handleCreateCustomer()">
                    Lưu
                </el-button>
            </template>
        </el-dialog>
        <el-dialog
            width="25%"
            v-loading="loading"
            :title="'Đổi mật khẩu khách hàng '"
            v-model="modalPassword"
            class="modal-customer"
            :close-on-click-modal="false"
        >
            <el-row>
                <div class="input-warp w-full">
                    <label>Mật khẩu mới <span class="required">*</span></label>
                    <el-input type="password" v-model="customer.password"></el-input>
                    <div v-if="errors.password !== '' " class="error">
                        <span> {{ errors.password }} </span>
                    </div>
                </div>
                <div class="input-warp w-full">
                    <label>Xác nhận mật khẩu mới <span class="required">*</span></label>
                    <el-input type="password" v-model="customer.passwordConfirm"></el-input>
                    <div v-if="errors.passwordConfirm !== '' " class="error">
                        <span> {{ errors.passwordConfirm }} </span>
                    </div>
                </div>
            </el-row>
            <template #footer>
                <el-button class="btn-close"
                           @click="closeModal()">Hủy</el-button>
                <el-button class="btn-apply" @click="handleResetPassword()">Lưu</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import { Getters, Mutations } from "@/store/enums/_type_enum";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/utils/services/_api_service";
import _ from "lodash";
import { Search } from '@element-plus/icons-vue'
import { isValidPhone } from "@/utils/helpers/_phone_helper";
import { useRouter } from "vue-router";

export default {
    name: "CustomerComponent",
    components: {
        Breadcrumb
    },
    setup(){
        const store = useStore();
        const router = useRouter()

        let customers = ref([]);
        let searchKey = ref("");
        let page = reactive({
            currentPage: 1,
            pageSize: 10,
            total: 0,
        });
        let viewSelected = ref(20);
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
        const errors = reactive({
            name: "",
            phone: "",
            password: "",
            passwordConfirm: ""
        })
        const customer = reactive({
            _id: "",
            name:"",
            phone: "",
            is_active: true,
            password: "",
            passwordConfirm: ""
        })
        const modalCustomer = ref(false)
        const modalPassword = ref(false)
        const isUpdate = ref(false)
        const loading = ref(false)
        const isCopy = ref("Copy")
        const modalTitle = ref("")

        /* Lifecycle hooks::start */
        onMounted(() => {
            store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 4)
            store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
                {
                    path: '/',
                    name: 'Trang Chủ',
                },
                {
                    path: window.location.pathname,
                    name: 'Danh sách khách hàng',
                }
            ])
            getListCustomers()
        })
        /* Lifecycle hooks::end */

        const getListCustomers = ( params = {} ) => {
            loading.value = true
            params.per_page = viewSelected.value
            api.getListCustomers(params).then((res) => {
                page.currentPage = _.get(res, 'data.data.currentPage');
                page.pageSize = parseInt(_.get(res, 'data.data.perPage'));
                page.total = _.get(res, 'data.data.total', 0);
                customers.value = _.get(res, 'data.data.data')
                loading.value = false
            }).catch(() => {
                ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
            })
        }

        const handleSearch = (page = null) => {
            let payload = {}
            if (searchKey.value.length > 0) {
                payload.q = searchKey.value;
            }
            if (page) {
                payload.page = page
            } else {
                payload.page = page.currentPage
            }

            getListCustomers(payload)
        }

        const handleClear = () => {
            searchKey.value = "";
            handleSearch(1);
        }

        const handleChangeCurrentPage = (page) => {
            handleSearch(page)
        }

        const openModalCustomer = (value) => {
            resetForm()
            modalCustomer.value = true
            if(!value){
                isUpdate.value = false
                modalTitle.value = "Tạo mới khách hàng"
            }else{
                isUpdate.value = true
                modalTitle.value = "Cập nhật khách hàng"
                customer._id = value._id
                customer.name = value.name
                customer.phone = value.phone
                customer.is_active = value.is_active
            }
        }

        const validateData = () => {
            let error = false
            if (customer.name.length === 0) {
                error = true;
                errors.name = 'Họ tên không được để trống';
            }
            if (customer.phone.length === 0) {
                error = true;
                errors.phone = "Số điện thoại không được để trống"
            }
            if (customer.phone.length > 0 && !isValidPhone(customer.phone)) {
                error = true;
                errors.phone = 'Số điện thoại sai định dạng';
            }
            if(!isUpdate.value){
                if (customer.password.length === 0) {
                    error = true;
                    errors.password = 'Mật khẩu không được để trống';
                }else if (customer.password.length < 6) {
                    error = true;
                    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
                }
            }
            return !error
        }

        const validatePassword = () => {
            let error = false
            if (customer.password.length === 0) {
                error = true;
                errors.password = 'Mật khẩu không được để trống';
            }else if (customer.password.length < 6) {
                error = true;
                errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            }
            if (customer.passwordConfirm.length === 0){
                errors.passwordConfirm = "Mật khẩu xác nhận không được để trống"
            }
            if (customer.password && customer.passwordConfirm && customer.password !== customer.passwordConfirm) {
                error = true;
                errors.passwordConfirm = "Xác nhận mật khẩu không chính xác"
            }
            return !error
        }

        const resetForm = () => {
            customer._id = ""
            customer.name = ""
            customer.phone = ""
            customer.is_active = ""
            customer.password = ""
            customer.passwordConfirm = ""
            errors.name = ""
            errors.phone = ""
            errors.password = ""
            errors.passwordConfirm = ""
        }

        const handleUpdateCustomer = () => {
            if(validateData()){
                let data = {
                    name: customer.name,
                    phone: customer.phone,
                    is_active: customer.is_active ? 1 : 0
                }
                api.updateCustomer(data, customer._id).then(() => {
                    ElMessage({
                        message: 'Cập nhật khách hàng thành công !',
                        type: 'success',
                    })

                    handleSearch(page.currentPage);
                    closeModal();
                }).catch((error) => {
                    let status = _.get(error, "response.statusCode");
                    let errorDetails = _.get(error.response, 'data.details[0]', {});

                    if (Object.keys(errorDetails).length > 0) {
                        errors.name = _.get(errorDetails, 'name', "");
                        errors.phone = _.get(errorDetails, 'phone', "");
                    } else if (status === 401) {
                        router.push({name: 'Login'})
                    } else if (status === 403) {
                        router.push({name: 'Home', params: {errorPermission: "true"}});
                    } else {
                        let messageError = _.get(error.response, 'data.message');
                        ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!")
                    }
                })
            }
        }

        const handleCreateCustomer = () => {
            if(validateData){
                let data = {
                    name: customer.name,
                    phone: customer.phone,
                    password: customer.password,
                    is_active: customer.is_active ? 1 : 0
                }
                api.createCustomer(data).then(() => {
                    ElMessage({
                        message: 'Thêm mới khách hàng thành công !',
                        type: 'success',
                    })

                    handleSearch(page.currentPage);
                    closeModal();
                }).catch((error) => {
                    let status = _.get(error, "response.statusCode");
                    let errorDetails = _.get(error.response, 'data.details[0]', {});

                    if (Object.keys(errorDetails).length > 0) {
                        errors.name = _.get(errorDetails, 'name', "");
                        errors.phone = _.get(errorDetails, 'phone', "");
                        errors.password = _.get(errorDetails, 'password', "");
                    } else if (status === 401) {
                        router.push({name: 'Login'})
                    } else if (status === 403) {
                        router.push({name: 'Home', params: {errorPermission: "true"}});
                    } else {
                        let messageError = _.get(error.response, 'data.message');
                        ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!")
                    }
                })
            }
        }

        const handleDeleteCustomer = (id) => {
            ElMessageBox.confirm(
                'Dữ liệu đã xóa không thể phục hồi! Bạn có muốn tiếp tục?',
                'Cảnh báo',
                {
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy',
                    type: 'warning',
                    confirmButtonClass: 'btn-delete',
                    cancelButtonClass: 'btn-close',
                }
            ).then(() => {
                api.deleteCustomer(id).then(() => {
                    ElMessage({
                        message: 'Xóa khách hàng thành công!',
                        type: 'success',
                    })

                    handleChangeCurrentPage(page.currentPage)
                }).catch((error) => {
                    let errorMessage = _.get(error, "response.data.error.error_user") ?
                        _.get(error, "response.data.error.error_user") :
                        "Có lỗi xảy ra, vui lòng thử lại sau!";
                    if (errorMessage && errorMessage.length > 0) {
                        ElMessage.error('errorMessage[0]')
                    }
                })
            })
        }

        const closeModal = () => {
            modalCustomer.value = false
            modalPassword.value = false
        }

        const modalResetPassword = (id) => {
            resetForm()
            customer._id = id
            modalPassword.value = true
        }

        const handleResetPassword = () => {
            if(validatePassword()){
                let data = {
                    password: customer.password,
                    confirm_password: customer.passwordConfirm,
                }
                api.updateCustomerPassword(data, customer._id).then(() => {
                    ElMessage({
                        message: 'Cập nhật mật khẩu khách hàng thành công !',
                        type: 'success',
                    })
                    closeModal();
                }).catch((error) => {
                    let status = _.get(error, "response.statusCode");
                    let errorDetails = _.get(error.response, 'data.details[0]', {});

                    if (Object.keys(errorDetails).length > 0) {
                        errors.password = _.get(errorDetails, 'password', "");
                        errors.passwordConfirm = _.get(errorDetails, 'confirm_password', "");
                    } else if (status === 401) {
                        router.push({name: 'Login'})
                    } else if (status === 403) {
                        router.push({name: 'Home', params: {errorPermission: "true"}});
                    } else {
                        let messageError = _.get(error.response, 'data.message');
                        ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!")
                    }
                })
            }
        }

        const changeStatus = (status, id) => {
            let data = {
                is_active: status ? 1 : 0
            }
            api.updateCustomerStatus(data, id).then(() => {
                ElMessage({
                    message: 'Cập nhật trạng thái thành công!',
                    type: 'success',
                })
            }).catch((error) => {
                let messageError = _.get(error.response, 'data.message');
                ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!")
            });
        }

        const copyRef = async (ref) => {
            try {
                isCopy.value = "Copied"
                await navigator.clipboard.writeText(ref);
                setTimeout(() => {
                    isCopy.value = "Copy"
                }, 1500)
            } catch ($e) {
                ElMessage.error("Không thể copy")
            }
        }

        const redirectCustomer = (id) => {
            router.push({name: 'DetailCustomer', params: {id: id}});
        }

        watch(customer, () => {
            if(customer.name){
                errors.name = ""
            }
            if(customer.phone){
                errors.phone = ""
            }
            if(customer.password){
                errors.password = ""
            }
            if(customer.passwordConfirm){
                errors.passwordConfirm = ""
            }
        })

        const hasPermission = (per) => {
            return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per)
        }

        watch(viewSelected, () => {
            handleSearch(1)
        })

        return{
            customers,
            page,
            viewSelected,
            views,
            searchKey,
            errors,
            customer,
            modalCustomer,
            modalPassword,
            loading,
            modalTitle,
            isUpdate,
            isCopy,
            Search,
            getListCustomers,
            handleSearch,
            handleClear,
            closeModal,
            handleChangeCurrentPage,
            openModalCustomer,
            handleDeleteCustomer,
            modalResetPassword,
            copyRef,
            handleUpdateCustomer,
            handleCreateCustomer,
            handleResetPassword,
            changeStatus,
            redirectCustomer,
            hasPermission
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/customer/index.scss";
</style>