import {Mutations} from "@/store/enums/_type_enum";

export default {
	namespaced: true,

	state: () => ({
		activeMenu: 6,
		collapseSidebar: false,
		drawer: false
	}),

	getters: {},

	actions: {},

	mutations: {
		[Mutations.SET_ACTIVE_MENU](state, index) {
			state.activeMenu = index;
		},

		[Mutations.SET_COLLAPSE_SIDEBAR](state, value) {
			state.collapseSidebar = value;
		},

		[Mutations.SET_COLLAPSE_PROFILE](state, value) {
			state.drawer = value;
		},

	}
}