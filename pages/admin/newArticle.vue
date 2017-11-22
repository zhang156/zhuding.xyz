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
              <el-input type="textarea" v-model="form.content" :autosize="{minRows:5}"></el-input>
              <!-- <codemirror v-model="form.code" :options="editorOptions"></codemirror> -->
            </el-form-item>

            <el-form-item label="">
              <el-button type="info" @click="saveArticle">保存文章</el-button>
            </el-form-item>
          </el-form>
        </div>
      </card>
    </div>

    <div class="options_wrap">
      <card title="分类目录" class="category">
        <div slot="card_content" class="category_content">
          <el-checkbox-group v-model="form.category">
            <el-checkbox v-for="item in category" :key="item" :label="item"></el-checkbox>
          </el-checkbox-group>
          <el-button type="info" @click="updateCategory">更新分类</el-button>
        </div>
      </card>

      <card title="发布选项" class="publish">
        <div slot="card_content" class="publish_content">
          <div class="publish_content_item">
            <label>状态</label>
            <el-select v-model="form.state">
              <!-- <el-option 
                v-for="item in stateOptions" 
                :key="item.value"
                :label="item.label"
                :vlaue="item.value">
              </el-option> -->
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <!-- <div class="publish_content_item">
            <label>公开度</label>
            <el-select v-model="form.public">
              <el-option 
                v-for="item in publicOptions" 
                :key="item.value"
                :label="item.label"
                :vlaue="item.value">
              </el-option>
            </el-select>
          </div> -->
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import card from '~/components/card'
import Service from '~/plugins/axios.js'

export default {
  name: 'newArticle',
  layout: 'admin',
  components: { card },
  data () {
    return {
      title: '撰写新文章',
      form: {description: '', content: '', tag: [], category: [], state: 1, public: 1},
      tags: [{name: 'Javascript'},{name: 'Html5'},{name: 'Css'},
             {name: 'Mongodb'}, {name: 'Linux'}, {name: 'Webpack'},
             {name: 'Vue'}, {name: 'Nuxt'}],
      category: ['Code', 'Think'],
      stateOptions: [{label: '直接发布', value: 1}, {label: '保存草稿', value: 2}],
      publicOptions: [{label: '公开', value: 1}, {label: '私密', value: 2}],
      editorOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    }
  },
  created () {
    this.initTags(this.tags)
  },
  methods: {
    updateCategory () {

    },
    saveArticle () {
      this.getActiveTags()
      console.log(this.form)
      Service.post('/article', this.form).then((res) => {
        console.log(res)
      })
    },
    getActiveTags () {
      this.form.tag = [];
      this.tags.map(item => {
        item.active && this.form.tag.push(item.name)
      })
    },
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

      .category {
        margin-bottom: 1rem;
      }

      .publish {

      }
    }
  }
</style>

<style lang="scss">
  .newArticle {
    .el-form-item__label {
      color: #fff;
    }

    // input, textarea
    .el-input, .el-textarea {
      input, textarea {
        background: #3c4147;
        border: 1px solid rgba(34, 40, 46, .3);
        color: #fff;
        // font-size: 1.2rem;

        &:focus {
          border: 1px solid rgba(34, 40, 46, 1);
        }
      }
    }

    // button
    .el-button--info {
      background: rgba(34, 40, 46, .7);
      border-color: rgba(34, 40, 46, .7);

      &:active {
        background: rgba(34, 40, 46, 1);
        border-color: rgba(34, 40, 46, 1);
      }
    }

    // checkbox
    .el-checkbox-group {
      border-bottom: 1px solid rgba(0, 0, 0, .3);
      margin-bottom: 1rem;
      padding-bottom: 1rem;

      .el-checkbox {
        display: block;
        color: rgba(255,255,255,.5);
        margin: .5rem 0 0;

        &:nth-child(1) {
          margin-top: 0;
        }

        .el-checkbox__input {
          margin-right: .5rem;

          .el-checkbox__inner {
            background: #454b4f;
            border: 1px solid rgba(255,255,255,.5);
            border-radius: 0;
          }
          
        }
      }
    }

  }
</style>



