<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="styleClass">
            <slot name="item-text"></slot>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    data(){
        return {
            // isActive:false
        }
    },
    props:{
        path:String,
        activeColor:{
            type:String,
            default:"#ff8198"
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1
        },
        styleClass(){
            return this.isActive ? {color:this.activeColor}:{}
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path)
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-bar-item {
  flex:1;
  text-align:center;
  font-size:14px;
}
.tab-bar-item img {
    width:24px;
    height:24px;
    margin-top:3px;
    vertical-align:middle;
    margin-bottom:2px;
}
.active {
    color:var(--color-tint);
}
</style>