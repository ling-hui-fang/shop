<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link>
    <router-link to="/about" tag="button" replace active-class="active">关于</router-link> -->
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link> -->
    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>
    <router-link :to="'/user/'+userId">用户</router-link>
    <router-link :to="{path:'/profile',query:{name:'why',age:15,height:1.88}}">我的</router-link>
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>
    <keep-alive exclude="Profile">
        <router-view />
    </keep-alive>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
   return {
     userId:"zhangsan"
   }
  },
  methods:{
    homeClick(){
      // this.$router.push('/home')
      this.$router.replace('/home')
    },
    aboutClick(){
      // this.$router.push('/about')
      this.$router.replace('/about')
    },
    userClick(){
      this.$router.push('/user/'+ this.userId)
    },
    profileClick(){
      this.$router.push({
        path:'/profile',
        query:{
          name:"linghuifang",
          age:27
        }

      })
    }
  }
}
</script>

<style scoped>
.active {
  color:red;
}
</style>
