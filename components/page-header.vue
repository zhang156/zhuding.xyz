<template>
  <header class="header">
    <nav class="navbar container">
      <img src="~/assets/img/logo.png" alt="">
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'header'
  }
</script>

<style lang="scss" scoped>
  @import "~assets/sass/variables.scss";
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: $module-bg;

    .navbar {
      height: $header-height;
      display: flex;
      align-items: center;
    }
  }
</style>


