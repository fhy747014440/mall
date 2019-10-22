<template>
    <div id="home">
        <!--导航-->
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <!--轮播图 从home获取数据并将数据绑定过去-->
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
        <ul>
            <li>列表1</li>
            <li>列表2</li>
            <li>列表3</li>
            <li>列表4</li>
            <li>列表5</li>
            <li>列表6</li>
            <li>列表7</li>
            <li>列表8</li>
            <li>列表9</li>
            <li>列表10</li>
            <li>列表11</li>
            <li>列表12</li>
            <li>列表13</li>
            <li>列表14</li>
            <li>列表15</li>
            <li>列表16</li>
            <li>列表17</li>
            <li>列表18</li>
            <li>列表19</li>
            <li>列表20</li>
            <li>列表21</li>
            <li>列表22</li>
            <li>列表23</li>
            <li>列表24</li>
            <li>列表25</li>
            <li>列表26</li>
            <li>列表27</li>
            <li>列表28</li>
            <li>列表29</li>
            <li>列表30</li>
            <li>列表31</li>
            <li>列表32</li>
            <li>列表33</li>
            <li>列表34</li>
            <li>列表35</li>
            <li>列表36</li>
            <li>列表37</li>
            <li>列表38</li>
            <li>列表39</li>
            <li>列表40</li>
            <li>列表41</li>
            <li>列表42</li>
            <li>列表43</li>
            <li>列表44</li>
            <li>列表45</li>
            <li>列表46</li>
            <li>列表47</li>
            <li>列表48</li>
            <li>列表49</li>
            <li>列表50</li>
        </ul>

    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import TabControl from 'components/content/tabControl/TabControl'

    import {getHomeMltidata} from "network/home";

    export default {
        name: "Home",
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl
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
    #home{
        padding-top: 44px;
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
    }

</style>
