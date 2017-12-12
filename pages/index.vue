<template>
  <section class="content">
    <loading v-if="fetching"></loading>

    <template v-if="articles.length && !fetching">
      <!-- 图片轮播 -->
      <div v-swiper:mySwiper="swiperOption" style="background:#fff;">
        <transition name="module">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(banner,index) in banners" :key="index">
              <div class="banner_content">
                <img :src="banner">
              </div>
            </div>
          </div>
        </transition>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div>

      <!-- 文章块 -->
      <article-list :articles="articles"></article-list>
    </template>
    
    <empty v-if="!articles.length && !fetching" isSearch></empty>
  </section>
</template>

<script>
/* eslint-disable */
import articleList from '~/components/article-list'
import pageFooter from '~/components/page-footer.vue'
import empty from '~/components/empty.vue'
import loading from '~/components/loading.vue'

export default {
  name: 'index',
  fetch ({ store }) {
    return Promise.all([
      store.dispatch('loadArticles', {page: 1, state: 1, public: 1})
    ])
  },
  components: {articleList, pageFooter, empty, loading},
  data () {
    return {
      swiperOption: {
        autoplay: 3000,
        initialSlide: 0,
        loop: true,
        pagination: '.swiper-pagination',
        onSlideChangeEnd: swiper => {
          // console.log('onSlideChangeEnd', swiper.realIndex)
        }
      }
    }
  },
  computed : {
    articles () {
      return this.$store.state.article.articleList
    },
    banners () {
      return this.articles.map(item => item.thumb).slice(0, 7)
    },
    fetching () {
      return this.$store.state.article.fetching
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~assets/sass/variables.scss";
@import "~assets/sass/mixins.scss";

.content {
  width: 100%;
  position: relative;
  
  .banner_content {
    width: 100%;
    height: 15em;
    overflow: hidden;

    > img {
      width: 100%;
      @include css3-prefix(transform, rotate(0deg) scale(1));
      @include css3-prefix(transition, transform 1s);

      &:hover {
        @include css3-prefix(transform, rotate(2deg) scale(1.1));
      }
    }
  }
}

/* .home-top {
  height: 700px;
  position: relative;
  background: url(~/assets/img/BG-Gradient.png) 0 0;
}

.stars {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: url(~/assets/img/stars_bg.png) repeat top center;
}

.twinkling {
  background: transparent url(~/assets/img/bg-twinkle.png) repeat top center;
  z-index: 1;
  animation: move-twink-back 900s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

@keyframes move-twink-back {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -10000px 0px;
  }
} */
</style>
