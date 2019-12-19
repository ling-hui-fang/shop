<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-bar {
  display:flex;
  background-color:#f6f6f6;
  height:49px;
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  box-shadow:0 -1px 1px rgba(0, 0, 0, .1);
}

</style>
