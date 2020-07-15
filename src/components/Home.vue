<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2', '3']" router :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-reading"></i>分类管理
          </template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-reading"></i>标签管理
          </template>
          <el-menu-item index="/tags/create">新建标签</el-menu-item>
          <el-menu-item index="/tags/list">标签列表</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-document"></i>文章管理</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span style="margin-right:20px">欢迎 {{user.username}}</span>
        <el-link type="primary" @click="logout">退出</el-link>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>

export default {
  data() {
    return {
      user: { }
    };
  },
  methods: {
    async fetch() {
      const { data } = await this.$http.get('/userinfo')
      this.user = data;
    },
    logout() {
      localStorage.setItem('token', '')
      this.$router.push('/login')
    }
  },
  created() {
    this.fetch()
  }
};
</script>