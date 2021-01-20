import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./axios";
import store from "./store";
import "./style/normalize.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Tinymce from "@/components/tinymce/index.vue";
import uploadImg from "@/components/uploadImg/index.vue";
import titleCom from "@/components/titleCom/index.vue";
import comRadio from "@/components/comRadio/index.vue";
Vue.prototype.$bus = new Vue();
Vue.prototype.$http = axios;
Vue.component("tinymce", Tinymce);
Vue.component("titleCom", titleCom);
Vue.component("uploadImg", uploadImg);
Vue.component("comRadio", comRadio);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
