const state = {
  breadCrumb: "Tích điểm nhận quà"
}

const mutations = {
  setBreadCrumb(state, obj) {
    state.breadCrumb = obj
  }
}

const actions = {
  updateBreadcrumb({commit}, obj) {
    commit('setBreadCrumb', obj)
  }
}

const getters = {
  getBreadCrumb(state) {
    return state.breadCrumb
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};