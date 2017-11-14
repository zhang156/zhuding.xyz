import Vue from 'vue'
import Vuex from 'vuex'
import Service from '../plugins/axios'

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
      Service.get('/article', (res) => {
        commit('updateArticleList', res.data)
      })
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