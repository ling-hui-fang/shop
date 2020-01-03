<template>
    <div class="detail">
        <detail-nav-bar/>
        <scroll class="content">
            <detail-swiper :top-images="topImages" />
            <detail-base-info :goods="goods" />
            <detail-shop-info :shop="shop" />
            <detail-goods-info :detail-info="detailInfo" @imagLoad="imagLoad"/>
            <detail-param-info :param-info = "paramInfo" ref="params"/>
            <detail-comment-info :comment-info="commentInfo" ref="comment"/> 
            <goods-list :goods="recommends"/>
        </scroll>
        
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import GoodsList from 'components/content/goods/GoodsList'

    import Scroll from 'components/common/scroll/Scroll'

    import { getDetail,Goods,Shop } from 'network/detail'
    export default {
        name: 'Detail',
        data(){
            return {
               id: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null
            }
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            Scroll,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList
        },
        created() {
            //1.保存传入的iid
            this.iid = this.$route.params.iid
            //2.根据iid请求详情数据
            getDetail(this.iid).then(res => {
                //1.获取顶部的图片轮播图数据
                const data = res.result;
                this.topImages = res.result.itemInfo.topImages
                console.log(res);
                //2.获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                //3.创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)
            })
            //4.给getThemeTopY赋值
            this.getThemeTopY = debounce(()=>{
                this.themeTopYs = []
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            },100)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#detail {
    position: relative;
    z-index:9;
    background-color: #fff;
    height:100vh;
}
.content {
    height:calc(100% - 44px);
}
.detail-nav {
    position: relative;
    z-index:9;
    background-color:#fff;
}
</style>