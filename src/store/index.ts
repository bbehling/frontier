import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: []
  },
  mutations: {
    setAccounts(state, accounts) {
      state.accounts = accounts;
    }
  },
  actions: {
    fetchAccounts(store) {
      return axios.get("https://frontiercodingtests.azurewebsites.net/api/accounts/getall").then(response => {
        store.commit("setAccounts", response.data);
        return store.state.accounts;
      });
    }
  },
  modules: {}
});
