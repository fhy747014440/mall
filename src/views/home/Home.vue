<template>
    <div id="home">
        <!--导航-->
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control class="tab-control"
                     :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1" v-show="isTabFixed"/>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <!--轮播图 从home获取数据并将数据绑定过去-->
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control class="tab-control"
                         :titles="['流行','新款','精选']"
                         @tabClick="tabClick"
                         ref="tabControl2"/>
            <goods-list :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/> <!--@click.native监听组件原生事件-->



    </div>
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'

    import {getHomeMltidata,getHomeGoods} from "network/home";
    import {debounce} from "common/utils";

    export default {
        name: "Home",
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
        data(){
           return{
               banners:[],
               recommends:[],
               goods:{
                   'pop':{page:0,list:[]},
                   'new':{page:0,list:[]},
                   'sell':{page:0,list:[]},
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
        activated(){
            console.log('activated');
            this.$refs.scroll.scrollTo(0,this.saveY,0);
            this.$refs.scroll.refresh()
        },
        deactivated(){
            this.saveY=this.$refs.scroll.getScrollY();
            console.log(this.saveY);
        },
        created() {
            this.getHomeMltidata();
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

        },
        mounted(){

            //监听图片加载
            const refresh=debounce(this.$refs.scroll.refresh,500);
            this.$bus.$on('itemImageLoad',()=>{
                //重刷新
                refresh();
            });

        },
        methods:{

            /*事件监听相关方法*/
            tabClick(index){
                switch (index) {
                    case 0:this.currentType='pop';break;
                    case 1:this.currentType='new';break;
                    case 2:this.currentType='sell';break;
                }
                this.$refs.tabControl1.currentIndex=index;
                this.$refs.tabControl2.currentIndex=index;
            },
            backClick(){
                this.$refs.scroll.scrollTo(0,0);
            },
            contentScroll(position){
                //1判断BackTop是否显示
                this.isShowBackTop=(-position.y)>1000;
                //2决定是否吸顶
                this.isTabFixed=(-position.y)>this.tabOffsetTop

            },
            loadMore(){
               this.getHomeGoods(this.currentType);
               this.$refs.scroll.scroll.refresh()//图片加载完重新计算滚动高度
            },
            swiperImageLoad(){
                //赋值
                //所有组件都有一个属性$el 用于获取组件的元素
                this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
            },

            getHomeMltidata(){
                //请求多个数据
                getHomeMltidata().then(res=>{
                    this.banners=res.data.data.banner.list;
                    this.recommends=res.data.data.recommend.list;
                });
            },
            getHomeGoods(type){
                const page=this.goods[type].page+1;
                //请求商品数据
                getHomeGoods(type,page).then(res=>{
                    this.goods[type].list.push(...res.data.data.list);
                    this.goods[type].page+=1;
                    //加载完之后调用
                    this.$refs.scroll.finishPullUp()
                })
            },
        }

    }
</script>

<style scoped>
    #home{
        padding-top: 44px;
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: white;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    .tab-control{
        position: sticky;
        top: 44px;
        background-color: #fff;
        z-index: 9;
    }
    .content{
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

   /* .content{
        height: calc(100% - 93px);!*整高减去上下两个navBar*!
        overflow: hidden;
        margin-top: 44px;
    }
*/

</style>
