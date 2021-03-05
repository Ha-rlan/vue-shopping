<template>
  <div>
<!--    nav-->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

<!--    main content-->
    <el-card>
<!--      the button of add role-->

      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

<!--      role list-->

      <el-table :data="roleList" border stripe>
<!--        expand-->

        <el-table-column type="expand">
          <template v-slot="scope">
            <!--          first menu-->
            <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['bdbottom',i1 === 0?'bdtop':'','vcenter']">
              <!--            first right-->
              <el-col :span="5" v-if="item1.level == '0'">
                <el-tag>{{item1.name}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--            second and thrid menu-->
              <el-col :span="19">
                <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2 ===0 ?'':'bdtop','vcenter']">
                  <!--                second menu-->
                  <el-col :span="6" v-if="item2.level == '1'">
                    <el-tag type="success">{{item2.name}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--                third menu-->
                  <el-col :span="18">
                    <el-tag v-for="item3 in item2.children" :key="item3.id" type="warning" closable @close="removeRightById(scope.row,item3.id)">{{item3.name}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

<!--            <pre>{{scope.row}}</pre>-->
          </template>
        </el-table-column>
<!--        index-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="角色描述" prop="introduce"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" @click="showSetDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

<!--    the dialog of set permission-->

    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%">
<!--      el-tree-->
      <el-tree :data="rightList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights" >确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getRoleList();
  },
  data(){
    return{
      //所有角色列表数据
      roleList:[],
      // control the visible of set permission dialog
      setRightDialogVisible:false,
      rightList:[],
      treeProps:{
        label: "name",
        children: "children"
      },
      //default of selected node
      defKeys:[],
      //add right tool id
      roleId:"",

    }
  },
  methods:{
    async getRoleList(){
     let res = await this.$http.get("/Role");
     if(res.status == 200){
       this.$message.success("获取角色列表成功");
       this.roleList = res.data;
     }else {
       this.$message.error("获取角色列表失败")
     }
    },
    //通过id移除权限
    removeRightById(role,right){
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () =>{
          let res =  await this.$http.delete("deleteRight?role_id="+role.id+"&right_id="+right);
          if(res.status == 200){
            this.$message.success("删除角色权限成功");
          }else {
            this.$message.error("删除角色权限失败")
          }
      }
      ).catch(() =>{
        this.$message.info("已取消删除角色权限")
      })
    },
    // show the set permission dialog
    async showSetDialog(role){
      this.roleId = role.id;
      //get all permission
      const res = await this.$http.get("/menu")
      if(res.status !== 200){
        this.$message.error("获取权限数据失败");
      }else {
        this.setRightDialogVisible = true;
        this.rightList = res.data;
        //递归获取三级权限（有个bug）
        this.getThirdRights(role,this.defKeys = [])
        this.$message.success("获取权限数据成功");
      }
    },
    getThirdRights(node,arr){
      //判断是否是三级节点(这段代码想想怎么去优化)
      if(node.children.length == 0 && node.id !== 101&& node.id !== 102&& node.id !==103&& node.id!==125&& node.id !== 145){
        return arr.push(node.id)
      }
      node.children.forEach(item =>{this.getThirdRights(item,arr)})
    },
   async allotRights(){
      const keys = [...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()]
      //字符串拼接
      const idStr = keys.join(",");
      let res = await this.$http.post("addRight?role_id="+this.roleId+"&rights="+idStr);
      if(res.status == 200){
        this.$message.success("增加角色权限成功");
        await this.getRoleList();
        this.setRightDialogVisible = false;
      }else {
        this.$message.error("增加角色权限失败")
      }
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 15px;
}
.el-tag{
  margin:7px
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
/*纵向上居中对齐*/
.vcenter{
  display: flex;
  align-items: center;
}
</style>