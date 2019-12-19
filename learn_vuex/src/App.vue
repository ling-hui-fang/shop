<template>
  <div id="app">
   <h2>----App内容----</h2>
   <h2>{{$store.state.counter}}</h2>
    <h2>{{$store.state.info}}</h2>
    <button @click="addition">+</button>
    <button @click="subtraction">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button @click="addStudent">添加学生</button>
    
    <button @click="updateInfo">更新</button>
    <h2>-------App内容：getters相关信息-------</h2>
    <h2> 
      {{$store.getters.powerCounter}}
    </h2>
    <h2>{{$store.getters.more20stu}}</h2>
    <h2>{{$store.getters.more20stuLength}}</h2>
    <h2>{{$store.getters.moreAgeStu(8)}}</h2>

    <h2>---------modules--------</h2>
    <h2>{{$store.state.a.name}}</h2>
    <h2>{{$store.getters.fullname}}</h2>
    <h2>{{$store.getters.fullname2}}</h2>
    <h2>{{$store.getters.fullname3}}</h2>
    <button @click="updateName">异步修改名字</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{
    addition(){
      this.$store.commit("increment")
    },
    subtraction(){
      this.$store.commit("decrement")
    },
    addCount(count){
      // this.$store.commit("addCount",count)
      this.$store.commit({
        type:"addCount",
        count
      })
    },
    addStudent(){
      const stu = {name:"linghuifang",age:10};
      this.$store.commit("addStudent",stu)
    },
    updateInfo(){
      // this.$store.commit("updateInfo")
      this.$store.dispatch("aUpdateInfo","我是携带信息")
      .then(res=>{
        console.log("里面已经完成了");
        
        console.log(res)
      })
    },
    updateName(){
      // this.$store.commit("updateName","wanghu")
      this.$store.dispatch("aUpdateName")
    }
  }
}
</script>

<style>

</style>
