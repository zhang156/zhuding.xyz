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
    nuxtServerInit (store, { req }) {
      var initData = [
        // 加载热门文章
        store.dispatch('loadHotArticles')
      ]

      return Promise.all(initData)
    },
    loadArticles ({ commit }, params = {page: 1}) {
      return Service.get('/article', { params }).then((res) => {
        // console.log(res.data.result.data[0])
        commit('loadArticles', res.data.result.data)
      })
    },
    loadHotArticles ({ commit }, params = {page: 1}) {
      return Service.get('/hotArticle', { params }).then((res) => {
        console.log(res.data.result.data)
        commit('loadHotArticles', res.data.result.data)
      })
    },
    loadArticleDetail ({ commit }, params) {
      return Service.get(`/article/${params.article_id}`).then((res) => {
        // console.log(res.data.result)
        commit('loadArticleDetail', res.data.result)
      })
    }
  },
  modules: {
    // 文章
    article: {
      state: {
        articleList: [],
        articleDetail: {},
        hotArticle: []
      },
      mutations: {
        loadArticles (state, param) {
          state.articleList = param
        },
        loadHotArticles (state, param) {
          state.hotArticle = param
        },
        loadArticleDetail (state, param) {
          state.articleDetail = param
        }
      }
    }
  }
})