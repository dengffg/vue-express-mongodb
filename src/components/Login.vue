<template>
  <div class="page-login">
    <el-card class="box-card">
     <el-tabs v-model="activeName">
          <el-tab-pane label="登录" name="first">
             <el-form ref="form" :model="model" label-width="80px" @submit.native.prevent="onSubmit">
                <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="model.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <el-form ref="form" :model="model" label-width="80px" @submit.native.prevent="onSubmit">
                <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="model.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit">注册</el-button>
                </el-form-item>
              </el-form>
          </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      model: {}
    }
  },
  methods: {
    async onSubmit() {
      if (this.activeName === 'first') {
        const res = await this.$http.post('/login', this.model)

        this.$message({ type: 'success', message: '登录成功'})
        localStorage.setItem('token', res.data.token)
        this.$router.push('/')
      } else {
        await this.$http.post('/register', this.model)
        this.$message({ type: 'success', message: '注册成功'})
        this.activeName = 'first'
      }
      
    }
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
  margin: 150px auto;
}
</style>
