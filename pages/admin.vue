<template>
  <div class="admin">
    <el-container class="container">
      <el-header class="header">

      </el-header>

      <el-container class="main_container">
        <el-aside class="aside">
          <el-menu class="aside_menu"
            default-active="1"
            background-color="#23282d"
            text-color="#fff"
            active-text-color="#fff">
            <el-menu-item index="1">
              <i class="iconfont icon-dashboard2"></i>
              <span>仪表盘</span>
            </el-menu-item>

            <el-menu-item index="2">
              <i class="iconfont icon-gonggaoguanli"></i>
              <span>公告管理</span>
            </el-menu-item>
            
            <el-submenu index="3">
              <template slot="title">
                <i class="iconfont icon-wenzhangguanli"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-submenu>

            <el-menu-item index="4">
              <i class="iconfont icon-pinglunguanli"></i>
              <span>评论管理</span>
            </el-menu-item>

            <el-menu-item index="5">
              <i class="iconfont icon-settings"></i>
              <span>全局设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main class="main">

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  name: 'admin'
}
</script>

<style lang="scss" scoped>
  .admin {
    height: 100%;

    .container {
      height: 100%;
      width: 100%;

      .header {
        background-color: rgb(35, 40, 45);
        border-bottom: 3px solid #000;
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

<style lang="scss">
  .admin {
    .el-menu {
      border: 0;
    }

    .el-menu-item i, .el-submenu__title i {
      color: #fff;
      margin-right: .5rem;
    }
  }
</style>




