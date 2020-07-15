<template>
  <el-form ref="form" :model="model" label-width="80px" @submit.native.prevent="onSubmit">
      <h1>{{id ? '修改' : '新建' + '文章'}}</h1>
      <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
        <el-input type="textarea" v-model="model.content"></el-input>
      </el-form-item> 
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="getAuthorization()"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="model.categories" placeholder="请选择分类" multiple>
          <el-option v-for="(item, i) in categories" :key="i" :label="item.name" :value="item._id"></el-option>
          
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="model.tags" placeholder="请选择标签" multiple>
          <el-option v-for="(item, i) in tags" :key="i" :label="item.name" :value="item._id"></el-option>
        </el-select>
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
      model: {},
      categories: [],
      tags: []
    };
  },
  methods: {
    async onSubmit() {
      if (this.id) {
        await this.$http.put('/rest/articles/' + this.id, this.model);
      } else {
        await this.$http.post('/rest/articles/create', this.model)
      }
      this.$message({type: 'success', message: '保存成功'})
      this.$router.push('/articles/list')
    },
    handleCancel() {
      this.$router.push('/articles/list')
    },
    async fetch() {
      const { data } = await this.$http.get('/rest/articles/' + this.id)
      this.model = data
    },
    afterUpload(res) {
      /**因为this.model声明的时候没有icon,所以此处要显示赋值才有双向绑定的效果 */
      this.$set(this.model, 'icon', res.url)
    },
    async fetchTags() {
      const { data } = await this.$http.get('/rest/tags')
      this.tags = data
    },
    async fetchCategories() {
      const { data } = await this.$http.get('/rest/categories/')
      this.categories = data
    },
  },
  created() {
    if (this.id) {
      this.fetch()
    }
    this.fetchTags()
    this.fetchCategories()
  }
};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>