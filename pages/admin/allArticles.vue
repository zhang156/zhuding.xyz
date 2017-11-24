<template>
  <div class="allArticles">
    <el-table
      class="article_table"
      :data="articles"

      stripe>
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类目录"
        align="center"
        width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.category.join(',') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        align="center"
        width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.tag.join(',') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="meta.comments"
        label="评论"
        align="center"
        width="60">
      </el-table-column>
      <el-table-column
        prop="create_at"
        label="日期"
        align="center"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.create_at | toYMD }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="public"
        label="公开"
        align="center"
        width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.public === 1 ? '公开' : '私密' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        align="center"
        width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.state === 1 ? '已发布' : (scope.row.state===2 ? '草稿' : '回收站') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editArticle(scope.row)">编辑文章</el-button>
          <el-button
            size="mini"
            @click="moveToDraft(scope.row)">移到草稿</el-button>
          <el-button
            size="mini"
            @click="moveToRecycle(scope.row)">移回收站</el-button>
          <el-button
            size="mini"
            @click="readArticle(scope.row)">查看文章</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<<script>
export default {
  name: 'allArticles',
  layout: 'admin',
  fetch ({ store }) {
    // 获取tags和category, 文章列表
    return Promise.all([
      store.dispatch('loadArticles'),
      store.dispatch('loadTags'),
      store.dispatch('loadCategory')
    ])
  },
  computed: {
    articles() {
      return this.$store.state.article.articleList
    },
    tags () {
      return this.$store.state.tag.tags
    },
    category () {
      return this.$store.state.category.category
    }
  },
  data () {
    return {

    }
  },
  created () {
    console.log(this.articles, this.tags, this.category)
  },
  methods: {
    editArticle (row) {

    },
    moveToDraft (row) {

    },
    moveToRecycle (row) {

    },
    readArticle (row) {

    }
  }
}
</script>

<style lang="scss" scoped>
  .allArticles {
    .article_table {
      width: 100%;
    }
  }
</style>


