<template>
  <div id="zhuding_admin">
    <el-container class="container">
      <el-header class="header">
        <div class="header_content">
          <span>zhuding</span>
        </div>
      </el-header>

      <el-container class="main_container">
        <el-aside class="aside">
          <el-menu class="aside_menu"
            router
            unique-opened
            :default-active="$route.path"
            background-color="#23282d"
            text-color="#ebebeb"
            active-text-color="#ffd04b">
            
            <el-menu-item index="/admin" :route="{path:'/admin'}">
              <template solt="title">
                <i class="iconfont icon-home"></i>
                <span>首页</span>
              </template>
            </el-menu-item>

            <el-submenu index="article">
              <template slot="title">
                <i class="iconfont icon-wenzhangguanli"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item index="/admin/allArticles" :route="{path:'/admin/allArticles'}">全部文章</el-menu-item>
              <el-menu-item index="/admin/publishArticle" :route="{path:'/admin/publishArticle'}">发布文章</el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-main class="main">
          <keep-alive>
            <nuxt/>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>

<script>
export default {
  name: '',
  created () {}
}
</script>

<style lang="scss">
  #zhuding_admin {
    // color: #ebebeb;
    color: #fff;

    .el-menu {
      border: 0;
    }

    .el-menu-item i, .el-submenu__title i {
      margin-right: .5rem;
    }
  }
</style>

<style lang="scss" scoped>
  #zhuding_admin {
    height: 100%;

    .container {
      height: 100%;
      width: 100%;

      .header {
        background-color: rgb(35, 40, 45);
        border-bottom: 3px solid #000;
        display: flex;
        align-items: center;
        padding: 0 3rem;

        .header_content {
          flex: 1;
          
          span:nth-child(1) {
            font-size: 1.8rem;
          }
        }
      }

      .main_container {

        .aside {
          width: 200px !important;
          background-color: #23282d;
        }

        .main {
          background-color: #32373c;
        }
      }
    }
  }
</style>


