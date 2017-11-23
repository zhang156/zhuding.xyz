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
      return Service.get('/article', { params }).then((res) => {
        // console.log(res.data.result.data[0])
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
          commit('loadTags', res.data.result)
        } else {
          commit('loadTagsFail')
        }
      })
    },
    // 获取类别
    loadCategory ({ commit }) {
      return Service.get('/category').then(res => {
        commit('loadCategory', res.data.result)
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
    },
    // 标签
    tag: {
      state: {
        tags: [],
        fetching: false
      },
      mutations: {
        loadTags (state, param) {
          state.tags = param
        },
        loadTagsFail (state, param) {
          state.fetching = false
        }
      }
    },
    // 类别
    category: {
      state: {
        category: []
      },
      mutations: {
        loadCategory (state, param) {
          state.category = param
        }
      }
    }
  }
})