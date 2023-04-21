<template>
    <div id="permission">
        <section class="action">
            <el-row class="action-wrap">
                <el-col :span="24" class="action-wrap--col">
                    <Breadcrumb/>
                </el-col>
            </el-row>
        </section>
        <div class="permission-main">
            <el-card>
                <el-row :gutter="40">
                    <el-col :span="6" class="border-r border-solid">
                        <div class="permission-main__title flex justify-between border-b border-solid mb-4">
                            <p class="mb-2 text-base font-bold">Vai trò</p>
                            <div class="cursor-pointer text-[#009ef7]"
                                 v-if="hasPermission('add-role')"
                                 @click="openModalRole(false)">
                                + Tạo mới vai trò
                            </div>
                        </div>
                        <div class="permission-main__content h-[calc(100vh_-_232px)]">
                            <el-tree :data="roles"
                                     :props="{children : 'children', label: 'name'}"
                                     default-expand-all
                                     :expand-on-click-node="false">
                                <template #default="item">
                                    <div class="flex justify-between w-full cursor-auto">
                                      <div @click="hasPermission('detail-role') ? openDetailRole(item.data) : ''" :id="item.data._id"
                                           :class="hasPermission('detail-role') ? 'cursor-pointer' : ''"
                                           class="role-name flex items-center">
                                          <div class="mr-1">{{ item.data.name }}</div>
                                          <el-tooltip
                                              v-if="item.data.description"
                                              class="box-item"
                                              effect="dark"
                                              :content="item.data.description"
                                              placement="top"
                                          >
                                              <el-icon class="!text-[#f36a26]"><InfoFilled /></el-icon>
                                          </el-tooltip>
                                      </div>
                                      <div v-if="!item.data.is_protected" class="flex justify-center items-center mr-4">
                                          <el-tooltip v-if="hasPermission('edit-role')" class="item" effect="dark" content="Chỉnh sửa" placement="bottom">
                                              <inline-svg
                                                  @click="openModalRole(true, item.data)"
                                                  class="w-3 h-3 text-[#8a8b8c] hover:text-[#009ef7] !outline-none cursor-pointer"
                                                  :src="icon.pen"
                                              />
                                          </el-tooltip>
                                          <el-tooltip v-if="hasPermission('delete-role')" class="item" effect="dark" content="Xóa" placement="bottom">
                                              <inline-svg
                                                  @click="handleDeleteRole(item.data._id)"
                                                  class="w-3 h-3 text-[#8a8b8c] hover:text-[#f56c6c] ml-2 !outline-none cursor-pointer"
                                                  :src="icon.trash"
                                              />
                                          </el-tooltip>
                                      </div>
                                    </div>
                                </template>
                            </el-tree>
                        </div>
                    </el-col>
                    <el-col :span="18" v-if="detailRole">
                        <div class="permission-main__title font-bold border-b border-solid mb-4">
                            <p class="mb-2 text-base">Quyền hạn</p>
                        </div>
                        <div class="permission-main__content">
                            <div class=" mb-4 flex items-center">Người dùng trong&nbsp;<span class="font-bold text-[#3a5e81] mr-3">{{role.name}}:</span>
                                <div v-for="admin in admins.slice(0,3)" :key="admin._id" class="flex items-center">
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        :content="admin.name"
                                        placement="top"
                                    >
                                        <el-avatar :size="35" :src="admin?.avatar ? admin.avatar : userDefault" class="mr-1 cursor-pointer"/>
                                    </el-tooltip>
                                </div>
                                <div v-if="admins.length > 3" class="flex items-center">
                                    <div class="w-[35px] h-[35px] flex items-center justify-center font-bold text-white bg-[#00000085] rounded-full text-xs mr-1">
                                        +{{admins.length - 3}}
                                    </div>
                                </div>
                                <div v-if="!role.is_protected && hasPermission('edit-admin')" class="flex items-center">
                                    <div @click="openModalAdmin"
                                         class="w-[35px] h-[35px] flex items-center justify-center font-bold text-[#3a5e81] rounded-full text-xs border border-dashed border-[#3a5e81] cursor-pointer">
                                        +
                                    </div>
                                </div>
                                <div v-else-if="!admins.length"><i class="text-muted">Không có</i></div>
                            </div>
                            <el-table
                                v-if="hasPermission('list-permission')"
                                :data="permissionsGroup"
                                style="width: 100%"
                                row-key="_id"
                                border
                                default-expand-all
                                height="calc(100vh - 290px)"
                                header-cell-class-name="!bg-[#e4e9ef]"
                                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                            >
                                <el-table-column
                                    width="230px"
                                    label="Chức năng">
                                    <template #default="permission">
                                        <span v-if="permission.row.name">
                                            <span class="inline-flex items-center">
                                                <span class="mr-1">{{ permission.row.name }}</span>
                                                 <el-tooltip
                                                     v-if="permission.row.description"
                                                     class="box-item"
                                                     effect="dark"
                                                     :content="permission.row.description"
                                                     placement="top"
                                                 >
                                                    <el-icon class="!text-[#f36a26]"><InfoFilled /></el-icon>
                                                </el-tooltip>
                                            </span>
                                        </span>
                                        <i v-else class="text-muted">Đang cập nhật</i>
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="(type) in types"
                                                 align="center"
                                                 :key="type._id"
                                                 :label="type.name">
                                    <template #default="permission">
                                        <div v-if="permission.row.permissions">
                                            <div v-for="(item, i) in permission.row.permissions" :key="i">
                                                <div v-if="item">
                                                    <el-checkbox v-if="type.code === item.permission_type_code"
                                                                 v-model="item.active"
                                                                 @change="updatePermissionForRole(item._id)"
                                                                 :disabled="role.is_protected || !hasPermission('update-permissions-for-role')">
                                                    </el-checkbox>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="18" class="" v-else>
                        <div class="w-full h-full flex items-center justify-center">
                            <div class="opacity-60">
                                <inline-svg
                                    @click="handleDeleteRole(item.data._id)"
                                    class="w-56 h-56 text-[#8a8b8c] hover:text-[#f56c6c] ml-2 !outline-none text-center setting"
                                    :src="icon.setting"
                                />
                                <div class="text-base">Thiết lập phân quyền cho nhân viên</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <el-dialog
            width="35%"
            top="5vh"
            :title="modalRole"
            v-model="isShowModalRole"
            :close-on-click-modal="false"
            class="modal-role"
        >
            <div class="modal-role__wrapper">
                <div class="input-warp w-full">
                    <label>Vai trò cha</label>
                    <el-cascader
                        placeholder="Chọn vai trò cha"
                        class="inputWrap w-full"
                        v-model="role.parent_id"
                        :options="rolesAction"
                        :props="{ multiple: false, value: '_id', label: 'name',checkStrictly: true, children: 'children', emitPath: false}"
                        :show-all-levels="false"
                        @change="selectParent"
                        clearable>
                        <template #default="item">
                            {{item.data.name}}
                        </template>
                    </el-cascader>
                    <div v-if="errorRole.errorParent !== '' " class="error">
                        <span> {{ errorRole.errorParent }} </span>
                    </div>
                </div>
                <div class="input-warp w-full">
                    <label>Tên vai trò <span class="required">*</span></label>
                    <el-input
                        placeholder="Nhập tên vai trò"
                        v-model="role.name"
                        :class="{'inputError':errorRole.errorName.length > 0}">
                    </el-input>
                    <div v-if="errorRole.errorName !== '' " class="error">
                        <span> {{ errorRole.errorName }} </span>
                    </div>
                </div>
                <div class="input-warp w-full">
                    <label>Mô tả</label>
                    <el-input
                        type="textarea"
                        placeholder="Nhập mô tả"
                        v-model="role.description"
                        :class="{'inputError':errorRole.errorDescription.length > 0}">
                    </el-input>
                    <div v-if="errorRole.errorDescription !== '' " class="error">
                        <span> {{ errorRole.errorDescription }} </span>
                    </div>
                </div>
            </div>
            <template #footer>
                <el-button class="btn-close" @click="isShowModalRole = false">Hủy</el-button>
                <el-button class="btn-apply" type="primary" @click="!isUpdateRole ? handleCreateRole() : handleUpdateRole()">
                    Lưu
                </el-button>
            </template>
        </el-dialog>
        <el-dialog
            width="35%"
            top="5vh"
            title="Nhân viên áp dụng"
            v-model="isShowModalPermission"
            :close-on-click-modal="false"
            class="modal-admin"
        >
            <div class="modal-admin__wrapper w-full">
                <el-row :gutter="20" class="mb-5">
                    <el-col :span="19">
                        <el-select v-model="adminsSelected"
                                   class="w-full"
                                   placeholder="Chọn nhân viên"
                                   multiple
                                   filterable
                                   clearable collapse-tags
                                   collapse-tags-tooltip
                                   :max-collapse-tags="2"
                                   size="large"
                                   no-match-text="Không tìm thấy nhân viên"
                                   @change="selectAdminsRole">
                            <el-option
                                v-for="item in adminsWithoutRole"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                                class="my-1">
                                <div class="flex items-center">
                                    <el-avatar :size="30" :src="item?.avatar ? item.avatar : userDefault"></el-avatar>
                                    <p class="ml-2">{{item.name}}</p>
                                </div>
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="!flex justify-end">
                        <el-button @click="handleAddRoleForAdmins" type="primary" class="btn-apply">
                            Thêm mới
                        </el-button>
                    </el-col>
                </el-row>
                <div v-if="cloneAdmins.length > 0" class="admins-wrapper pt-4 h-[50vh] overflow-hidden">
                    <div v-for="item in cloneAdmins" :key="item._id" class="my-2 pb-2 border-b border-solid">
                        <div class="flex items-center justify-between">
                            <div class="admin-info flex items-center">
                                <el-avatar :size="35" :src="item?.avatar ? item.avatar : userDefault"></el-avatar>
                                <div class="ml-2">
                                    <p class="font-bold text-[#3a5e81]">{{item.name}}</p>
                                    <p v-if="item.email">{{item.email}}</p>
                                    <p v-else class="text-muted">Đang cập nhật</p>
                                </div>
                            </div>
                            <div class="admin-action mx-2" v-if="!item.is_new && hasPermission('edit-admin')">
                                <el-tooltip class="item" effect="dark" content="Xóa vai trò của nhân viên" placement="bottom">
                                    <inline-svg
                                        @click="handleRemoveAdminFromRole(item._id)"
                                        class="w-3 h-3 text-[#8a8b8c] hover:text-[#f56c6c] cursor-pointer ml-2 !outline-none"
                                        :src="icon.trash"
                                    />
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <el-empty class="h-[50vh]" v-else description="Chưa có nhân viên nào thuộc vai trò này" />
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import { onMounted, ref, reactive, watch } from "vue";
import { Getters, Mutations } from "@/store/enums/_type_enum";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from 'element-plus'
import api from "@/utils/services/_api_service";
import _ from "lodash";
import { useRouter } from "vue-router";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Role",
    components: {
        Breadcrumb
    },
    setup(){
        const store = useStore()
        const router = useRouter()
        const icon = reactive({
            pen: require('@/assets/images/icons/pen.svg'),
            trash: require('@/assets/images/icons/trash.svg'),
            close: require('@/assets/images/icons/xmark.svg'),
            setting: require('@/assets/images/icons/gears.svg')
        })
        const userDefault = ref(require("@/assets/images/userDefault.png"));
        const roles = ref([])
        const rolesAction = ref([])
        const permissionsGroup = ref([])
        const types = ref([])
        const modalRole = ref("")
        const isShowModalRole = ref(false)
        const role = reactive({
            _id: "",
            parent_id: "",
            name: "",
            description: "",
            is_protected: false
        })
        const errorRole = reactive({
            errorParent: "",
            errorName: "",
            errorDescription: ""
        })
        const isUpdateRole = ref(false)

        const isShowModalPermission = ref(false)
        const detailRole = ref(false)
        const admins = ref([])
        const cloneAdmins = ref([])
        const adminsWithoutRole = ref([])
        const adminsSelected = ref([])

        watch(role, (val) => {
            if(val.name.length > 0){
                errorRole.errorName = ""
            }
        });

        onMounted(() => {
            store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 3)
            store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
                {
                    path: '/',
                    name: 'Trang Chủ',
                },
                {
                    path: window.location.pathname,
                    name: 'Phân quyền',
                }
            ])
            getRoles()
        })

        /*Role*/
        const getRoles = (params = {}) => {
            api.getRoles(params).then((res) => {
                roles.value = _.get(res, 'data.data', []);
            }).catch(() => {
                ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
            })
        }
        const getRolesAction = (data = {}) => {
            api.getRolesAction(data).then((res) => {
                rolesAction.value =_.get(res, 'data.data', []);
            }).catch(() => {
                ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.');
            })
        }
        const selectParent = () => {
        }
        const openModalRole = (isUpdate = false, data = null) => {
            resetFormRole()
            isShowModalRole.value = true
            isUpdateRole.value = isUpdate
            modalRole.value = isUpdateRole.value ? "Cập nhật vai trò" : "Tạo mới vai trò"
            if(data){
                role._id = data._id
                role.parent_id = data.parent_id
                role.name = data.name
                role.description = data.description
                getRolesAction({id: data._id})
            }else{
                getRolesAction()
            }
        }
        const resetFormRole = () => {
            role._id = ""
            role.parent_id = ""
            role.name = ""
            errorRole.errorName = ""
            errorRole.errorParent= ""
            errorRole.errorDescription= ""
        }
        const handleUpdateRole = () => {
            if(role.name.length === 0){
                errorRole.errorName = "Tên vai trò không được để trống"
            }else{
                let data = {
                    name: role.name,
                    description: role.description,
                    parent_id: role.parent_id
                }
                api.updateRole(data, role._id).then(() => {
                    ElMessage({
                        type: 'success',
                        message: 'Cập nhật vai trò thành công',
                    })
                    isShowModalRole.value = false
                    getRoles();
                }).catch((error) => {
                    let errors = _.get(error.response, 'data.details[0]', {});
                    let status = _.get(error, "response.statusCode");
                    if (Object.keys(errors).length > 0) {
                        errorRole.errorName = _.get(errors, 'name', "")
                        errorRole.errorParent = _.get(errors, 'parent_id', "")
                        errorRole.errorDescription = _.get(errors, 'description', "")
                    }
                    if (status === 401) {
                        router.push({name: 'Login'})
                    }
                })
            }
        }
        const handleCreateRole = () => {
            if(role.name.length === 0){
                errorRole.errorName = "Tên vai trò không được để trống"
            }else{
                let data = {
                    name: role.name,
                    description: role.description,
                    parent_id: role.parent_id
                }
                api.createRole(data).then(() => {
                    ElMessage({
                        type: 'success',
                        message: 'Tạo mới vai trò thành công',
                    })
                    isShowModalRole.value = false
                    getRoles();
                }).catch((error) => {
                    let errors = _.get(error.response, 'data.details[0]', {});
                    let status = _.get(error, "response.statusCode");
                    if (Object.keys(errors).length > 0) {
                        errorRole.errorName = _.get(errors, 'name', "")
                        errorRole.errorParent = _.get(errors, 'parent_id', "")
                        errorRole.errorDescription = _.get(errors, 'description', "")
                    }
                    if (status === 401) {
                        router.push({name: 'Login'})
                    }
                })
            }
        }
        const handleDeleteRole = (id) => {
            ElMessageBox.confirm(
                'Dữ liệu đã xóa không thể phục hồi, Bạn có muốn tiếp tục?',
                'Xóa vai trò',
                {
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy',
                    type: 'warning',
                    confirmButtonClass: 'btn-delete',
                    cancelButtonClass: 'btn-close',
                }
            ).then(() => {
                api.deleteRole(id).then(() => {
                    ElMessage({
                        type: 'success',
                        message: 'Xóa vai trò thành công',
                    })
                    getRoles();
                }).catch(() => {
                    ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
                })
            })
        }

        /*Admin*/
        const openModalAdmin = () => {
            isShowModalPermission.value = true
            adminsSelected.value = []
            getAdminsWithoutRole()
        }
        const getPermissionTypes = () => {
            api.getPermissionTypes().then((res) => {
                types.value = _.get(res, 'data.data', []);
            }).catch(() => {
                ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
            })
        }
        const openDetailRole = (data) => {
            detailRole.value = true
            role._id = data._id
            role.parent_id = data.parent_id
            role.name = data.name
            role.description = data.description
            role.is_protected = data.is_protected
            let unActive = document.querySelectorAll('.role-name')
            unActive.forEach(item => {
                item.classList.remove('font-bold')
            })
            let active = document.getElementById(data._id)
            active.classList.add('font-bold')
            getAdminsRole()
            if(hasPermission('list-permission')){
                getListPermission(data._id)
                getPermissionTypes()
            }
        }
        const getAdminsRole = (params = {}, hasRole = false) => {
            if(!hasRole){
                params.has_role = true
            }
            api.getAdminsRole(params, role._id).then((res) => {
                admins.value = _.get(res, 'data.data', []);
                cloneAdmins.value = _.cloneDeep(admins.value)
            }).catch(() => {
                ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
            })
        }
        const getAdminsWithoutRole = () => {
            api.getAdminsRole({}, true).then((res) => {
                adminsWithoutRole.value = _.get(res, 'data.data', []);
            }).catch(() => {
                ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
            })
        }
        const selectAdminsRole = () => {
            let clone = _.cloneDeep(admins.value)
            adminsSelected.value.forEach((item) => {
                let selected = _.find(_.cloneDeep(adminsWithoutRole.value), (o) => {
                    return o._id === item
                })
                if(selected){
                    selected.is_new = true
                    clone.push(selected)
                }
            })
            cloneAdmins.value = clone
        }
        const handleAddRoleForAdmins = () => {
            if(adminsSelected.value.length > 0){
                let data = new FormData()
                adminsSelected.value.forEach((item, i) =>{
                    data.append('admin_ids['+ i +']', item)
                })
                api.addRoleForAdmins(data, role._id).then(() => {
                    isShowModalPermission.value = false
                    getAdminsRole()
                    ElMessage({
                        type: 'success',
                        message: 'Thêm vai trò cho nhân viên thành công',
                    })
                }).catch(() => {
                    ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
                })
            }
        }
        const handleRemoveAdminFromRole = (adminId) => {
            ElMessageBox.confirm(
                'Dữ liệu đã xóa không thể phục hồi, Bạn có muốn tiếp tục?',
                'Xóa vai trò của nhân viên',
                {
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy',
                    type: 'warning',
                    confirmButtonClass: 'btn-delete',
                    cancelButtonClass: 'btn-close',
                }
            ).then(() => {
                api.removeAdminFromRole(role._id, adminId).then(() => {
                    getAdminsRole()
                    getAdminsWithoutRole()
                    ElMessage({
                        type: 'success',
                        message: 'Xóa vai trò của nhân viên thành công',
                    })
                }).catch(() => {
                    ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
                })
            })
        }
        const getListPermission = (id) => {
            api.getListPermission(id).then((res) => {
                permissionsGroup.value = _.get(res, 'data.data', []);
            }).catch(() => {
                ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
            })
        }
        const updatePermissionForRole = (permissionId) => {
            api.updatePermissionForRole(role._id, permissionId).then(() => {
                ElMessage({
                    type: 'success',
                    message: 'Cập nhật quyền hạn của vai trò thành công',
                })
            }).catch(() => {
                ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
            })
        }

        const hasPermission = (per) => {
            return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per)
        }

        return{
            icon,
            userDefault,

            roles,
            modalRole,
            isShowModalRole,
            role,
            errorRole,
            rolesAction,
            isUpdateRole,
            permissionsGroup,

            types,
            isShowModalPermission,
            admins,
            detailRole,
            adminsWithoutRole,
            adminsSelected,
            cloneAdmins,

            openModalRole,
            handleDeleteRole,
            selectParent,
            handleUpdateRole,
            handleCreateRole,
            getRolesAction,

            openModalAdmin,
            getPermissionTypes,
            openDetailRole,
            getAdminsRole,
            getAdminsWithoutRole,
            selectAdminsRole,
            handleAddRoleForAdmins,
            handleRemoveAdminFromRole,
            getListPermission,
            updatePermissionForRole,
            hasPermission
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/permission/_permission.scss";
</style>