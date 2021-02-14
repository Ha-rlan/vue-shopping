<template>
  <el-form :model="register_form" class="login_form">
    <el-form-item>
      <img src="../images/logo.jpg" alt="logo" class="logo">
    </el-form-item>
    <el-form-item class="input-group">
      <el-input v-model="register_form.account" placeholder="请输入账号" type="text" show-word-limit minlength="6" maxlength="16"></el-input>
    </el-form-item>
    <el-form-item class="input-group">
      <el-input show-password v-model="register_form.password" placeholder="请输入密码" type="password" minlength="6" maxlength="16"></el-input>
    </el-form-item>
    <el-form-item class="input-check">
      <el-input type="text" placeholder="请输入手机号码" v-model="register_form.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" placeholder="请输入验证码" v-model="register_form.code" minlength="6" class="code"></el-input>
      <el-button type="info" round @click="send_code" class="code_button">发送验证码</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register(register_form)" class="register-button">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "register",
  data(){
    return{
      register_form:{
        account: "",
        password:"",
        phone:null,
        code:""
      }
    }
  },
  methods:{
    send_code(){

    },
    register(){

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
.register-button{
  width: 100%;
}
.code_button{
  margin-left: 100px;
}
.code{
  width: 180px;
}
</style>