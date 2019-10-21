<template>
    <div id="home">
        <!--导航-->
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <!--轮播图 从home获取数据并将数据绑定过去-->
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"/>

    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import {getHomeMltidata} from "network/home";


    export default {
        name: "Home",
        components:{
            NavBar,
            HomeSwiper,
            RecommendView
        },
        data(){
           return{
               banners:[],
               recommends:[]
           }
        },
        created() {
            //请求多个数据
            getHomeMltidata().then(res=>{
                console.log(res);
                this.banners=res.data.data.banner.list;
                this.recommends=res.data.data.recommend.list;
            })

        }

    }
</script>

<style scoped>
    .home-nav{
        background-color: var(--color-tint);
        color: white;
    }

</style>
