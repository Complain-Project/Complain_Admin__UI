<template>
	<div id="admin" v-if="hasPermission('ADM-L')">
		<section class="action">
			<el-row class="action-wrap">
				<el-col :span="12" class="action-wrap--col">
					<Breadcrumb />
				</el-col>
				<el-col :span="12" class="action-wrap--col action-btn">
					<div class="action-wrap--col__btn">
						<el-button v-if="hasPermission('ADM-C')" @click="openModalAddAdmin()" class="btn-apply">
							<el-icon class="mr-[5px]">
								<CirclePlus />
							</el-icon>
							Tạo mới cán bộ
						</el-button>
					</div>
				</el-col>
			</el-row>
		</section>
		<div class="admin-main">
			<el-card class="list-admin">
				<div class="search-wrap">
					<el-row>
						<el-col class="input">
							<el-input class="input-search" :prefix-icon="Search" v-model="searchKey"
							          @clear="handleClear" @keydown.enter="handleSearch(1)"
							          clearable placeholder="Nhập vào tên, email hoặc số điện thoại để tìm kiếm">
							</el-input>
						</el-col>
					</el-row>
				</div>
				<el-table
					height="calc(68vh - 15px)"
					v-loading="loading"
					:data="admins"
					style="width: 100%">
					<el-table-column prop="name" label="Họ tên" fixed>
						<template #default="admin">
							<div class="flex items-center">
								<p class="admin-name">{{ admin.row.name }}</p>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="email" label="Email">
						<template #default="admin">
							<a :href="`mailto: ${admin.row.email}`" v-if="admin.row.email" class="decoration-none">
								{{ admin.row.email }}
							</a>
							<i v-else class="text-muted cursor-auto">Đang cập nhật</i>
						</template>
					</el-table-column>
					<el-table-column width="180px" prop="phone" label="Số điện thoại">
						<template #default="admin">
							<a :href="`tel: ${admin.row.phone}`" v-if="admin.row.phone" class="decoration-none">
								{{ admin.row.phone }}
							</a>
							<i v-else class="text-muted cursor-auto">Đang cập nhật</i>
						</template>
					</el-table-column>
					<el-table-column width="180px" label="Huyện" align="center">
						<template #default="admin">
							{{ admin.row.district?.name }}
						</template>
					</el-table-column>
					<el-table-column width="180px" label="Trạng thái" align="center">
						<template #default="admin">
							<el-switch v-if="authUserComputed._id !== admin.row._id && !admin.row.is_admin"
							           @change="changeStatus(admin.row.status, admin.row._id)"
							           v-model="admin.row.status" :disabled="!hasPermission('ADM-U')"
							           :inactive-value="0" :active-value="1"
							           active-color="#13ce66" inactive-color="#ff4949">
							</el-switch>
						</template>
					</el-table-column>
					<el-table-column width="220px" align="center" prop="action" label="Hành động"
					                 v-if="hasPermission('ADM-U') || hasPermission('ADM-DEL')">
						<template #default="admin">
							<div v-if="authUserComputed._id !== admin.row._id && !admin.row.is_admin">
								<el-tooltip v-if="hasPermission('ADM-U')" class="item" effect="dark"
								            content="Chỉnh sửa" placement="top">
									<a class="btn btnRecharge el-button el-button--primary"
									   @click="openModalUpdateAdmin(admin.row)">
										<el-icon>
											<EditPen />
										</el-icon>
									</a>
								</el-tooltip>
								<el-tooltip v-if="hasPermission('ADM-U')" class="item" effect="dark"
								            content="Đổi mật khẩu" placement="top">
									<a class="btn btnRecharge el-button el-button--success"
									   @click="openModalResetPassword(admin.row._id)">
										<el-icon>
											<Refresh />
										</el-icon>
									</a>
								</el-tooltip>
								<el-tooltip v-if="hasPermission('ADM-DEL')" class="item" effect="dark"
								            content="Xóa" placement="top">
									<a class="btn btnRecharge el-button el-button--danger"
									   @click="handleDeleteAdmin(admin.row._id)">
										<el-icon>
											<Delete />
										</el-icon>
									</a>
								</el-tooltip>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination-wrap" v-if="admins.length > 0">
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
							@current-change="handleChangeCurrentPage"
						>
						</el-pagination>
					</div>
				</div>
			</el-card>
		</div>
		<el-dialog
			width="35%"
			v-loading="loading"
			:title="modalTitle"
			v-model="iShowModalAdmin"
			class="modal-admin"
			:close-on-click-modal="false"
		>
			<el-row :gutter="24">
				<el-col :span="24">
					<div class="input-warp w-full">
						<label>Họ tên
							<span class="required">*</span>
						</label>
						<el-input v-model="name"></el-input>
						<div v-if="errorName !== '' " class="error">
							<span> {{ errorName }} </span>
						</div>
					</div>
					<div class="input-warp w-full">
						<label>Số điện thoại
							<span class="required">*</span>
						</label>
						<el-input v-model="phone"></el-input>
						<div v-if="errorPhone !== '' " class="error">
							<span> {{ errorPhone }} </span>
						</div>
					</div>
					<div class="input-warp w-full">
						<label>
							Email
							<span class="required">*</span>
						</label>
						<el-input v-model="email"></el-input>
						<div v-if="errorEmail !== '' " class="error">
							<span> {{ errorEmail }} </span>
						</div>
					</div>
					<div v-if="isModalAdd" class="input-warp w-full">
						<label>Mật khẩu <span class="required">*</span></label>
						<el-input type="password" v-model="password"></el-input>
						<div v-if="errorPassword !== '' " class="error">
							<span> {{ errorPassword }} </span>
						</div>
					</div>
					<div class="input-warp w-full">
						<label>Huyện
							<span class="required">*</span>
						</label>
						<el-cascader
							placeholder="Chọn huyện"
							class="inputWrap w-full"
							v-model="districtId"
							:options="districts"
							:props="{ multiple: false, value: '_id', label: 'name',checkStrictly: true, children: 'children', emitPath: false}"
							:show-all-levels="false"
							size="large"
							clearable>
							<template #default="item">
								{{ item.data.name }}
							</template>
						</el-cascader>
						<div v-if="errorDistrict !== '' " class="error">
							<span> {{ errorDistrict }} </span>
						</div>
					</div>
					<div class="input-warp w-full">
						<label>Vai trò</label>
						<el-cascader
							placeholder="Chọn vai trò"
							class="inputWrap w-full"
							v-model="roleIds"
							:options="roles"
							:props="{ multiple: true, value: '_id', label: 'name',checkStrictly: true, children: 'children', emitPath: false}"
							:show-all-levels="false"
							@change="selectParent"
							size="large"
							clearable>
							<template #default="item">
								{{ item.data.name }}
							</template>
						</el-cascader>
						<div v-if="errorRole !== '' " class="error">
							<span> {{ errorRole }} </span>
						</div>
					</div>
					<div class="input-warp mb-0">
						<label class="mb-1 d-block">Trạng thái: <span class="font-weight-bold">{{
								is_active ? "Kích hoạt" : "Khóa"
							}}</span></label>
						<el-switch
							v-model="is_active"
							:active-value="1"
							:inactive-value="0"
							active-color="#13ce66"
							inactive-color="#ff4949">
						</el-switch>
					</div>
				</el-col>
			</el-row>
			<template #footer>
				<el-button class="btn-close"
				           @click="closeModal()">Hủy
				</el-button>
				<el-button class="btn-apply"
				           @click="isModalAdd ? handleCreateAdmin() : handleUpdateAdmin()">
					Lưu
				</el-button>
			</template>
		</el-dialog>
		
		<el-dialog
			width="25%"
			v-loading="loading"
			:title="'Đổi mật khẩu cán bộ '"
			v-model="iShowModalChangePassword"
			class="modal-admin"
			:close-on-click-modal="false"
		>
			<el-row>
				<div class="input-warp w-full">
					<label>Mật khẩu mới <span class="required">*</span></label>
					<el-input type="password" v-model="password"></el-input>
					<div v-if="errorPassword !== '' " class="error">
						<span> {{ errorPassword }} </span>
					</div>
				</div>
				<div class="input-warp w-full">
					<label>Xác nhận mật khẩu mới <span class="required">*</span></label>
					<el-input type="password" v-model="passwordConfirm"></el-input>
					<div v-if="errorConfirmPassword !== '' " class="error">
						<span> {{ errorConfirmPassword }} </span>
					</div>
				</div>
			</el-row>
			<template #footer>
				<el-button class="btn-close"
				           @click="closeModal()">Hủy
				</el-button>
				<el-button class="btn-apply"
				           @click="handleResetPassword()">Lưu
				</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import { useStore } from "vuex";
