<template>
  <div class="profile">
   {{$route.query}}
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      
    }
  },
  destroyed() {
    console.log("profile--destroyed")
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
