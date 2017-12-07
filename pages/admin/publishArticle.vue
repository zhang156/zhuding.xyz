<template>
  <div id="publishArticle">
    <article-build :tags="tags" :category="category"></article-build>
  </div>
</template>

<script>
import articleBuild from '~/components/article'

export default {
  name: 'publishArticle',
  layout: 'admin',
  components: { articleBuild },
  fetch ({ store }) {
    return Promise.all([
      store.dispatch('loadTags'),
      store.dispatch('loadCategory')
    ])
  },
  data () {
    return {}
  },
  computed: {
    tags () {
      return this.$store.state.tag.tags
    },
    category () {
      return this.$store.state.category.category
    }
  }
}
</script>

<style lang="scss" scoped>
  #publishArticle {

  }
</style>


