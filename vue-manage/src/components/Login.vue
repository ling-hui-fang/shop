<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="~assets/img/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form :model="LoginForm" :rules="LoginFormRules" label-width="0px" class="login_form" ref="LoginFormRef">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-yonghuming"
                              v-model="LoginForm.username">
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-mima"
                              v-model="LoginForm.password"
                              type="password">
                    </el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary">登录</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:"Login",
    data(){
        return {
            // 这是登入表单的数据绑定对象
            LoginForm:{
                username:"hhah",
                password:"lll"
            },
            LoginFormRules:{
                username:[
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在6 到 15 个字符', trigger: 'blur' }
                ]
                
            }
        }
    },
    methods: {
        reset(){
            this.$refs.LoginFormRef.resetFields()
        }
    },
}
</script>
<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height:100%;
        position: relative;
    }
    .login_box {
        width:450px;
        height:300px;
        background-color: #fff;
        border-radius:3px;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        .avatar_box {
            width:130px;
            height:130px;
            border-radius:50%;
            padding:10px;
            box-shadow:0 0 10px #ddd;
            position:absolute;
            left:50%;
            transform:translate(-50%,-50%);
            background-color: #fff;
            img {
                width:100%;
                height:100%;
                border-radius:50%;
                background-color: #eee;
            }
        }
    }
    .login_form{
        position: absolute;
        bottom:0;
        width:100%;
        padding:20px;
        box-sizing:border-box;
    }
    .btns {
       display:flex; 
       justify-content:flex-end;
    }
</style>