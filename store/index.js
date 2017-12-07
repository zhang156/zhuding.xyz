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
    // 获取文章列表
    loadArticles ({ commit }, params = {page: 1}) {
      commit('requestStart')
      return Service.get('/article', { params }).then((res) => {
        commit('requestEnd')
        commit('loadArticles', res.data.result.data)
      })
    },
    // 获取热点文章
    loadHotArticles ({ commit }, params = {page: 1}) {
      return Service.get('/hotArticle', { params }).then((res) => {
        // console.log(res.data.result.data)
        commit('loadHotArticles', res.data.result.data)
      })
    },
    // 获取文章详情
    loadArticleDetail ({ commit }, params) {
      return Service.get(`/article/${params.article_id}`).then((res) => {
        // console.log(res.data.result)
        commit('loadArticleDetail', res.data.result)
      })
    },
    // 获取标签
    loadTags ({ commit }) {
      return Service.get('/tags').then(res => {
        var success = res.status && res.data && res.data.code
        if (success) {
          commit('tag/loadTags', res.data.result)
          commit('tag/reqSuccess')
        } else {
          commit('tag/reqFail')
        }
      })
    },
    // 获取类别
    loadCategory ({ commit }) {
      return Service.get('/category').then(res => {
        commit('category/loadCategory', res.data.result)
      })
    }
  },
  modules: {
    // 文章
    article: {
      state: {
        articleList: [],
        articleDetail: {},
        hotArticle: [],
        fetching: false
      },
      mutations: {
        requestStart (state) {
          state.fetching = true
        },
        requestEnd (state) {
          state.fetching = false
        },
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
    },
    // 标签
    tag: {
      namespaced: true,
      state: {
        tags: [],
        fetching: false
      },
      mutations: {
        loadTags (state, param) {
          state.tags = param
        },
        addTag (state, param) {
          state.tags.push(param)
        },
        reqStart (state) {
          state.fetching = true
        },
        reqSuccess (state) {
          state.fetching = false
        },
        reqFail (state) {
          state.fetching = false
        }
      }
    },
    // 类别
    category: {
      namespaced: true,
      state: {
        category: []
      },
      mutations: {
        loadCategory (state, param) {
          state.category = param
        },
        addCategory (state, param) {
          state.category.push(param)
        }
      }
    }
  }
})