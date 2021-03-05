<template>
  <div>
<!--    nav-->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

<!--    card-->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="name"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.level == '0'">一级权限</el-tag>
            <el-tag type="success" v-if="scope.row.level == '1'">二级权限</el-tag>
            <el-tag type="warning" v-if="scope.row.level == '2'">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    //获取权限对象列表
    this.getRightsList();
  },
  data(){
    return{
      rightsList:[]
    }
  },
  methods:{
    async getRightsList(){
      let res = await this.$http.get("/Permission");
      if(res.status !== 200){
        this.$message.error("获取权限列表失败");
      }else {
        this.$message.success("获取权限列表成功");
        this.rightsList = res.data;
      }
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 15px;
}
</style>