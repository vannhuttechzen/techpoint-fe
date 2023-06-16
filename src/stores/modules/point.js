import PointApi from "@/api/PointApi";

const state = {
  selfPointInfo: {},
  top10: []
}

const mutations = {
  SET_SELF_POINT_INFO(state, selfPointInfo) {
    state.selfPointInfo = selfPointInfo
  },
  SET_TOP_10(state, top10) {
    state.top10 = top10
  }
}

const actions = {
  async fetchSelfPointInfo({commit}) {
    try {
      const res = await PointApi.getSelfPoint()
      commit('SET_SELF_POINT_INFO', res.data.data)
    } catch (e) {
    }
  },
  async fetchTop10({commit}) {
    try {
      const res = await PointApi.getTop10()
      commit('SET_TOP_10', res.data.data)
    } catch {}
  }
}

const getters = {
  getSelfPointInfo: (state) => state.selfPointInfo,
  getTop10: (state) => state.top10
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
