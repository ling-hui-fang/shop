<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="~assets/img/home_logo.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单的模板区 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>

                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                        <!-- <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu> -->
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name:"Home",
    data(){
        return{
            menulist:[],
            iconsObj:{
                "125":"iconfont icon-users",
                "103":"iconfont icon-tijikongjian",
                "101":"iconfont icon-shangpin",
                "102":"iconfont icon-shangpin",
                "145":"iconfont icon-baobiao"
            },
            //是否折叠
            isCollapse:false,
            //被激活的链接地址
            activePath:""
        }
    },
    created(){
        this.getMenuList();
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        async getMenuList(){
            const { data: res } = await this.$http.get('menus')
            console.log(res);
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
        },
        //点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        },
        //保存链接的激活状态
        saveNavState(activePath){
           window.sessionStorage.setItem('activePath',activePath) 
           this.activePath = activePath
        }
    }
}
</script>
<style lang="less" scoped>
    .el-header{
        background-color: #373d41;
        color:white;
        display: flex;
        justify-content:space-between;
        padding-left:0;
        align-items:center;
        > div {
            display:flex;
            align-items:center;
        }
        span {
            margin-left:15px;
            font-size:20px;
        }
    }
    .el-aside{
        background-color: #333744;
        color:white;
        .el-menu {
            border-right:0;
        }
    }
    .el-main{
        background-color: #eaedf1;
    }
    .home-container{
        height:100%;
    }
    .iconfont {
        margin-right:10px;
    }
    .toggle-button {
        background-color: #4a5064;
        color:#fff;
        text-align:center;
        font-size:12px;
        line-height:25px;
        letter-spacing:.1em;
        cursor: pointer;
        user-select:none;
    }
</style>