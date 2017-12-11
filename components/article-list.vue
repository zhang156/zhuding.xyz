<template>
  <div class="article_list">
    <div class="article_item" v-for="(item,index) in articles" :key="index">
      <div class="item_content clear">
        <!-- thumb -->
        <div class="item_thumb">
          <router-link :to="`/article/${item.id}`">
            <img :src="item.thumb" alt="">
          </router-link>
        </div>

        <!-- title & description -->
        <div class="item_body">
          <h4><router-link :to="`/article/${item.id}`">{{ item.title }}</router-link></h4>
          <p>{{ item.description }}</p>
        </div>

        <!-- meta -->
        <div class="item_meta">
          <!-- 日期 -->
          <span class="meta meta_createDate">
            <i class="iconfont icon-riqi"></i>
            <span class="meta_text">{{ item.create_at | toYMD }}</span>
          </span>

          <!-- 阅读量 -->
          <span class="meta meta_views">
            <i class="iconfont icon-yuedu1"></i>
            <span class="meta_text">{{ item.meta.views || 0 }}</span>
          </span>

          <!-- 评论数 -->
          <span class="meta meta_comments">
            <i class="iconfont icon-pinglun"></i>
            <span class="meta_text">{{ item.meta.comments || 0 }}</span>
          </span>

          <!-- 点赞数 -->
          <span class="meta meta_likes">
            <i class="iconfont icon-dianzan"></i>
            <span class="meta_text">{{ item.meta.likes || 0 }}</span>
          </span>

          <!-- 类别 -->
          <span class="meta meta_category">
            <i class="iconfont icon-menu"></i>
            <span class="meta_text" v-if="!item.category.length">未分类</span>
            <span class="meta_text" v-else>{{ item.category[0] }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article_list',
  props: {
    articles: Array
  },
  computed: {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/variables.scss';
@import '~assets/sass/mixins.scss';

  .article_list {
    width: 100%;
    margin: 10px 0;
    
    .article_item {
      width: 100%;
      background: $module-bg;
      height: 9.5em;
      margin-top: 10px;

      .item_content {
        width: 100%;
        height: 100%;
        padding: .5em;

        &:hover {
          background-color: $module-hover-bg;

          .item_thumb {
            img {
              transform: translateX(-.5em)
            }
          }
        }

        .item_thumb {
          float: left;
          width: 12em;
          height: 100%;
          overflow: hidden;

          > a {
            display: inline-block;
            width: 100%;
            height: 100%;

            > img {
              width: calc(100% + .5em);
              height: 100%;
              transform: translateX(0);

            }
          }
        }

        .item_body {
          width: 28.5em;
          margin-left: 1em;
          display: inline-block;

          h4 {
            font-size: 1em;
            line-height: 1em;
            margin: .3em 0 .5em;

            > a {
              color: #333;
              @include text-overflow();

              &:hover {
                text-decoration: underline;
                // transform: translateX(.5em)
                margin-left: .5em;
              }
            }
          }

          p {
            font-size: .9em;
            height: 5em;
            line-height: 1.8em;
            @include text-overflow();
          }
        }

        .item_meta {
          display: inline-block;
          width: 28.5em;
          margin-left: 1em;
          @include text-overflow();

          .meta {
            margin-left: .5em;
            color: #333;
            vertical-align: middle;

            &:first-child {
              margin-left: 0;
            }

            .iconfont {
              color: #333;
              font-size: .9em;
              vertical-align: middle;
            }

            .meta_text {
              font-size: .9em;
              vertical-align: middle;
              padding: 0 .4em;
            }
          }

        }
      }
    }
  }
</style>


