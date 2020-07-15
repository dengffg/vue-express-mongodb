<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="_id" label="id"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
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
          const { data } = await this.$http.get('/rest/tags');
          this.tableData = data;
        },
        toEdit(id) {
          this.$router.push('/tags/'+ id)
        },
        async handleDelete(id) {
          this.$http.delete('/rest/tags/' + id)
          this.$message({type: 'success', message: '删除成功'})
          this.fetch()
        }
      },
      created() {
        this.fetch()
      }
    }
  </script>