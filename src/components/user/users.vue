<template>
  <div>
<!--    nav-->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

<!--    information card-->

    <el-card>

<!--      search and add-->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

<!--      the list of managers-->

      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="name" ></el-table-column>
        <el-table-column label="邮箱" prop="email" ></el-table-column>
        <el-table-column label="电话" prop="phone" ></el-table-column>
        <el-table-column label="角色" prop="role_name" ></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.state" @change="userStateChanged(scope)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">

<!--            update-->

            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>

<!--            delete-->

            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteManager(scope.row.id)"></el-button>

<!--            distribute-->

            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

<!--      paging-->

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 4, 8,10]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>

<!--the dialog of add user-->

    <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%" @close="addDialogClosed">

<!--      the main area of substance-->

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
<!--      foot area-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>

<!--    the dialog of edit user-->

    <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo()">确 定</el-button>
  </span>
    </el-dialog>

<!--    distribute role-->

    <el-dialog title="分配角色" :visible.sync="distributeRoleDialogVisible" width="50%">
      <div>
        <p>当前用户：{{userInfo.name}}</p>
        <p>当前角色: {{userInfo.role_name}}</p>
        <p>分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择角色">
            <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="distributeRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",

  data() {
    // check for email
    let checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error("请输入合法的邮箱"))
    }
    //check for phone
    let checkPhone = (rule, value, callback) => {
      const regPhone = /^(1[3-9])\d{9}$/
      if (regPhone.test(value)) {
        return callback()
      }
      callback(new Error("请输入合法的手机号"))
    }
    return {
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 2,
      },
      userList: [],
      total: 0,
      // control the visible of add dialog
      addDialogVisible: false,
      // add form
      addForm: {
        name: "",
        password: "",
        email: "",
        phone: "",
        time: Number
      },
      // the validate of add users
      addFormRules: {
        name: [{
          required: true, message: "请输入用户名", trigger: "blur"
        }, {min: 3, max: 10, message: "用户名的长度在3-10个字符之间", trigger: "blur"}
        ],
        password: [{
          required: true, message: "请输入密码", trigger: "blur"
        }, {min: 6, max: 15, message: "用户名的长度在6-15个字符之间", trigger: "blur"}
        ],
        email: [{
          required: true, message: "请输入邮箱", trigger: "blur"
        }, {validator: checkEmail, trigger: "blur"}
        ],
        phone: [{
          required: true, message: "请输入手机", trigger: "blur"
        }, {validator: checkPhone, trigger: "blur"}]

      },
      //control the visible of edit dialog
      editDialogVisible: false,
      // save the edit form
      editForm:{
        id:Number,
        name:"",
        role_id:Number,
        phone:"",
        email:""
      },
      //the validate of edit users
      editFormRules:{
        email:[
            {required: true,message:"请输入用户邮箱",trigger:"blur"},
          {validator:checkEmail,trigger: "blur"}
            ],
        phone:[
            {required:true,message:"请输入用户手机",trigger:"blur"},
          {validator:checkPhone,trigger: "blur"}
            ]
      },
      // control the visible of distribute role
      distributeRoleDialogVisible:false,
      //distribute Role of user object
      userInfo:{},
      //all of role
      rolesList:[],
      // selected of role id
      selectedRoleId:"",
    }
  },

  created() {
    this.getUserList();
  },

  methods: {
    async getUserList() {
      // get请求传递参数格式
      let result = await this.$http.get("Manager", {params: this.queryInfo});
      const {data: res} = result;
      const {status: status} = result;
      if (status !== 200) {
        return this.$message.error("获取用户列表失败");
      }
      this.userList = res.list;
      this.total = res.total;
    },

    // page size

    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },

    // current page

    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },

    // update the user state

    async userStateChanged(obj) {
      let res = await this.$http.put("/updateStatus?" + "id=" + obj.row.id + "&state=" + obj.row.state);
      this.$message.success("更新用户状态成功")
      console.log(res)
    },

    //the event of dialog close

    addDialogClosed() {
      // rest the form content
      this.$refs.addFormRef.resetFields();
    },

    //axios请求是异步的，可能无法获得返回值，要么使用promise进行异步请求回调，要么使用这个方法同步这个方法
    // 还有验证用户是否存在等问题

    async addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          this.addForm.time = new Date().getTime();
          let {data:res} = await this.$http.post("addManager", this.addForm);
          if(res.status == 200){
            this.$message.error("添加用户失败");
          }else{
            this.$message.success("添加用户成功");
          }
        }
      });
    },

    //修改用户提示框
    async showEditDialog(id){
      let {data:res} = await this.$http.get("editManager?id="+id);
      //There's a bug here,deal it later
      if(res.status == 200){
        return this.$message.error("获取用户信息失败");
      }else {
        this.editForm = res;
        this.editDialogVisible = true;
      }
    },

    editDialogClosed(){
      this.$refs.editFormRef.resetFields();
    },
    editUserInfo(){
      this.$refs.editFormRef.validate(async valid =>{
        if(!valid) return;
        let res = await this.$http.put("updateManager",this.editForm);
        if(res.status == 200){
            this.$message.success("修改用户资料成功");
        }else {
          this.$message.error("修改用户资料失败");
        }
      })
    },
    deleteManager(id){
      this.$confirm("此操作将永久删除该用户，确认删除吗？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(async () =>{
        let res = await this.$http.put("deleteManager?id="+id);
        if(res.status == 200){
          this.$message.success("删除用户成功");
        }else {
          this.$message.error("删除用户失败");
        }
      }).catch(() =>{
        this.$message.info("已取消删除")
      })
    },
    // show the distribute dialog
    async setRole(role){
      this.userInfo = role;
      //get the role list
      let res = await this.$http.get("Role");
      if(res.status == 200){
        this.$message.success("获取角色列表成功");
        this.rolesList = res.data;
      }else {
        this.$message.error("获取角色列表失败")
      }
      this.distributeRoleDialogVisible = true;
    },
    // distribute role
    async saveRoleInfo(){
      if(!this.selectedRoleId){
        this.$message.error("请选择要分配的角色！");
      }else {
       let res =  await this.$http.put("addRole?role_id="+this.selectedRoleId+"&id="+this.userInfo.id)
        this.selectedRoleId="";
        if(res.status == 200){
          this.$message.success("添加用户角色成功");
          await this.getUserList();
          this.distributeRoleDialogVisible = false;
        }else {
          this.$message.error("添加用户角色失败");
        }
      }
    }

  }
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 15px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0,0,0,0.15) !important;
}
.el-pagination{
  margin-top: 15px;
}
</style>