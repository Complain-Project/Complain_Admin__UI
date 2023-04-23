import {createRouter, createWebHistory} from "vue-router";
import Home from '@/views/Home.vue'
import store from "@/store";
import api from "@/utils/services/_api_service";
import _ from "lodash";
import {Mutations} from "@/store/enums/_type_enum";

const routes = [
	/* Tổng quan */
	{
		path: '/',
		name: 'Home',
		component: Home
	},

	/* Đăng nhập */
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/auth/Login.vue')
	},

	/* Lá số tử vi */
	{
		path: '/la-so-tu-vi/:idUser/:idLaSo',
		name: 'LaSoTuVi',
		component: () => import('@/views/laSoTuVi/LaSoTuVi.vue')
	},

	/* errors */
	{
		path: '/403',
		name: 'Error_403',
		component: () => import('@/views/errors/403')
	},

	/* Admin */
	{
		path: '/employees',
		name: 'Employee',
		component: () => import('@/views/employee/Employee.vue')
	},

	/* Nhóm tài khoản */
	{
		path: '/roles',
		name: 'Role',
		component: () => import('@/views/roles/Role.vue')
	},

	/* Khách hàng */
	{
		path: '/customers',
		name: 'CustomerComponent',
		component: () => import('@/views/customer/Customer.vue')
	},
	{
		path: '/customer/:id',
		name: 'DetailCustomer',
		component: () => import('@/views/customer/DetailCustomer.vue')
	},

	/* Khiếu nại*/
	{
		path: '/complains',
		name: 'Complain',
		component: () => import('@/views/complains/Complain.vue')
	},
	{
		path: '/complain/:id',
		name: 'DetailComplain',
		component: () => import('@/views/complains/DetailComplain.vue')
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach(async (to, from, next) => {
	if (to.name === 'Login') {
		if (store.state.authModule.isAuthenticated) {
			next({name: "Home"});
		} else {
			next();
		}
	} else {
		if (!store.state.authModule.isAuthenticated) {
			await next({name: 'Login'})
		} else {
			await api.getAuthUser().then((res) => {
				store.commit(`authModule/${Mutations.SET_AUTH}`, _.get(res, 'data.data'))
				next();
			}).catch(() => {
				next({name: 'Login'})
			})
		}
	}
	store.state.homeModule.prevRoute = from
})

export default router
