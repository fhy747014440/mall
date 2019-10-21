<template>
    <div class="tab_bar_item" @click="itemClick">
        <div v-if="!isActive">
            <slot  name="item_icon"></slot>
        </div>
        <div v-else>
            <slot  name="item_icon_active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item_text"></slot>
        </div>
       <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div>-->

    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            //接收参数
            path:String,
            activeColor:{
                type:String,
                default:'red'
            }
        },
        data(){
           return{
              // isActive:true
           }
        },
        computed:{
            isActive(){
                //当前路由的路径是否是传入的路径
                return this.$route.path.indexOf(this.path) !==-1
            },
            activeStyle(){
                return this.isActive?{color:this.activeColor}:{}
            }
        },
        methods:{
            itemClick(){
                //别人传值过来再跳转路由
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
    .tab_bar_item{
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }
    .tab_bar_item img{
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }

</style>
