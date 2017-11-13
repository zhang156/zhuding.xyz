import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment (state, param) {
        state.counter = param
    }
  },
  actions: {
    increment ({ commit }) {
      commit('updateArticleList', [1,2,3,4])
    }
  },
  modules: {
    article: {
      state: {
        articleList: []
      },
      mutations: {
        updateArticleList (state, param) {
          state.articleList = param
        }
      }
    }
  }
})