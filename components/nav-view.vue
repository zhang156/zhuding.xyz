<template>
  <div id="nav-view">
    <nav class="nav_list">
      <nuxt-link to="/" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span class="item_title">home</span>
      </nuxt-link>
      <nuxt-link to="/aa" class="item">
        <i class="iconfont icon-code"></i>
        <span class="item_title">code</span>
      </nuxt-link>
      <nuxt-link to="/aa" class="item">
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
    top: 5.5em;
    left: calc(50% - 35em);
    width: 11.5em;

    .nav_list {
      width: 100%;

      .item {
        padding: .8em 1.2em;
        color: #777;
        display: block;
        background: transparent;

        &:hover {
          color: $primary;
        }

        .iconfont {
          font-size: 1.4em;
          margin-right: .5em;
          vertical-align: bottom;
        }

        .item_title {
          font-size: 1.1em;
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

