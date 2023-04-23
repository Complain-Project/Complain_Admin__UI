import {createApp} from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/assets/styles/app.css"
import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import InlineSvg from 'vue-inline-svg';
import locale from 'element-plus/lib/locale/lang/vi'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus, { locale })
app.component('inline-svg', InlineSvg);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount("#app");
