
import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/App.vue'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    return: {
      workStep: 1,
    }
  },

  mutations : {
    SET_LANG (state, payload) {
      localStorage.setItem("language",payload)
    }
  },

  actions : {
    setLang({commit}, payload) {
      commit('SET_LANG', payload)
    }
  }
});
