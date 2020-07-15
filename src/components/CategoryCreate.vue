<template>
  <el-form ref="form" :model="model" label-width="80px" @submit.native.prevent="onSubmit">
    <el-form-item :label="id ? '修改' : '新建' + '分类'">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async onSubmit() {
      if (this.id) {
        await this.$http.put('/rest/categories/' + this.id, this.model);
      } else {
        await this.$http.post('/rest/categories/create', this.model)
      }
      this.$message({type: 'success', message: '保存成功'})
      this.$router.push('/categories/list')
    },
    handleCancel() {
      this.$router.push('/categories/list')
    },
    async fetch() {
      const { data } = await this.$http.get('/rest/categories/' + this.id)
      this.model = data
    }
  },
  created() {
    if (this.id) {
      this.fetch()
    }
  }
};
</script>
