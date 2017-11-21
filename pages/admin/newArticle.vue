<template>
  <div class="newArticle">
    <div class="card_wrap">
      <card :title="title">
        <div slot="card_content" class="article_content">
          <el-form ref="form" :model="form" 
            label-width="120px">
            <el-form-item label="文章标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="文章关键字">
              <el-input v-model="form.keywords"></el-input>
            </el-form-item>

            <el-form-item label="文章描述">
              <el-input type="textarea" v-model="form.description" :autosize="{minRows:3}"></el-input>
            </el-form-item>

            <el-form-item label="文章标签">
              <div class="article_tag_wrap">
                <div class="article_tag" :class="{'active': item.active}" 
                  @click="tagClick(index)" v-for="(item,index) in tags" :key="item.name">
                  {{ item.name }}
                </div>
              </div>
            </el-form-item>

            <el-form-item label="文章内容">

            </el-form-item>
          </el-form>
        </div>
      </card>
    </div>

    <div class="options_wrap">

    </div>
  </div>
</template>

<script>
import card from '~/components/card'

export default {
  name: 'newArticle',
  layout: 'admin',
  components: { card },
  data () {
    return {
      title: '撰写新文章',
      form: {description: ''},
      tags: [{name: 'Javascript'},{name: 'Html5'},{name: 'Css'},
             {name: 'Mongodb'}, {name: 'Linux'}, {name: 'Webpack'},
             {name: 'Vue'}, {name: 'Nuxt'}],
      activeTags: []
    }
  },
  created () {
    this.initTags(this.tags)
  },
  methods: {
    initTags (tags) {
      tags.map(item => {
        this.$set(item, 'active', false);
      })
    },
    tagClick (index) {
      this.tags[index].active = !this.tags[index].active
    }
  }
}
</script>

<style lang="scss" scoped>
  .newArticle {
    display: flex;

    .card_wrap {
      flex: 3;
      margin-right: 1rem;

      .article_content {
        .article_tag {
          display: inline-block;
          margin: .5rem 1rem 0 0;
          padding: .1rem 1rem;
          background: #22282e;
          border-radius: 6px;

          &:hover {
            cursor: pointer;
          }
        }

        .article_tag.active {
          background: #007f7d;
        }
      }
    }

    .options_wrap {
      flex: 1;
    }
  }
</style>

<style lang="scss">
  .newArticle {
    .el-form-item__label {
      color: #fff;
    }
  }
</style>



