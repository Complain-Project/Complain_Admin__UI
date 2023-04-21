<template>
    <div class="profile">
        <el-drawer v-model="openProfileComputed"
                   direction="rtl"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="closeProfileDrawer"
        >
            <template #header>
                <span class="text-xl">Thông tin cá nhân</span>
            </template>
            <template #default>
                <div class="profiles">
                    <div class="profileWarp">
                        <el-row>
                            <el-col :span="24">
                                <span class="text-lg">Cập nhật thông tin cá nhân</span>
                            </el-col>
                            <el-col :span="24" class="mt-3" v-loading="loading">
                                <div class="upload__wrapper__upload relative w-4/12">
                                    <el-upload
                                        class="avatar-uploader flex justify-center" action="#"
                                        :auto-upload="false" :show-file-list="false"
                                        :on-change="handleChangeAvatar">
                                        <img v-if="avatar" :src="avatar" class="avatar">
                                        <el-icon v-else class="el-icon-plus avatar-uploader-icon"><Plus /></el-icon>
                                    </el-upload>
                                </div>
                                <div class="mb-3 mt-3">
                                    <label>Tên hiển thị <span class="text-red-600">*</span></label>
                                    <el-input v-model="name"></el-input>
                                    <div v-if="errorName !== '' " class="text-red-600 mt-1">
                                        <span> {{ errorName }} </span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label>Email <span class="text-red-600">*</span></label>
                                    <el-input v-model="email"></el-input>
                                    <div v-if="errorEmail !== '' " class="text-red-600 mt-1">
                                        <span> {{ errorEmail }} </span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label>Số điện thoại <span class="text-red-600">*</span></label>
                                    <el-input v-model="phone"></el-input>
                                    <div v-if="errorPhone !== '' " class="text-red-600 mt-1">
                                        <span> {{ errorPhone }} </span>
                                    </div>
                                </div>
                                <div class="text-right mt-3">
                                    <el-button type="primary" class="btn-apply" @click="handleUpdateInfo()">Lưu
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="mt-10">
                            <el-col :span="24">
                                <span class="text-lg">
                                    Thay đổi mật khẩu
                                </span>
                            </el-col>
                            <el-col :span="24" class="mt-3">
                                <div class="mainForm" v-loading="loadingPassword">
                                    <div class="mb-3">
                                        <label>Mật khẩu cũ <span class="text-red-600">*</span></label>
                                        <el-input show-password v-model="current_password"></el-input>
                                        <div v-if="errorCurrentPassword !== '' " class="text-red-600 mt-1">
                                            <span> {{ errorCurrentPassword }} </span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label>Mật khẩu mới <span class="text-red-600">*</span></label>
                                        <el-input show-password v-model="password"></el-input>
                                        <div v-if="errorPassword !== '' " class="text-red-600 mt-1">
                                            <span> {{ errorPassword }} </span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label>Xác nhận mật khẩu <span class="text-red-600">*</span></label>
                                        <el-input show-password v-model="password_confirmation"></el-input>
                                        <div v-if="errorPasswordConfirmation !== '' " class="text-red-600 mt-1">
                                            <span> {{ errorPasswordConfirmation }} </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right mt-3">
                                    <el-button type="primary" class="btn-apply" @click="handleChangePassword()">
                                        Lưu
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import {useStore} from "vuex";
import {Actions, Mutations} from "@/store/enums/_type_enum";
import _ from "lodash";
import api from "@/utils/services/_api_service";
import {isValidEmail} from "@/utils/helpers/_email_helper";
import {isValidPhone} from "@/utils/helpers/_phone_helper";
import {ElMessage} from "element-plus";
import { useRouter } from "vue-router";

