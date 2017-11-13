<template>
  <div class="article_list">
    <div class="article_item" v-for="(item,index) in articles" :key="index">

    </div>
  </div>
</template>

<script>
export default {
  name: 'article_list',
  props: {
    articles: Array
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .article_list {
    width: 100%;
    margin: 10px 0;
    
    .article_item {
      width: 100%;
      background: #fff;
      height: 12em;
      margin-top: 10px;
    }
  }
</style>


