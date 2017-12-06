<template>
  <div id="publishArticle">
    <Article></Article>
  </div>
</template>

<script>
import Article from '~/components/article'

export default {
  name: 'publishArticle',
  layout: 'admin',
  components: { Article }  
}
</script>

<style lang="scss" scoped>
  #publishArticle {

  }
</style>


