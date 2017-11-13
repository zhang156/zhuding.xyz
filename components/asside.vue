<template>
  <div id="asside">
    <!-- searchbar -->
    <div class="search">
      <div class="search_content">
        <input type="search" name="search_input" class="search_input" placeholder="Search...">
        <span class="searchbar">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aside'
}
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins.scss';
  @import '~assets/sass/variables.scss';

  #asside {
    float: right;
    width: 19em;
    margin: 5.5em calc(50% - 42em) 0 0;
    position: relative;
    z-index: 1;

    .search {
      padding: 5px 5px;
      background: #fff;

      .search_input {
        background-color: hsla(0,0%,77%,.4);
        height: 2em;
        line-height: 2em;
        vertical-align: middle;

        &:hover {
          background-color: hsla(0,0%,57%,.4);
        }
      }

      .searchbar {
        display: inline-block;
        // font-size: 1.2em;
        height: 2em;
        width: 2em;
        line-height: 2em;
        text-align: center;
        background-color: hsla(0,0%,57%,.4);
        vertical-align: middle;
      }
    }
  }
</style>


