<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" width="50"/>
        </template>
      
      </el-table-column>
      <el-table-column prop="categories" label="分类">
        <template slot-scope="scope">
          <el-tag
            :key="i"
            v-for="(category, i) in scope.row.categories">
            {{category.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="标签">
        <template slot-scope="scope">
          <el-tag
            :key="i"
            v-for="(tag, i) in scope.row.tags">
            {{tag.name}}
          </el-tag> 
        </template>
      </el-table-column>
      <el-table-column label="操作"> 
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toEdit(scope.row._id)">编辑</el-button>
          <el-button @click="handleDelete(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: []
        }
      },
      methods: {
        async fetch() {
          const { data } = await this.$http.get('/rest/articles');
          this.tableData = data;
        },
        toEdit(id) {
          this.$router.push('/articles/'+ id)
        },
        async handleDelete(id) {
          this.$http.delete('/rest/articles/' + id)
          this.$message({type: 'success', message: '删除成功'})
          this.fetch()
        }
      },
      created() {
        this.fetch()
      }
    }
  </script>