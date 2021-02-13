<template>
  <el-form :model="form" class="login_form">
    <el-form-item>
      <img src="../images/logo.jpg" alt="logo" class="logo">
    </el-form-item>
    <el-form-item class="input-group">
      <el-input v-model="form.account" placeholder="请输入账号" type="text" show-word-limit minlength="6" maxlength="16"></el-input>
    </el-form-item>
    <el-form-item class="input-group">
      <el-input show-password v-model="form.password" placeholder="请输入密码" type="password" minlength="6" maxlength="16"></el-input>
    </el-form-item>
    <el-form-item class="input-check">
      <el-input type="text" placeholder="请输入验证码" v-model="form.check_mode" class="check_mode"></el-input>
      <img src="" alt="点击生成验证码">
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login(form)" class="login-button">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "login",
  data(){
    return{
      form:{
        account:"",
        password:"",
        check_mode:""
      }
    }
  },
  methods:{
    login(){
      //先进行长度校验，然后发送数据到服务器端进行数据验证，再由服务器返回判断结果，再根据结果进行回复或者跳转页面
      //校验：中间再嵌套一个方法，比如check，当然，可以直接采用带校验的组件
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