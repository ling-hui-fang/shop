<template>
    <swiper ref="swiper" v-if="banners.length">
        <swiper-item v-for="(item,index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import { Swiper, SwiperItem } from 'common/swiper'

    export default {
        name: "HomeSwiper",
        data(){
            return {
                isLoad:false
            }
        },
        components: {
            Swiper,
            SwiperItem
        },
        props:{
            banners:{
                type:Array,
                default:[]
            }
        },
        methods:{
            stopTimer(){
                this.$refs.swiper.stopTimer()
            },
            startTimer(){
                if(this.$refs.swiper){
                    this.$refs.swiper.startTimer()
                }
            },
            imageLoad(){
                if(!this.isLoad){
                    this.$emit('swiperImageLoad')
                }
            }
        }
        
    }
</script>

<style scoped>

</style>