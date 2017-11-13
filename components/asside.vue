<template>
  <div id="asside">
    <!-- searchbar -->
    <div class="searchbar">
      <div class="search_content">
        <input type="text" name="search_input" class="search_input">
        <span>
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
  #asside {
    float: right;
    width: 19em;
    margin: 5.5em calc(50% - 42em) 0 0;
    position: relative;
    z-index: 1;

    .searchbar {
      padding: 5px 5px;
      background: #fff;

      .search_input {
        background-color: hsla(0,0%,77%,.4);
        height: 2em;
        

        &:hover {
          background-color: hsla(0,0%,57%,.4);
        }
      }
    }
  }
</style>


