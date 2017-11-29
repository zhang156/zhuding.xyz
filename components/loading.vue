<template>
  <div class="loading">
    <i class="iconfont icon-jishi-copy-copy"></i>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: calc(100vh - 9.5rem);
    background: #fff;
    opacity: .4;

    .iconfont {
      font-size: 7rem;
      position: absolute;
      top: calc(50% - 3.5rem);
      left: calc(50% - 3.5rem);
      animation: iconAnimations 2s infinite;
    }
  }

  @keyframes iconAnimations {
    0% {
      transform: rotateZ(0);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
</style>



