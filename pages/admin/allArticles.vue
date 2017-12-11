<template>
  <div class="allArticles">
    <template v-if="!isArticleEdit">
      <el-radio-group v-model="tabValue" class="tabGroup">
        <el-radio-button label="1">{{ '全部' + (tabValue=='1'?'('+articles.length+')':'') }}</el-radio-button>
        <el-radio-button label="2">{{ '已发布' + (tabValue=='2'?'('+articles.length+')':'') }}</el-radio-button>
        <el-radio-button label="3">{{ '草稿' + (tabValue=='3'?'('+articles.length+')':'') }}</el-radio-button>
        <el-radio-button label="4">{{ '回收站' + (tabValue=='4'?'('+articles.length+')':'') }}</el-radio-button>
      </el-radio-group>

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
              class="miniBtn"
              type="primary"
              @click="readArticle(scope.row)">查看文章</el-button>
            <el-button
              size="mini"
              class="miniBtn"
              type="warning"
              @click="editArticle(scope.row)">编辑文章</el-button>
            <el-button
              size="mini"
              class="miniBtn"
              type="success"
              @click="moveToDraft(scope.row)">移到草稿</el-button>
            <el-button
              size="mini"
              class="miniBtn"
              type="danger"
              @click="moveToRecycle(scope.row)">移回收站</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="isArticleEdit">
      <article-edit :articleForm="articleForm" :tags="tags" :category="category"></article-edit>
    </template>
  </div>
</template>

<script>
import articleEdit from '~/components/article'

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
  components: { articleEdit },
  computed: {
    articles() {
      if (this.tabValue === '1') {
        return this.$store.state.article.articleList
      } else if (this.tabValue === '2') {
        return this.$store.state.article.articleList.filter(item => item.state === 1)
      } else if (this.tabValue === '3') {
        return this.$store.state.article.articleList.filter(item => item.state === 2)
      } else if (this.tabValue === '4') {
        return this.$store.state.article.articleList.filter(item => item.state === 0)
      }
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
      tabValue: '1',
      isArticleEdit: false,
      articleForm: {}
    }
  },
  created () {
    console.log(this.articles, this.tags, this.category)
  },
  methods: {
    editArticle (row) {
      this.articleForm = row
      this.isArticleEdit = true
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
    .tabGroup {
      margin-bottom: 20px;
    }

    .article_table {
      width: 100%;

      .miniBtn {
        margin-top: 5px;
        
        &:first-child {
          margin-left: 10px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .allArticles {
    .el-radio-button:first-child .el-radio-button__inner {
      border-left: 0;
    }
  }
</style>