import api from "@/utils/services/_api_service";
import _ from "lodash";
import { isValidEmail } from "@/utils/helpers/_email_helper";
import { isValidPhone } from "@/utils/helpers/_phone_helper";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import { useRouter } from "vue-router";
import { computed, watch, onMounted, ref, reactive, onBeforeMount } from "vue";
import { Mutations, Getters } from "@/store/enums/_type_enum";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";

export default {
	name: "EmployeeComponent",
	components: {
		Breadcrumb
	},
	setup: function() {
		const router = useRouter();
		const store = useStore();
		
		/* Variables::start */
		let admins = ref([]);
		let searchKey = ref("");
		let id = ref("");
		let name = ref("");
		let phone = ref("");
		let email = ref("");
		let password = ref("");
		let avatar = ref("");
		let fileUpload = ref(null);
		let passwordConfirm = ref("");
		let is_active = ref(1);
		let loading = ref(false);
		let page = reactive({
			currentPage: 1,
			pageSize: 10,
			total: 0
		});
		let iShowModalAdmin = ref(false);
		let iShowModalChangePassword = ref(false);
		let modalTitle = ref("");
		let errorName = ref("");
		let errorPhone = ref("");
		let errorEmail = ref("");
		let errorPassword = ref("");
		let errorConfirmPassword = ref("");
		let errorRole = ref("");
		let errorDistrict = ref("");
		let errorAvatar = ref("");
		let isModalAdd = ref(true);
		let viewSelected = ref(20);
		let views = reactive([
			{
				value: 20,
				label: "Hiển thị 20"
			},
			{
				value: 50,
				label: "Hiển thị 50"
			},
			{
				value: 100,
				label: "Hiển thị 100"
			}
		]);
		let roles = ref([]);
		let roleIds = ref([]);
		let districts = ref([]);
		let districtId = ref("");
		const userDefault = ref(require("@/assets/images/userDefault.png"));
		/* Variables::end */
		
		/* Lifecycle hooks::start */
		onBeforeMount(() => {
			if (!hasPermission("ADM-L")) {
				router.push({ name: "Error_403" });
			}
		});
		
		onMounted(() => {
			store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 2);
			store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
				{
					path: "/",
					name: "Trang Chủ"
				},
				{
					path: window.location.pathname,
					name: "Danh sách cán bộ"
				}
			]);
			getAdmins();
		});
		/* Lifecycle hooks::end */
		
		/* Computed::start */
		const authUserComputed = computed(() => store.state.authModule.authUser);
		/* Computed::end */
		
		/* Watch::start */
		watch(name, () => {
			errorName.value = "";
		});
		watch(email, () => {
			errorEmail.value = "";
		});
		watch(phone, () => {
			errorPhone.value = "";
		});
		watch(districtId, () => {
			errorDistrict.value = "";
		});
		watch(password, () => {
			errorPassword.value = "";
		});
		watch(passwordConfirm, () => {
			errorConfirmPassword.value = "";
		});
		/* Watch::end */
		
		/* Function::start */
		const openModalAddAdmin = () => {
			resetForm();
			resetError();
			modalTitle.value = "Tạo cán bộ";
			isModalAdd.value = true;
			iShowModalAdmin.value = true;
			getAllRoles();
			getAllDistricts();
		};
		
		const openModalUpdateAdmin = (admin) => {
			resetForm();
			resetError();
			if (admin) {
				id.value = _.get(admin, "_id");
				name.value = _.get(admin, "name", "");
				email.value = _.get(admin, "email", "");
				phone.value = _.get(admin, "phone", "");
				is_active.value = _.get(admin, "status");
				avatar.value = _.get(admin, "avatar");
				modalTitle.value = "Cập nhật cán bộ " + name.value;
				isModalAdd.value = false;
				iShowModalAdmin.value = true;
				roleIds.value = _.get(admin, "role_ids", []);
				districtId.value = _.get(admin, "district._id", "");
				getAllRoles();
				getAllDistricts();
			}
		};
		
		const openModalResetPassword = (val) => {
			resetForm();
			resetError();
			id.value = val;
			isModalAdd.value = false;
			iShowModalChangePassword.value = true;
		};
		const closeModal = () => {
			resetForm();
			iShowModalAdmin.value = false;
			iShowModalChangePassword.value = false;
		};
		
		const handleSearch = (data = null) => {
			let payload = {};
			if (searchKey.value.length > 0) {
				payload.q = searchKey.value;
			}
			
			if (data) {
				payload.page = data;
			} else {
				payload.page = page.currentPage;
			}
			
			getAdmins(payload);
		};
		
		const handleCreateAdmin = () => {
			if (validateCreateData()) {
				let data = {
					"name": name.value,
					"phone": phone.value,
					"email": email.value,
					"password": password.value,
					"role_ids": roleIds.value,
					"district_id": districtId.value,
					"status": Number(is_active.value)
				};
				
				api.createAdmin(data).then(() => {
					ElMessage({
						message: "Thêm mới cán bộ thành công !",
						type: "success"
					});
					
					getAdmins();
					closeModal();
					resetForm();
				}).catch((error) => {
					returnError(error);
				});
				searchKey.value = "";
			}
		};
		
		const handleUpdateAdmin = () => {
			if (isValidDataEdit()) {
				let data = {
					"name": name.value,
					"phone": phone.value,
					"email": email.value,
					"password": password.value,
					"role_ids": roleIds.value,
					"district_id": districtId.value,
					"status": Number(is_active.value)
				};
				api.updateAdmin(data, id.value).then(() => {
					ElMessage({
						message: "Cập nhật cán bộ thành công !",
						type: "success"
					});
					getAdmins();
					resetForm();
					closeModal();
				}).catch(error => {
					returnError(error);
				});
			}
		};
		
		const returnError = (error) => {
			let status = _.get(error, "response.statusCode");
			let errors = _.get(error.response, "data.errors", {});
			if (Object.keys(errors).length > 0) {
				errorName.value = _.get(errors, "name[0]", "");
				errorEmail.value = _.get(errors, "email[0]", "");
				errorPassword.value = _.get(errors, "password[0]", "");
				errorPhone.value = _.get(errors, "phone[0]", "");
			} else if (status === 401) {
				router.push({ name: "Login" });
			} else if (status === 403) {
				router.push({ name: "Home", params: { errorPermission: "true" } });
			} else {
				ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!");
			}
		};
		
		const handleResetPassword = () => {
			if (isValidPassword()) {
				let data = {
					password: password.value,
					confirm_password: passwordConfirm.value
				};
				api.resetPasswordAdmin(data, id.value).then(() => {
					ElMessage({
						message: "Cập nhật thành công!",
						type: "success"
					});
					
					resetForm();
					closeModal();
				}).catch(error => {
					let status = _.get(error, "response.data.code");
					if (status === 404) {
						let errorMessage = _.get(error, "response.data.error.error_user") ? _.get(error, "response.data.error.error_user") : "";
						if (errorMessage && errorMessage.length > 0) {
							ElMessage.error(errorMessage[0]);
						}
					} else {
						let errors = _.get(error.response, "data.error", {});
						if (Object.keys(errors).length > 0) {
							errorPassword = _.get(errors, "password[0]", "");
						}
					}
				});
			}
		};
		
		const handleClear = () => {
			searchKey.value = "";
			handleSearch(1);
		};
		
		const getAdmins = (params = {}) => {
			loading.value = true;
			params.per_page = viewSelected.value;
			api.getAdmins(params).then((res) => {
				page.currentPage = _.get(res, "data.data.current_page");
				page.pageSize = parseInt(_.get(res, "data.data.per_page"));
				page.total = _.get(res, "data.data.total", 0);
				admins.value = _.get(res, "data.data.data");
				loading.value = false;
			}).catch(() => {
				ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!");
			});
		};
		
		const changeStatus = (status, id) => {
			let data = {
				status: status
			};
			api.changeStatusAdmin(data, id).then(() => {
				ElMessage({
					message: "Cập nhật trạng thái thành công!",
					type: "success"
				});
				
				getAdmins();
			}).catch((error) => {
				let status = _.get(error, "response.date.code");
				if (status === 404) {
					let errorMessage = _.get(error, "response.data.error.error_user") ? _.get(error, "response.data.error.error_user") : "";
					if (errorMessage && errorMessage.length > 0) {
						ElMessage.error(errorMessage[0]);
					}
				}
				if (status === 401) {
					router.push({ name: "Login" });
				}
			});
		};
		
		const handleDeleteAdmin = (id) => {
			ElMessageBox.confirm(
				"Dữ liệu đã xóa không thể phục hồi! Bạn có muốn tiếp tục?",
				"Cảnh báo",
				{
					confirmButtonText: "Xóa",
					cancelButtonText: "Hủy",
					type: "warning",
					confirmButtonClass: "btn-delete",
					cancelButtonClass: "btn-close"
				}
			).then(() => {
				api.deleteAdmin(id).then(() => {
					ElMessage({
						message: "Xóa cán bộ thành công !",
						type: "success"
					});
					handleChangeCurrentPage(page.currentPage);
				}).catch((error) => {
					let errorMessage = _.get(error, "response.data.error.error_user") ? _.get(error, "response.data.error.error_user") : "Có lỗi xảy ra, vui lòng thử lại sau!";
					if (errorMessage && errorMessage.length > 0) {
						ElMessage.error("errorMessage[0]");
					}
				});
			});
			
		};
		
		const handleChangeCurrentPage = (page) => {
			handleSearch(page);
		};
		
		const validateCreateData = () => {
			let error = false;
			if (!isValidDataEdit()) {
				error = true;
			}
			if (password.value.length < 6) {
				error = true;
				errorPassword.value = "Mật khẩu phải từ 6 ký tự";
			}
			if (password.value.length === 0) {
				error = true;
				errorPassword.value = "Mật khẩu không được để trống";
			}
			return !error;
		};
		const isValidPassword = () => {
			let error = false;
			resetError();
			if (password.value.length < 6) {
				error = true;
				errorPassword.value = "Mật khẩu phải từ 6 ký tự";
			}
			if (password.value.length === 0) {
				error = true;
				errorPassword.value = "Mật khẩu không được để trống";
			} else {
				if (passwordConfirm.value.length === 0) {
					error = true;
					errorConfirmPassword.value = "Xác nhận mật khẩu không được để trống";
				} else if (password.value !== passwordConfirm.value && !isModalAdd.value) {
					error = true;
					errorConfirmPassword.value = "Mật khẩu không trùng khớp";
				}
			}
			return !error;
		};
		
		const isValidDataEdit = () => {
			let error = false;
			resetError();
			if (name.value.length === 0) {
				error = true;
				errorName.value = "Họ tên không được để trống";
			}
			if (!isValidEmail(email.value)) {
				error = true;
				errorEmail.value = "Email sai định dạng, vui lòng nhập lại";
			}
			if (email.value.length === 0) {
				error = true;
				errorEmail.value = "Email không được để trống";
			}
			if (phone.value.length === 0) {
				error = true;
				errorPhone.value = "Số điện thoại không được để trống";
			}
			if (phone.value.length > 0 && !isValidPhone(phone.value)) {
				error = true;
				errorPhone.value = "Số điện thoại sai định dạng, vui lòng nhập lại";
			}
			if (!districtId.value) {
				error = true;
				errorDistrict.value = "Huyện không được để trống";
			}
			return !error;
		};
		const resetForm = () => {
			id.value = "";
			name.value = "";
			email.value = "";
			phone.value = "";
			password.value = "";
			passwordConfirm.value = "";
			is_active.value = 1;
			roleIds.value = [];
			districtId.value = "";
		};
		
		const getAllRoles = () => {
			api.getAllRoles().then((res) => {
				roles.value = _.get(res, "data.data", []);
			}).catch((error) => {
				let messageError = _.get(error.response, "data.message");
				ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!");
			});
		};
		const getAllDistricts = () => {
			api.getAllDistricts().then((res) => {
				districts.value = _.get(res, "data.data", []);
			}).catch((error) => {
				let messageError = _.get(error.response, "data.message");
				ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!");
			});
		};
		const resetError = () => {
			errorName.value = "";
			errorEmail.value = "";
			errorPhone.value = "";
			errorPassword.value = "";
			errorConfirmPassword.value = "";
			errorRole.value = "";
			errorDistrict.value = "";
			errorAvatar.value = "";
		};
		
		const handleChangeAvatar = (file) => {
			let fileTypes = [
				"image/jpg",
				"image/jpeg",
				"image/png",
				"image/JPG",
				"image/JPEG",
				"image/PNG",
				"image/gif"
			];
			
			let fileType = fileTypes.includes(file.raw.type);
			let fileSize = file.size / 1024 / 1024 < 2.048;
			
			if (!fileType) {
				errorAvatar.value = "";
				ElMessage.error("Ảnh đại diện không đúng định dạng. Chỉ hỗ trợ định dạng jpg, jpeg, png, gif.");
			}
			if (!fileSize) {
				errorAvatar.value = "";
				ElMessage.error("Kích thước ảnh đại diện không được vượt quá 2MB.");
			}
			
			if (fileType && fileSize) {
				fileUpload.value = file.raw;
				avatar.value = URL.createObjectURL(file.raw);
			}
		};
		const handleRemoveAvatar = () => {
			fileUpload.value = "";
			avatar.value = "";
		};
		
		const selectParent = () => {
		
		};
		const hasPermission = (per) => {
			return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per);
		};
		
		/* Function::end */
		
		return {
			admins,
			searchKey,
			id,
			name,
			phone,
			email,
			password,
			avatar,
			passwordConfirm,
			is_active,
			loading,
			page,
			iShowModalAdmin,
			iShowModalChangePassword,
			isModalAdd,
			modalTitle,
			errorName,
			errorPhone,
			errorEmail,
			errorPassword,
			errorConfirmPassword,
			errorRole,
			errorDistrict,
			errorAvatar,
			views,
			viewSelected,
			roles,
			roleIds,
			districts,
			districtId,
			authUserComputed,
			Search,
			userDefault,
			fileUpload,
			openModalAddAdmin,
			openModalUpdateAdmin,
			openModalResetPassword,
			handleCreateAdmin,
			handleUpdateAdmin,
			handleResetPassword,
			handleClear,
			changeStatus,
			handleDeleteAdmin,
			closeModal,
			handleSearch,
			handleChangeCurrentPage,
			selectParent,
			hasPermission,
			handleChangeAvatar,
			handleRemoveAvatar
		};
	}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/employee/index.scss";
</style>
