<template>
  <div id="nav-view">
    <nav class="nav_list">
      <nuxt-link to="/" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span class="item_title">home</span>
      </nuxt-link>
      <nuxt-link to="/code" class="item">
        <i class="iconfont icon-code"></i>
        <span class="item_title">code</span>
      </nuxt-link>
      <nuxt-link to="/project" class="item">
        <i class="iconfont icon-xiangmu"></i>
        <span class="item_title">project</span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'nav-view'
}
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables.scss';

  #nav-view {
    position: fixed;
    top: 5.5rem;
    left: calc(50% - 37.5rem);
    width: 11.5rem;

    .nav_list {
      width: 100%;

      .item {
        padding: .8rem 1.2rem;
        color: #777;
        display: block;
        background: transparent;

        &:hover {
          color: $primary;
        }

        .iconfont {
          font-size: 1.4rem;
          margin-right: .5rem;
          vertical-align: bottom;
        }

        .item_title {
          font-size: 1.1rem;
          vertical-align: bottom;
          text-transform: uppercase;
        }
      }

      .item.nuxt-link-exact-active.nuxt-link-active {
        color: $primary;
        background: #fff;
        border-radius: 4px;
      }
    }
  }
</style>

