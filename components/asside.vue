<template>
  <div id="asside">
    <!-- searchbar -->
    <div class="search">
      <div class="search_content">
        <input type="search" name="search_input" class="search_input" placeholder="Search...">
        <span class="searchbar">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </div>
    </div>

    <!-- hot articles -->
    <div class="hot_articles">
      <div class="hot_articles_title">热门文章</div>
      <ul class="hot_articles_list">
        <li v-for="(item, index) in hotArticles" :key="index">
          <span>{{ index+1 }}</span>
          <a :href="`/article/${item.id}`" :title="`${item.meta.views}人看过,${item.meta.likes}人喜欢`"><span>{{ item.title }}</span></a>
        </li>
      </ul>
    </div>

    <!-- calendar -->
    <div class="calendar_wrap">
      <calendar></calendar>
    </div>
  </div>
</template>

<script>
import calendar from '~/components/calendar'
export default {
  name: 'aside',
  components: {calendar},
  data () {
    return {}
  },
  computed: {
    hotArticles () {
      return this.$store.state.article.hotArticle
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins.scss';
  @import '~assets/sass/variables.scss';

  #asside {
    float: right;
    width: 19rem;
    // margin-right: calc(50% - 42rem);
    position: relative;
    z-index: 1;
    min-height: calc(100vh - 9.5rem);

    .search {
      padding: 5px 5px;
      background: #fff;
      border-radius: 4px;

      .search_input {
        background-color: hsla(0,0%,77%,.4);
        height: 2em;
        line-height: 2em;
        vertical-align: middle;

        &:hover {
          background-color: hsla(0,0%,57%,.4);
        }
      }

      .searchbar {
        display: inline-block;
        // font-size: 1.2em;
        height: 2rem;
        width: 2rem;
        line-height: 2rem;
        text-align: center;
        background-color: hsla(0,0%,57%,.4);
        vertical-align: middle;
      }
    }

    .hot_articles {
      margin-top: 1em;
      background: #fff;
      border-radius: 4px;
      
      .hot_articles_title {
        height: 3rem;
        line-height: 2rem;
        padding: .5rem 1rem;
        text-align: left;
        color: #333;
        position: relative;
        
        &:after {
          content: ' ';
          display: block;
          width: 100%;
          height: 1px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #ddd;
          transform: scaleY(.5);
        }
      }

      ul.hot_articles_list {
        padding: 1rem;
        li {  
          height: 1.8rem;
          line-height: 1.8rem;

          > span{
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
            background: rgba(204, 204, 204, 0.8);
            color: #fff;
          }

          >a {
            display: inline-block;
            margin-left: .6rem;
            color: #555;
            line-height: 1rem;

            &:hover {
              text-decoration: underline;
              color: #333;
              transform: translateX(.5rem);
              cursor: pointer;
            }
          }
          
        }
      }
    }

    .calendar_wrap {
      margin-top: 1rem;
    }
  }
</style>


