<template>
  <div>
    <el-form :model="form" class="login_form">
      <el-form-item>
        <img src="../images/logo.jpg" alt="logo" class="logo">
      </el-form-item>
      <el-form-item class="input-group">
        <el-input v-model="form.username" placeholder="请输入账号" type="text" show-word-limit minlength="5" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item class="input-group">
        <el-input show-password v-model="form.password" placeholder="请输入密码" type="password" minlength="6" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item class="input-check">
        <el-input type="text" placeholder="请输入验证码" v-model="form.check_mode" class="check_mode"></el-input>
        <img src="" alt="点击生成验证码">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()" class="login-button">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: "login",
  data(){
    return{
      form:{
        username:"",
        password:"",
        check_mode:""
      }
    }
  },
  methods:{
      async login() {
        let data = this.$qs.stringify(this.form)
      let {data:res} = await this.$http.post("login",data);
      if(res == true){
        await this.$router.replace("/home");
        this.$message({
          message:"登陆成功",
          type:"success",
          center:true
        })
      }else {
        this.$message({
          message:"账号或密码错误，请重新输入",
          type:"error",
          center:"true"
        })
      }
    }
  }
}
</script>

<style scoped>
.login_form{
  width: 400px;
  height: 500px;
  margin-left: 500px;
  border: 1px solid black;
  border-radius: 5px;
  background-clip: padding-box;
  background-color: aliceblue;
  margin-top: 150px;
  box-shadow: 0 0 6px #3e3131
}
.logo{
  margin-left: 150px;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
}
.check_mode{
  width: 180px;
}
.login-button{
  width: 100%;
}
</style>