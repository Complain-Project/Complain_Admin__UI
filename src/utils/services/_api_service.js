import axios from "axios";
import JwtService from "@/utils/services/_jwt_service";
import router from "@/router";
import store from "@/store";
import {Mutations} from "@/store/enums/_type_enum";

const baseUrl = process.env.VUE_APP_BASE_URL;
export const apiAxios = axios.create({
	baseURL: `${baseUrl}/api`,
	headers: {
		post: {
			'Content-Type': 'application/json'
		}
	}
});

apiAxios.interceptors.request.use(function (config) {
	let token = JwtService.getToken()
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});

apiAxios.interceptors.response.use(undefined, (error) => {
	if (error) {
		if (error.response.status === 401 && router.currentRoute.value.name !== 'Login') {
			store.commit(`authModule/${Mutations.SET_LOGIN_STATUS}`, false)
			store.commit(`authModule/${Mutations.SET_AUTH}`, {})
			JwtService.destroyToken()

			return router.push({name: 'Login'})
		} else if (error.response.status === 403) {
			return router.push({name: 'Error_403'})
		}
	}
	return Promise.reject(error);
})

export default {
	/* auth::start */
	getAuthUser() {
		return apiAxios({
			method: 'post',
			url: 'admins/self/me'
		})
	},
	login(data) {
		return apiAxios({
			method: 'post',
			url: 'admins/auth/sign-in',
			data: data
		})
	},
	logout() {
		return apiAxios({
			method: 'post',
			url: 'admins/self/logout'
		})
	},
	updateInfoAdmin(data) {
		return apiAxios({
			method: 'post',
			url: 'admin/auth/update-info',
			data: data,
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})
	},
	changeAuthPassword(data) {
		return apiAxios({
			method: 'post',
			url: 'admin/auth/change-password',
			data: data
		})
	},
	/* auth::end */

	/* Admin::start */
	getAdmins(params) {
		return apiAxios({
			method: 'get',
			url: 'admins/employees',
			params: params
		})
	},
	createAdmin(data) {
		return apiAxios({
			method: 'post',
			url: 'admins/employees',
			data: data,
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})
	},
	updateAdmin(data, id) {
		return apiAxios({
			method: 'post',
			url: 'admins/employees/' + id,
			data: data,
			headers: {
				"Content-Type": "multipart/form-data",
			}
		})
	},
	deleteAdmin(id) {
		return apiAxios({
			method: 'delete',
			url: 'admins/employees/' + id
		})
	},
	changeStatusAdmin(data, id) {
		return apiAxios({
			method: 'patch',
			url: 'admins/employees/update-status/' + id,
			data: data
		})
	},
	resetPasswordAdmin(data, id) {
		return apiAxios({
			method: 'patch',
			url: 'admins/employees/reset-password/' + id,
			data: data
		})
	},
	getAllRoles() {
		return apiAxios({
			method: 'post',
			url: 'admins/roles/all'
		})
	},
	/* Admin::end */

	/* Role::start */
	getRoles(params) {
		return apiAxios({
			method: "get",
			url: "admins/roles",
			params: params
		})
	},
	getRolesAction(data) {
		return apiAxios({
			method: "post",
			url: "admins/roles/action",
			data: data
		})
	},
	createRole(data) {
		return apiAxios({
			method: "post",
			url: "admins/roles",
			data: data
		})
	},
	updateRole(data, id) {
		return apiAxios({
			method: "patch",
			url: "admins/roles/" + id,
			data: data
		})
	},
	deleteRole(id) {
		return apiAxios({
			method: "delete",
			url: "admins/roles/" + id
		})
	},
	getPermissionTypes(){
		return apiAxios({
			method: "get",
			url: "admins/roles/permission-types"
		})
	},
	getListPermission(){
		return apiAxios({
			method: "get",
			url:`admins/permissions`
		})
	},
	getAdminsRole(params, id){
		return apiAxios({
			method: "get",
			url: `admins/roles/${id}/employees`,
			params: params
		})
	},
	updateRoleForAdmins(data, id){
		return apiAxios({
			method: "post",
			url: `admins/roles/update-role-for-employees/${id}`,
			data: data
		})
	},
	updatePermissionForRole(id, data){
		return apiAxios({
			method: "patch",
			url: `admins/roles/sync-permissions/${id}`,
			data: data
		})
	},

	/* Role::end */

	/* User::start */
	getListCustomers(params) {
		return apiAxios({
			method: "get",
			url: 'admins/users',
			params: params
		})
	},
	getDetailCustomer(id) {
		return apiAxios({
			method: "get",
			url: `admins/users/${id}`
		})
	},
	getListLaSo(params, id) {
		return apiAxios({
			method: "get",
			url: `admins/la-so-tu-vi/user/${id}`,
			params: params
		})
	},
	createCustomer(data) {
		return apiAxios({
			method: "post",
			url: "admins/users",
			data: data
		})
	},
	updateCustomer(data, id) {
		return apiAxios({
			method: "put",
			url: `admins/users/${id}`,
			data: data
		})
	},
	updateCustomerStatus(data, id) {
		return apiAxios({
			method: "patch",
			url: `admins/users/update-status/${id}`,
			data: data
		})
	},
	updateCustomerPassword(data, id) {
		return apiAxios({
			method: "patch",
			url: `admins/users/reset-password/${id}`,
			data: data
		})
	},
	deleteCustomer(id) {
		return apiAxios({
			method: "delete",
			url: `admins/users/${id}`
		})
	},
	detailLaSo(id){
		return apiAxios({
			method: "get",
			url: `admins/la-so-tu-vi/${id}`
		})
	},
	/* User::end */

	createLaSoTuVi(data) {
		return apiAxios({
			method: 'post',
			url: 'la-so-tu-vi/lap-la-so',
			data: data
		})
	},

}
