<template>
  <el-form :model="register_form" class="login_form">
    <el-form-item>
      <img src="../images/logo.jpg" alt="logo" class="logo">
    </el-form-item>
    <el-form-item class="input-group">
      <el-input v-model="register_form.username" placeholder="请输入账号" type="text" show-word-limit minlength="6" maxlength="16"></el-input>
    </el-form-item>
    <el-form-item class="input-group">
      <el-input show-password v-model="register_form.password" placeholder="请输入密码" type="password" minlength="6" maxlength="16"></el-input>
    </el-form-item>
    <el-form-item class="input-check" prop="email" :rules="{
      required: true,message:'请输入邮箱地址',trigger:'blur'
}">
      <el-input type="text" v-model="register_form.email" placeholder="请输入邮箱地址"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" placeholder="请输入验证码" v-model="register_form.check_code" minlength="6" class="code"></el-input>
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
        username: "",
        password:"",
        email:null,
        check_code:"",
      }
    }
  },
  methods:{
    send_code(){
      let data = this.$qs.stringify(this.register_form);
      this.$http.post("/mail",data)
      .then(res => console.log(res))
      .catch(reason => console.log(reason))
    },
    async register(){
      let data = this.$qs.stringify(this.register_form);
      let {data:res} = await this.$http.post("/register",data);
      console.log(res)
      if(res == true){
        await this.$router.replace("/login")
      }else {
        this.$message.error("验证码错误，请重新验证")
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