<template>
    <div class="loginForm">
        <div class="header">
            <el-row>
                <el-col :span="14" class="image-left">
                    <h5 class="content">Chào mừng trở lại !</h5>
                    <p>Đăng nhập vào hệ thống quản lý</p>

                </el-col>
                <el-col :span="10" class="image-right">
                    <img src="@/assets/images/imageAdmin.png" alt=""/>
                </el-col>
            </el-row>
            <div class="avatar">
                <img src="@/assets/images/userDefault.png" alt="">
            </div>
        </div>

        <label class="label">Email</label>
        <div class="inputWrap">
            <el-input placeholder="Email"
                      size="large"
                      type="email"
                      v-model="email"
                      @keyup.enter="handleLogin()">
            </el-input>
            <div v-if="errorEmail !== ''" class="error">
                <span> {{ errorEmail }} </span>
            </div>
        </div>
        <label class="label">Mật khẩu</label>
        <div class="inputWrap">
            <el-input
                size="large"
                placeholder="Mật khẩu"
                type="password"
                v-model="password"
                @keyup.enter="handleLogin()"
            >
            </el-input>
            <div v-if="errorPassword !== ''" class="error">
                <span> {{ errorPassword }} </span>
            </div>
        </div>
        <el-button type="primary" class="loginButton" @click="handleLogin()">
            ĐĂNG NHẬP
        </el-button>

    </div>
</template>
<script>
import {useRouter, useRoute} from 'vue-router';
import api from "@/utils/services/_api_service";
import {isValidEmail} from "@/utils/helpers/_email_helper";
import _ from "lodash";
import {watch, onMounted, ref, reactive} from "vue";
import { ElMessage } from 'element-plus'
import JwtService from "@/utils/services/_jwt_service";
import {Mutations} from "@/store/enums/_type_enum";
import {useStore} from "vuex";

export default {
    name: "LoginPage",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        /* Variables::start */
        let errorEmail = ref("");
        let errorPassword = ref("");
        let email = ref("");
        let password = ref("");
        let data = reactive({});
        /* Variables::end */

        /* Lifecycle hooks::start */
        onMounted(() => {
            if (route.params.is_lock_off) {
                ElMessage.error('Tài khoản bị khóa!')
            }
        });
        /* Lifecycle hooks::end */

        /* Watch::start */
        watch(email, () => {
            errorEmail.value = "";
        });
        watch(password, () => {
            errorPassword.value = "";
        });
        /* Watch::end */

        /* Function::start */
        const isValidData = () => {
            let error = false;
            errorEmail.value = "";
            errorPassword.value = "";

            if (!isValidEmail(email.value)) {
                error = true;
                errorEmail.value = "Email sai định dạng, vui lòng nhập lại";
            }
            if (email.value.length === 0) {
                error = true;
                errorEmail.value = "Email không được để trống";
            }
            if (password.value.length < 6) {
                error = true;
                errorPassword.value = "Mật khẩu phải lớn hơn 6 ký tự";
            }
            if (password.value.length === 0) {
                error = true;
                errorPassword.value = "Mật khẩu không được để trống";
            }

            return !error;
        }

        const handleLogin = () => {
            if (isValidData()) {
                data.email = email.value
                data.password = password.value
                api.login(data).then((response) => {
                    if (response) {
                        JwtService.saveToken(_.get(response, "data.data.access_token", ""))
                        getAuthUser()
                    }
                }).catch((error) => {
                    let errorMessage = _.get(error, "response.data.message") ?
                        _.get(error, "response.data.message") :
                        "Thông tin tài khoản hoặc mật khẩu không chính xác";
                    if (errorMessage && errorMessage.length > 0) {
                        ElMessage.error(errorMessage)
                    }
                });
            }
        }

        const getAuthUser = () => {
            api.getAuthUser().then(res => {
                let data = _.get(res, 'data')
                if (data) {
                    store.commit(`authModule/${Mutations.SET_AUTH}`, _.get(res, 'data.data'))
                    store.commit(`authModule/${Mutations.SET_LOGIN_STATUS}`, true)
                    router.push({ name: 'Home'})
                } else {
                    JwtService.saveToken("")
                    ElMessage.error("Thông tin tài khoản không hợp lệ")
                }
            })
        }
        /* Function::end */

        return {
            errorEmail,
            errorPassword,
            email,
            password,
            handleLogin,
            getAuthUser
        }
    }
};
</script>
<style lang="scss">
@import "@/assets/styles/scss/login/index";
</style>