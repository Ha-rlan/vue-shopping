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
      <el-aside :width="isCollapse ? '64px' : '200px'">
<!--        fold icon-->
        <div class="toggle_button" @click="toggleCollapse">|||</div>
<!--        侧边栏菜单-->
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="this.$route.path"
        >
<!--          when open the router the router is the index-->
<!--            bind the menu list one was open the other would be done-->
<!--          一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
<!--            一级菜单模板区-->
            <template slot="title">
<!--              图标-->
              <i :class="iconsObj[item.id]"></i>
<!--              文本-->
              <span>{{item.name}}</span>
            </template>
<!--            二级菜单-->
            <el-menu-item :index="'/'+SubItem.controller" v-for="SubItem in item.children" :key="SubItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{SubItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--      右侧内容主体-->
      <el-main>
<!--        welcome-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  created() {
    this.getMenuList();
  },
  data(){
    return{
      //左侧菜单数据
      menuList: [],
      iconsObj:{
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "103": "iconfont icon-tijikongjian",
        "125": "iconfont icon-user",
        "145": "iconfont icon-baobiao",
      },
      isCollapse:false
    }
  },
  methods :{
    //获取后台菜单数据
   async getMenuList(){
    let res =  await this.$http.get("menu");
    let {data:menu_list} = res;
    let {status:msg} = res;
    if(msg !== 200) return this.$message.error("获取列表出错，请检查你的网络")
    this.menuList = menu_list;
    },
    // control the fold and expand of menu
    toggleCollapse(){
      this.isCollapse = ! this.isCollapse
    }
  }
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
/*icon classname*/
.iconfont{
  margin-right: 10px;
}
.toggle_button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>