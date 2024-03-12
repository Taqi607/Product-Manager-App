import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VeeValidate);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");

console.log("checking ", process.env.NODE_ENV);
console.log("checking test", process.env.BASE_URL);
