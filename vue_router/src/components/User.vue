<template>
  <div class="user">
   <!-- {{$route.params.userId}} -->
   {{userId}}
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      
    }
  },
  computed: {
    userId(){
      console.log(this.$route);
      return this.$route.params.userId
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
