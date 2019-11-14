import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.use(require("vue-moment"));

//TODO - reseach a good library that will contain all the filters we need
//https://gist.github.com/kkiernan/7475b615485344f2fdf3
Vue.filter("phone", function(phone) {
  return phone.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
});

//https://stackoverflow.com/questions/43208012/how-do-i-format-currencies-in-a-vue-component
Vue.filter("currency", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});
