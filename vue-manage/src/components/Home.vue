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
            <el-aside width="200px">
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单的模板区 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>

                        <!-- 二级菜单 -->
                        <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-location"></i>
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
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name:"Home",
    data(){
        return{
            menulist:[]
        }
    },
    created(){
        this.getMenuList()
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
    }
    .el-main{
        background-color: #eaedf1;
    }
    .home-container{
        height:100%;
    }
</style>