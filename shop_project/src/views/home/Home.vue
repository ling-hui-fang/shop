<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" 
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick" 
                ref="tabControl1"
                v-show="isTabFixed"
                >
    </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/common/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import { itemListenerMixin } from 'common/mixin'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'Home',
  mixins:[itemListenerMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('home destory')
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scrollTo.refresh()
  },
  deactivated() {
    //1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    //2.取消全局事件监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
      //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell')

    //3.监听item中图片加载完成
    this.$bus.$on('itemImgLoad',()=>{
      this.$refs.scroll.refresh()
    })
  },
  methods: {
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop
    },
    tabClick(index) {
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      })
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  padding-top:44px;
  padding-bottom:50px;
}
.home-nav{
  background-color:var(--color-tint);
  color:white;

  position: fixed;
  top:0;
  left:0;
  right:0;
  z-index:9;
}
.tab-control {
  /* position:sticky;
  top:44px; */
  position:relative;
  z-index:9;
}
/* .content{
  height:calc(100%-93px);
  overflow: hidden;
  margin-top:44px;
} */
.content {
  position: absolute;
  top:44px;
  bottom:49px;
  left:0;
  right:0;
}
</style>
