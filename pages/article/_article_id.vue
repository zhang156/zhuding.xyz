<template>
  <div class="article">
    <div class="article_title">{{ article.title }}</div>
    <div class="article_content" v-html="articleDetail"></div>
  </div>
</template>

<script>
import marked from '~/plugins/marked.js'

export default {
  name: 'articleId',
  validate ({ params }) {
    return (!!params.article_id && !Object.is(Number(params.article_id), NaN))
  },
  fetch ({ store, params }) {
    return store.dispatch('loadArticleDetail', params)
  },
  computed: {
    article () {
      return this.$store.state.article.articleDetail
    },
    articleDetail () {
      return marked(this.article.content)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/sass/variables.scss";
  @import '~assets/sass/mixins.scss';

  .article {
    background: #fff;
    padding: 1em 2em;

    .article_title {
      font-size: 2em;
      padding: .5em 0 1em;
      text-align: center;
      color: #555;
    }

    .article_content {
      
    }
  }
</style>

<style lang="scss">
  @import "~assets/sass/variables.scss";
  @import '~assets/sass/mixins.scss';
  .article_content {

    /* a {
      font-weight: bold;
      margin: 0 .1em;

      &.image-link {
        margin: 0;
      }

      &:hover {
        text-decoration: underline;
      }
    } */

    img {
      max-width: 100%;
      margin: 0 auto;
      display: block;
      text-align: center;
      border-radius: $radius;
      border: .5rem solid $module-hover-bg;
      transition: all .25s;
      opacity: .9;
      cursor: pointer;

      &:hover {
        opacity: 1;
        transition: all .25s;
      }
    }

    p {
      line-height: 2.2em;
      text-indent: 2em;
      margin-bottom: 1em;

      &.text-center {
        text-align: center;
      }

      &.text-right {
        text-align: right;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1.5rem 0;
      padding-left: 0;
      line-height: 1.8em;
      font-weight: 700;
      text-indent: 0;
    }

    blockquote {

      p {
        // text-indent: 0em;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    ul {
      list-style-type: square;
    }

    ul, ol {

      > li {
        line-height: 1.8em;
        padding: .5em .8em;

        &:hover {
          background-color: rgba(230, 230, 230, 0.7);
        }

        > p {
          text-indent: 0;
        }

        > ul {

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    code {
      color: #bd4147;
      padding: .3em .5em;
      margin: 0 .5em;
      // border-radius: $radius;
      background-color: $module-hover-bg;
    }

    pre {
      display: block;
      position: relative;
      overflow: hidden;
      margin-bottom: 1em;
      padding-left: 2.5em;
      background-color: rgba(0, 0, 0, 0.8);

      &:after {
        content: ' ';
        width: 0;
        height: 0;
        display: block;
        visibility: hidden;
        clear: both;
      }

      &:before {
        color: white;
        content: attr(data-lang)" CODE";
        height: 2.8em;
        line-height: 2.8em;
        font-size: 1em;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-weight: 700;
        background-color: rgba(68, 68, 68, 0.9);
        display: block;
        text-transform: uppercase;
        text-align: center;
      }

      > .code-lines {
        position: absolute;
        left: 0;
        top: 2.8em;
        margin: 0;
        padding: 1em 0;
        width: 2.5em;
        height: calc(100% - 2.8em);
        text-align: center;
        background-color: rgba(0, 0, 0, 0.2);

        > .code-line-number {
          padding: 0;
          position: relative;
          list-style-type: none;
          line-height: 1.6em;
          transition: background-color .05s;

          &:hover {
            &:before {
              display: block;
              opacity: 1;
              visibility: visible;
            }
          }

          &:before {
            content: '';
            height: 1.6em;
            position: absolute;
            top: 0;
            left: 2.5em;
            width: 66em;
            background-color: rgba(154, 154, 154, 0.2);
            display: none;
            visibility: hidden;
            opacity: 0;
          }
        }
      }

      > code {
        margin: 0;
        padding: 1em;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        line-height: 1.6em;
        color: rgba(255, 255, 255, 0.87);
        background-color: transparent;
      }
    }
  }

  @keyframes readmorebtn {
    0% { 
      transform: translate3d(0, 0, 0);
      background-color: $module-hover-bg;
    }
    25% { 
      transform: translate3d(0, .5rem, 0);
      background-color: $primary;
      color: white;
    }
    50% { 
      transform: translate3d(0, 0, 0);
      background-color: $module-hover-bg;
    }
    75% { 
      transform: translate3d(0, .5rem, 0);
      background-color: $primary;
      color: white;
    }
    100% { 
      transform: translate3d(0, 0, 0);
      background-color: $module-hover-bg;
    }
  }

  > .readmore {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: .8rem;

    > .readmore-btn {
      width: 80%;
      text-align: center;
      height: 3rem;
      line-height: 3rem;
      background-color: $module-hover-bg;
      animation: readmorebtn 4s linear infinite;

      &[disabled] {
        cursor: no-drop;
      }

      &:hover {
        background-color: $primary!important;
        color: white!important;
      }

      > .iconfont {
        margin-left: .5rem;
      }
    }
  }
</style>



