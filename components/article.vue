<template>
  <div class="article">
    <div class="card_wrap">
      <card title="撰写新文章">
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
                <el-button type="info" icon="el-icon-plus" @click.native="addTag">标签</el-button>
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
            <el-checkbox v-for="item in category" :key="item.name" :label="item.name"></el-checkbox>
          </el-checkbox-group>
          <el-button type="info" @click="addCategory" icon="el-icon-plus">分类</el-button>
        </div>
      </card>

      <card title="发布选项" class="publish">
        <div slot="card_content" class="publish_content">
          <div class="publish_content_item">
            <label>状态</label>
            <el-select size="small" v-model="form.state" placeholder="请选择">
              <el-option 
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="publish_content_item">
            <label>公开度</label>
            <el-select size="small" v-model="form.public" placeholder="请选择">
              <el-option 
                v-for="item in publicOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </card>

      <card title="缩略图" class="thumb">
        <div slot="card_content">
          <el-upload 
            class="thumb-uploader"
            action="http://localhost:3001/uploadFile"
            accept="image/*"
            :show-file-list="false"
            :data="thumbUploadData"
            :before-upload="beforeUpload"
            :on-success="handleThumbSuccess"
            :on-error="handleThumbError"
            :on-progress="uploadProgress">
            <img v-if="thumbUrl" :src="thumbUrl" class="thumb-img">
            <i v-if="!thumbUrl&&!progressShow" class="el-icon-plus thumb-uploader-icon"></i>
            <el-progress
              type="circle"
              v-if="progressShow"
              :percentage="uploadPercentage"
              :status="uploadStatus">
            </el-progress>
          </el-upload>
          </div>
      </card>
    </div>

    <!-- dialog -->
    <el-dialog
      :title="titleText"
      :visible="dialogVisible">
      <template v-if="choose.isTag">
        <el-form v-model="tagForm" ref="tagForm" label-width="50px">
          <el-form-item label="名称">
            <el-input v-model="tagForm.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click.native="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click.native="tagSubmitDialog">确定</el-button>
        </div>
      </template>

      <template v-if="choose.isCategory">
        <el-form v-model="categoryForm" ref="categoryForm" label-width="50px">
          <el-form-item label="名称">
            <el-input v-model="categoryForm.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click.native="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click.native="categorySubmitDialog">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import card from '~/components/card'
import Service from '~/plugins/axios.js'
import zSelect from '~/components/zSelect'

export default {
  name: 'article',
  components: { card, zSelect },
  props: {
    tags: { type: Array },
    category: { type: Array }
  },
  data () {
    return {
      form: {description: '', content: '', tag: [], category: [], state: 1, public: 1},
      stateOptions: [{label: '直接发布', value: 1}, {label: '保存草稿', value: 2}],
      publicOptions: [{label: '公开', value: 1}, {label: '私密', value: 2}],
      editorOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      },
      titleText: '',
      dialogVisible: false,
      tagForm: {},
      categoryForm: {},
      choose: {isTag: false, isCategory: false},
      thumbUrl: '',
      thumbUploadData: {},
      uploadPercentage: 0,
      uploadStatus: '',
      progressShow: false
    }
  },
  created () {
    this.initTags(this.tags)
  },
  mounted () {},
  methods: {
    uploadProgress (event, file, fileList) {
      if (event.percent <= 90) {
        this.uploadPercentage = parseInt(event.percent)
      }
    },
    beforeUpload (file) {
      this.thumbUrl = URL.createObjectURL(file)
      this.progressShow = true
      this.uploadPercentage = 0
      this.uploadStatus = ''
    },
    handleThumbSuccess (response, file, fileList) {
      this.uploadPercentage = 100
      this.uploadStatus = 'success'
      this.progressShow = false
    },
    handleThumbError (err, file, fileList) {
      this.uploadStatus = 'exception'
      this.progressShow = false
    },
    tagSubmitDialog () {
      const loading = this.submitLoading()
      Service.post('/tags', this.tagForm).then((res) => {
        loading.close()
        if (res && res.data.code === 1) {
          this.openNotify('success', res.data.message)
          this.$store.commit('tag/addTag', res.data.result)
          this.dialogVisible = false
        } else {
          this.openNotify('fail', res.data.message)
        }
      })
    },
    addTag () {
      this.chooseForm('isTag')
      this.titleText = '新增标签'
      this.dialogVisible = true
    },
    chooseForm (val) {
      Object.keys(this.choose).map(item => this.choose[item] = false)
      this.choose[val] = true
    },
    submitLoading () {
      return this.$loading({
        lock: true,
        text: '',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, .6)',
        customClass: 'loading_article'
      })
    },
    openNotify (val, message) {
      if (val === 'fail') {
        this.$notify.error({
          title: '错误',
          message: message,
          duration: 2000
        })
      } else {
        this.$notify.success({
          title: '成功',
          message: message,
          duration: 2000
        })
      }
    },
    addCategory () {
      this.chooseForm('isCategory')
      this.titleText = '新增分类'
      this.dialogVisible = true
    },
    categorySubmitDialog () {
      const loading = this.submitLoading()
      Service.post('/category', this.categoryForm).then(res => {
        loading.close()
        if (res && res.data.result) {
          this.openNotify('success', res.data.message)
          this.$store.commit('category/addCategory', res.data.result)
          this.dialogVisible = false
        } else {
          this.openNotify('fail', res.data.message)
        }
      })
    },
    saveArticle () {
      this.getActiveTags()
      console.log(this.form)
      return
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
  .article {
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

      .publish {
        .publish_content {
          .publish_content_item {
            padding: .2rem 0;
            display: flex;

            label {
              display: inline-block;
              width: 60px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .article {
    .thumb {
      .card_content {
        text-align: center;
      }
      .thumb-uploader {
        display: inline-block;
        box-sizing: border-box;

        .el-upload {
          width: 178px;
          height: 178px;
          border: 1px solid #d9d9d9;
          border-radius: 5px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all .5s;

          &:hover {
            border-color: #409EFF;
          }

          .el-progress--circle {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, .7);
            z-index: 1;

            .el-progress-circle {
              display: inline
            }
          }

          .thumb-img {
            width: 178px;
            height: 178px;
            display: block;
          }

          .thumb-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
        }
      }
    }

    .publish_content_item {
      .el-select {
        flex: 1; 
      }
    }

    .card_wrap {
      .el-form-item__label {
        color: #fff;
      }

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

  .el-loading-mask {
    .el-loading-spinner {
      font-size: 3rem;

      .el-icon-loading {
        color: rgba(255, 255, 255, .7);
      }

      .el-loading-text {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, .7);
      }
    }
  }
</style>



