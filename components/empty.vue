<template>
  <div class="empty">
    <div v-if="isSearch" class="emptySearch">
      <span><i class="iconfont icon-sousuo"></i></span>
      <span>{{ '未找到与'+searchKey+'有关的文章' }}</span>
    </div>
    <div class="emptyText">{{ emptyText }}</div>
  </div>
</template>

<script>
export default {
  name: 'empty',
  props: {
    emptyText: {
      type: String,
      default: '暂时没有相关文章，敬请期待'
    },
    isSearch: Boolean,
    searchKey: String
  }
}
</script>

<style lang="scss" scoped>
  .empty {

    .emptySearch {
      padding: 2rem 0 1rem;
      text-align: center;
      margin-bottom: 1rem;
      background: #fff;

      .iconfont {
        font-size: 6rem;
        display: inline-block;
        animation: iconAnimations 5s infinite ease-in-out;
      }

      span {
        padding: .5rem 0;
        display: block;
      }
    }

    .emptyText {
      text-align: center;
      padding: 2rem 0;
      background: #fff;
    }
  }

  @keyframes iconAnimations {
    0% {
      opacity: 1;
      transform: scale(1) rotateY(0);
    }

    33% {
      opacity: .8;
      transform: scale(1.2) rotateY(0);
    }

    66% {
      opacity: .8;
      transform: scale(1.2) rotateY(360deg);
    }

    100% {
      opacity: 1;
      transform: scale(1) rotateY(360deg);
    }
  }
</style>


