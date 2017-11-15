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
    loadArticles ({ commit }, params = {page: 1}) {
      return Service.get('/article', { params }).then((res) => {
        console.log(res.data.result.data[0])
        commit('loadArticles', res.data.result.data)
      })
    }
  },
  modules: {
    // 文章
    article: {
      state: {
        articleList: []
      },
      mutations: {
        loadArticles (state, param) {
          state.articleList = param
        }
      }
    }
  }
})