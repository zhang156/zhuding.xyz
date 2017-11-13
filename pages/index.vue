<template>
  <section class="content">
    <!-- 图片轮播 -->
    <div v-swiper:mySwiper="swiperOption" style="background:#fff;">
      <transition name="module">
        <div class="swiper-wrapper" v-show="swiperShow">
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
  </section>
</template>

<script>
/* eslint-disable */
import articleList from '~/components/article-list'
import pageFooter from '~/components/page-footer.vue'

export default {
  components: {articleList, pageFooter},
  data () {
    return {
      banners: ['/images/lunbo1.jpg', '/images/lunbo2.jpg'],
      swiperOption: {
        autoplay: 5000,
        initialSlide: 0,
        loop: true,
        pagination: '.swiper-pagination',
        onSlideChangeEnd: swiper => {
          // console.log('onSlideChangeEnd', swiper.realIndex)
        }
      },
      swiperShow: false
    }
  },
  computed : {
    articles () {
      return this.$store.state.article.articleList
    }
  },
  created () {
    // this.$store.commit('updateArticleList', [1,2,3])
    this.$store.dispatch('increment')
  },
  mounted () {
    this.swiperShow = true;
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~assets/sass/variables.scss";
@import "~assets/sass/mixins.scss";

.content {
  position: relative;
  padding-top: 5.5em;
  z-index: 1;
  margin: 0 auto;
  width: 42.5em;
  background: transparent;

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
