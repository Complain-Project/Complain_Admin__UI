<template>
	<section id="login-main" class="relative flex justify-center items-center w-screen h-screen">
		<img class="absolute inset-0 w-screen h-screen object-cover"
		     src="https://colorlib.com/etc/lf/Login_v9/images/bg-01.jpg" alt="">
		<div class="flex overflow-hidden bg-white rounded-md pb-8">
			<div class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div class="w-full max-w-xl mx-auto lg:w-96">
					<div>
						<h2 class="mt-6 text-3xl font-extrabold text-center">Hệ thống quản lý</h2>
					</div>
					
					<div class="mt-8">
						<div class="mt-6">
							<form class="space-y-6">
								<div>
									<label for="email" class="block font-medium text-base">
										Email
									</label>
									<div class="mt-1">
										<input
											v-model="email" @keyup.enter="handleLogin()"
											id="email" name="email" type="email" autocomplete="off" required=""
											placeholder="Nhập địa chỉ email"
											class="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
										
										<div v-if="errorEmail !== ''" class="error text-red-600 mt-1">
											<span> {{ errorEmail }} </span>
										</div>
									</div>
								</div>
								
								<div class="space-y-1">
									<label for="password" class="block font-medium text-base">
										Mật khẩu
									</label>
									<div class="mt-1">
										<input
											v-model="password" @keyup.enter="handleLogin()"
											id="password" name="password" type="password"
											autocomplete="off" required="" placeholder="Nhập mật khẩu"
											class="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
										
										<div v-if="errorPassword !== ''" class="error text-red-600 mt-1">
											<span> {{ errorPassword }} </span>
										</div>
									</div>
								</div>
								
								<div>
									<button
										@click="handleLogin()"
										type="button"
										class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-[#ef305e] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
										Đăng nhập
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
import api from "@/utils/services/_api_service";
import { isValidEmail } from "@/utils/helpers/_email_helper";
import _ from "lodash";
import { watch, onMounted, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import JwtService from "@/utils/services/_jwt_service";
import { Mutations } from "@/store/enums/_type_enum";
import { useStore } from "vuex";

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
				ElMessage.error("Tài khoản bị khóa!");
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
		};
		
		const handleLogin = () => {
			if (isValidData()) {
				data.email = email.value;
				data.password = password.value;
				api.login(data).then((response) => {
					if (response) {
						JwtService.saveToken(_.get(response, "data.data.access_token", ""));
						getAuthUser();
					}
				}).catch((error) => {
					let errorMessage = _.get(error, "response.data.message") ?
						_.get(error, "response.data.message") :
						"Thông tin tài khoản hoặc mật khẩu không chính xác";
					if (errorMessage && errorMessage.length > 0) {
						ElMessage.error(errorMessage);
					}
				});
			}
		};
		
		const getAuthUser = () => {
			api.getAuthUser().then(res => {
				let data = _.get(res, "data");
				if (data) {
					store.commit(`authModule/${Mutations.SET_AUTH}`, _.get(res, "data.data"));
					store.commit(`authModule/${Mutations.SET_LOGIN_STATUS}`, true);
					router.push({ name: "Home" });
				} else {
					JwtService.saveToken("");
					ElMessage.error("Thông tin tài khoản không hợp lệ");
				}
			});
		};
		/* Function::end */
		
		return {
			errorEmail,
			errorPassword,
			email,
			password,
			handleLogin,
			getAuthUser
		};
	}
};
</script>
<style lang="scss">
@import "@/assets/styles/scss/login/index.scss";
</style>