export default {
    name: "ProfileComponent",
    setup() {
        const store = useStore();
        const router = useRouter();

        /* Variables::start */
        let name = ref("")
        let email = ref("")
        let phone = ref("")
        let avatar = ref("");
        let errorName = ref("")
        let errorEmail = ref("")
        let errorPhone = ref("")
        let loading = ref(false)
        let loadingPassword = ref(false)
        let current_password = ref("")
        let password = ref("")
        let password_confirmation = ref("")
        let errorPassword = ref("")
        let errorCurrentPassword = ref("")
        let errorPasswordConfirmation = ref("")
        let errorAvatar = ref("");
        let fileUpload = ref(null);
        /* Variables::end */


        /* Computed::start */
        const openProfileComputed = computed(() => store.state.layoutModule.drawer);
        const authUserComputed = computed(() => store.state.authModule.authUser);
        /* Computed::end */

        /* Watch::start */
        watch(openProfileComputed, (val) => {
            if (val) {
                getAuthUser()
            }
        });

        watch(name, () => {
            errorName.value = "";
        });
        watch(email, () => {
            errorEmail.value = "";
        });
        watch(phone, () => {
            errorPhone.value = "";
        });
        watch(password, () => {
            errorPassword.value = "";
        });
        watch(current_password, () => {
            errorCurrentPassword.value = "";
        });
        watch(password_confirmation, () => {
            errorPasswordConfirmation.value = "";
        });
        /* Watch::end */

        /* Lifecycle hooks::start */
        onMounted(() => {
            closeProfileDrawer()
        });
        /* Lifecycle hooks::end */

        /* Function::start */
        const resetError = () => {
            errorName.value = ""
            errorEmail.value = ""
            errorPhone.value = ""
        }

        const isValidInfo = () => {
            let error = false;
            resetError()

            if (name.value.length === 0) {
                error = true;
                errorName.value = 'Tên khách hàng không được để trống';
            }

            if (email.value.length === 0) {
                error = true;
                errorEmail.value = 'Email không được để trống';
            }

            if (!isValidEmail(email.value)) {
                error = true;
                errorEmail.value = 'Email sai định dạng, vui lòng nhập lại';
            }
            if (email.value.length === 0) {
                error = true;
                errorEmail.value = 'Email không được để trống';
            }

            if (phone.value && !isValidPhone(phone.value)) {
                error = true;
                errorPhone.value = 'Số điện thoại sai định dạng, vui lòng nhập lại';
            }
            return !error
        }

        const handleUpdateInfo = () => {
            if (isValidInfo()) {
                loading.value = true;
                let data = new FormData()
                data.append("name", name.value)
                data.append("phone", phone.value)
                data.append("email", email.value)
                if(fileUpload.value){
                    data.append("avatar", fileUpload.value)
                }
                api.updateInfoAdmin(data).then(() => {
                    ElMessage({
                        message: 'Cập nhật thành công!',
                        type: 'success',
                    })

                    loading.value = false;
                    getAuthUser();
                }).catch((error) => {
                    let status = _.get(error, "response.statusCode");
                    let errorDetails = _.get(error.response, 'data.details[0]', {});

                    if (Object.keys(errorDetails).length > 0) {
                        errorName.value = _.get(errorDetails, 'name', "");
                        errorPhone.value = _.get(errorDetails, 'phone', "");
                        errorEmail.value = _.get(errorDetails, 'email', "");
                    } else if (status === 401) {
                        router.push({name: 'Login'})
                    } else if (status === 403) {
                        router.push({name: 'Home', params: {errorPermission: "true"}});
                    } else {
                        let messageError = _.get(error.response, 'data.message');
                        ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!")
                    }
                    loading.value = false;
                })
            }
        }

        const closeProfileDrawer = () => {
            store.commit(`layoutModule/${Mutations.SET_COLLAPSE_PROFILE}`, false)
        }

        const getAuthUser = () => {
            loading.value = true;
            api.getAuthUser().then(res => {
                name.value = _.get(res, 'data.data.name', '')
                email.value = _.get(res, 'data.data.email', '')
                phone.value = _.get(res, 'data.data.phone', '')
                avatar.value = _.get(res, 'data.data.avatar', '')
                store.commit(`authModule/${Mutations.SET_AUTH}`, _.get(res, 'data.data'))
                loading.value = false;
            })
        }

        const validPassword = () => {
            let error = false;
            if (current_password.value.length === 0) {
                error = true;
                errorCurrentPassword.value = "Mật khẩu cũ không được bỏ trống"
            }
            if (password.value.length === 0) {
                error = true;
                errorPassword.value = "Mật khẩu mới không được bỏ trống"
            }
            if (password_confirmation.value.length === 0) {
                error = true;
                errorPasswordConfirmation.value = "Mật khẩu xác nhận không được để trống"
            }
            if (current_password.value && password.value && current_password.value === password.value) {
                error = true;
                errorPassword.value = "Mật khẩu mới phải khác mật khẩu hiện tại"
            }
            if (password.value && password_confirmation.value && password.value !== password_confirmation.value) {
                error = true;
                errorPasswordConfirmation.value = "Mật khẩu không chính xác"
            }

            return !error;
        }

        const handleChangePassword = () => {
            if (validPassword()) {
                loadingPassword.value = true;
                let data = {
                    current_password: current_password.value,
                    password: password.value,
                    confirm_password: password_confirmation.value
                }
                api.changeAuthPassword(data).then(() => {
                    ElMessage({
                        message: 'Cập nhật thành công!',
                        type: 'success',
                    })
                    loadingPassword.value = false;

                    logout();
                }).catch((error) => {
                    let status = _.get(error, "response.statusCode");
                    let errorDetails = _.get(error.response, 'data.details[0]', {});

                    if (Object.keys(errorDetails).length > 0) {
                        errorPassword.value = _.get(errorDetails, 'password', "");
                        errorCurrentPassword.value = _.get(errorDetails, 'current_password', "");
                        errorPasswordConfirmation.value = _.get(errorDetails, 'confirm_password', "");
                    } else if (status === 401) {
                        router.push({name: 'Login'})
                    } else if (status === 403) {
                        router.push({name: 'Home', params: {errorPermission: "true"}});
                    } else {
                        let messageError = _.get(error.response, 'data.message');
                        ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!")
                    }

                    loadingPassword.value = false;
                })
            }
        }
        const handleChangeAvatar = (file) => {
            let fileTypes = [
                "image/jpg",
                "image/jpeg",
                "image/png",
                "image/JPG",
                "image/JPEG",
                "image/PNG",
                "image/gif",
            ]

            let fileType = fileTypes.includes(file.raw.type);
            let fileSize = file.size / 1024 / 1024  < 2.048;

            if (!fileType) {
                errorAvatar.value = "";
                ElMessage.error("Ảnh đại diện không đúng định dạng. Chỉ hỗ trợ định dạng jpg, jpeg, png, gif.")
            }
            if (!fileSize) {
                errorAvatar.value = "";
                ElMessage.error("Kích thước ảnh đại diện không được vượt quá 2MB.")
            }

            if (fileType && fileSize) {
                fileUpload.value = file.raw;
                avatar.value = URL.createObjectURL(file.raw);
            }
        }

        const logout = () => {
            store.commit(`homeModule/${Mutations.SET_IS_LOGIN}`, false)
            store.dispatch(`authModule/${Actions.LOGOUT}`)
        }

        /* Function::end */


        return {
            /* Variables::start */
            name,
            email,
            phone,
            avatar,
            errorName,
            errorEmail,
            errorPhone,
            errorAvatar,
            loading,
            loadingPassword,
            current_password,
            password,
            password_confirmation,
            errorPassword,
            errorCurrentPassword,
            errorPasswordConfirmation,
            openProfileComputed,
            authUserComputed,
            closeProfileDrawer,
            handleUpdateInfo,
            handleChangePassword,
            handleChangeAvatar
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/layouts/main-layout/profile/index.scss";
</style>