<template>
    <!-- 把 better-scroll 封装一个组件,因为很多地方都要用到 下拉刷新，上拉加载 -->
    <div class="wrapper" ref="wrapper">
        <!-- slot 插槽 -->
        <slot></slot>
    </div>
</template>

<script>
//引入 better-scroll 第三方插件
import BScroll from 'better-scroll';

export default {
    name : 'Scroller',
    // 父子组件的 通信 传值
    props : {
        handleToScroll : {
            type : Function,
            default : function(){}
        },
        handleToTouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    mounted() {
        //初始化 better-scroll 插件
        var scroll = new BScroll( this.$refs.wrapper, {
            tap : true,
            probeType: 1
        });

        this.scroll = scroll;

        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos);
        });

        scroll.on('touchEnd',(pos)=>{
            this.handleToTouchEnd(pos);
        });
    },
    methods : {
        //指定滚动到莫位置
        toScrollTop(y) {
            this.scroll.scrollTo(0,y);
        }
    }
}
</script>

<style scoped>
    .wrapper{ height:100%;}
</style>
