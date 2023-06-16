const state = {
  objectData: null,
};

const mutations = {
  setPoint(state, obj) {
    state.objectData = obj;
  }
};

const actions = {
  updatePoint({ commit }, obj) {
    commit('setPoint', obj);
  }
};

const getters = {
  getPoint(state) {
    return state.objectData;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
