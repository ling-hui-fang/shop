<template>
    <div class="detail">
        <detail-nav-bar/>
        <scroll class="content">
            <detail-swiper :top-images="topImages" />
            <detail-base-info :goods="goods" />
            <detail-shop-info :shop="shop" />
        </scroll>
        
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'

    import Scroll from 'components/common/scroll/Scroll'

    import { getDetail,Goods,Shop } from 'network/detail'
    export default {
        name: 'Detail',
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{}
            }
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll

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
        },
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