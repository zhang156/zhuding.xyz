<template>
  <div id="app">
    <!-- 背景 -->
    <background :width="canvasW" :height="canvasH"></background>
    
    <!-- header -->
    <page-header></page-header>

    <div class="main clear">
      <!-- 导航 -->
      <nav-view></nav-view>

      <!-- asside -->
      <asside></asside>

      <keep-alive>
        <nuxt/>
      </keep-alive>
    </div>
    
    <!-- footer -->
    <page-footer></page-footer>
  </div>
</template>

<script>
/* eslint-disable */
import background from '~/components/background.vue'
import pageHeader from '~/components/page-header.vue'
import pageFooter from '~/components/page-footer.vue'
import navView from '~/components/nav-view.vue'
import asside from '~/components/asside.vue'

var window = window || global;
export default {
  components: { background, pageHeader, pageFooter, navView, asside},
  data () {
    return {
      canvasW: '',
      canvasH: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.canvasW = window.document.body.clientWidth;
      this.canvasH = window.document.body.clientHeight;
      console.log(this.canvasW, this.canvasH)
    })
  }
}
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;

    .main {
      width: 100%;
    }
  }
</style>


<style lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  // -ms-text-size-adjust: 100%;
  // -webkit-text-size-adjust: 100%;
  // -moz-osx-font-smoothing: grayscale;
  // -webkit-font-smoothing: antialiased;
  // box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  box-sizing: border-box;
}

#__nuxt {
  height: 100%;
}
</style>
