/* eslint global-require: 0 */
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import main from "../main";
import criteriaGroup from "@/stores/modules/criteria-group";
import gifts from "@/stores/modules/gifts";
import users from "@/stores/modules/users";
import auth from "@/stores/modules/auth";
import criterion from "@/stores/modules/criterion";
import point from "@/stores/modules/point";
import giftsExchange from "@/stores/modules/gifts-exchange";
import pointUser from "@/stores/modules/point-user";
import pointsExchange from "@/stores/modules/points-exchange";
import filterPoint from "@/stores/modules/filter-point";
import breadcrumb from "@/stores/modules/breadcrumb";
const store = new Vuex.Store({
  modules: {
    auth,
    criteriaGroup,
    criterion,
    gifts,
    point,
    users,
    giftsExchange,
    pointsExchange,
    pointUser,
    filterPoint,
    breadcrumb
  },
  plugins: [createPersistedState()],

  mutations : {
    SET_LANG (state, payload) {
      // app.vm.locale = payload
      console.log(main)
    }
  },

  actions : {
    setLang({commit}, payload) {
      commit('SET_LANG', payload)
    }
  }
});

export default store;