import {createApp} from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/assets/styles/app.css"
import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import InlineSvg from 'vue-inline-svg';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus)
app.component('inline-svg', InlineSvg);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount("#app");
