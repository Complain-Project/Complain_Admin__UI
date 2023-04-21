import {Mutations} from "@/store/enums/_type_enum";

export default {
    namespaced: true,

    state: () => ({
        title: 'Tổng Quan',
        prevRoute: null,
        breadcrumb: [{
            path: '',
            name: 'Tổng Quan'
        }],
        isLogin: false,
    }),

    getters: {},

    actions: {},

    mutations: {
        [Mutations.SET_TITLE](state, data) {
            state.title = data
        },
        [Mutations.SET_BREADCRUMB](state, data) {
            state.breadcrumb = data
        },
        [Mutations.SET_IS_LOGIN](state, data) {
            state.isLogin = data
        },
    }
}