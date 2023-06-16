const state = {
  selectedPoint: null,
  searchByPoint: null,
  deletePoint: 0,
  deleteSearchBlock: 0,
  searchByLevel: 0
}

const mutations = {
  setPoint(state, obj) {
    state.selectedPoint = obj
  },
  setSearchByPoint(state, point) {
    state.searchByPoint = point
  },
  setDeletePoint(state, point) {
    state.deletePoint = point
  },
  setDeleteSearchBlock(state, point) {
    state.deleteSearchBlock = point
  },
  setSearchByLevel(state, point) {
    state.searchByLevel = point
  }
}

const actions = {
  updatePointSelected({ commit }, obj) {
    commit('setPoint', obj)
  },
  updateSearchByPoint({ commit }, point) {
    commit('setSearchByPoint', point)
  },
  updateDeletePoint({ commit }, point) {
    commit('setDeletePoint', point)
  },
  updateDeleteSearchBlock({ commit }, point) {
    commit('setDeleteSearchBlock', point)
  },
  updateSearchByLevel({ commit }, point) {
    commit('setSearchByLevel', point)
  }
}

const getters = {
  getPointSelected(state) {
    return state.selectedPoint
  },
  getSearchByPoint(state) {
    return state.searchByPoint
  },
  getDeletePoint(state) {
    return state.deletePoint
  },
  getDeleteSearchBlock(state) {
    return state.deleteSearchBlock
  },
  getSearchByLevel(state) {
    return state.searchByLevel
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
