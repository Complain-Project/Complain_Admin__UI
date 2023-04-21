import JwtService from "@/utils/services/_jwt_service";
import {Mutations, Actions, Getters} from "@/store/enums/_type_enum";
import api from "@/utils/services/_api_service";
import router from "@/router";

export default {
	namespaced: true,
	
	state: () => ({
		authUser: {},
		isAuthenticated: !!JwtService.getToken(),
	}),
	
	getters: {
		[Getters.HAS_PERMISSION]: (state) => (permission) => {
			if (state.authUser.permissions) {
				return state.authUser.permissions.find(e => e === permission || e === "ROOT")
			}
		},
	},
	
	actions: {
		async [Actions.LOGOUT]({commit}) {
			await api.logout();
			commit(Mutations.SET_LOGIN_STATUS, false)
			commit(Mutations.SET_AUTH, {})
			JwtService.destroyToken()
			return router.push({name: "Login"})
		}
	},
	
	mutations: {
		[Mutations.SET_AUTH] (state, authUser) {
			state.authUser = authUser
		},
		[Mutations.SET_LOGIN_STATUS] (state, isAuthenticated) {
			state.isAuthenticated = isAuthenticated
		},
	}
}