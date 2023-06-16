import AuthApi from "@/api/AuthApi";
import {AuthUtils} from "@/utils/localStorageUtils";
const state = {
    token: AuthUtils.getToken(),
    user: null
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERINFO: (state, user) => {
        state.user = user
    },
    CLEAR_USERINFO: (state) => {
        state.token = null
        state.user = {}
    }
}

const actions = {
    login: async ({ commit }, data) => {
        try {
            const res = await AuthApi.login(data)
            const {token, ...user} = res.data.data

            commit("SET_USERINFO", user)
            commit("SET_TOKEN", token)
            AuthUtils.setToken(token)
            return true
        }
        catch (e) {
            return false
        }
    },
    logout: async ({ dispatch }) => {
        dispatch('clearUser')
    },
    clearUser: ({ commit }) => {
        commit('CLEAR_USERINFO')
        AuthUtils.removeToken()
    },
    async getAuthInfo({commit, dispatch}) {
        try {
            const res = await AuthApi.getAuthInfo()
            commit('SET_USERINFO', res.data.data)
        } catch (e) {
            dispatch("clearUser")
        }
    }
}

const getters = {
    getUserInfo: (state) => state.user,
    uid: (state) => state.user.id,
    username: (state) => state.user.name,
    email: (state) => state.user.email,
    avatarUrl : (state) => state.user.avatarUrl,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
