<template>
  <el-container class="first-container">
<!--    头部-->
    <el-header>
      <div>
        <img src="../images/刘看山.jpeg" class="logo">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info">退出</el-button>
    </el-header>
<!--    主体-->
    <el-container class="second-container">
<!--      侧边栏-->
      <el-aside width="200px">
<!--        侧边栏菜单-->
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b">
<!--          一级菜单-->
          <el-submenu index="1">
<!--            一级菜单模板区-->
            <template slot="title">
<!--              图标-->
              <i class="el-icon-location"></i>
<!--              文本-->
              <span>导航一</span>
            </template>
<!--            二级菜单-->
            <el-menu-item index="1-4-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--      右侧内容主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home"
}
</script>

<style>
.first-container{
  height: 100%;
}
.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header>div{
  display: flex;
  align-items: center;
}
.el-header>div>span{
  margin-left: 20px;
}
.el-aside{
  background-color: #333744;
}
.el-main{
  background-color: #EAEDF1;
}
.logo{
  height: 50px;
  width: 50px;
  border: 1px solid black;
  border-radius: 50%;
}
.el-submenu{
  width: 200px;
}
</style>