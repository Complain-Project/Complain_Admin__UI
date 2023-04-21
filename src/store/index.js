import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";
import layoutModule from "@/store/modules/_layout_module";
import authModule from "@/store/modules/_auth_module";
import homeModule from "@/store/modules/_home_module";

const store = createStore({
	modules: {
		layoutModule,
		authModule,
		homeModule
	},
	plugins: [
		createPersistedState({
			paths: ["layoutModule"]
		})
	],
});

export default store;
