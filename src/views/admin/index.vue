<template>
    <div>
        管理页面
    </div>
</template>

<script>
//引入 axios ,因为在 beforeRouteEnter() 函数中不能用 this，所以无法使用 this.axios() 
import axios from 'axios';
export default {
    name: 'admin',
    data () {
        return {}
    },
    mounted () {},
    methods : {},
    //使用路由导航守卫,判断用户是否登录,如果没有登录就不是显示 '个人中心' 而是显示 '登录页面'
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        //==========>>>>>>>>>>不！能！获取组件实例 `this`,因为当守卫执行前，组件实例还没被创建
        //调用 获取用户信息接口,如果登录了 就有信息 status=0。没有登录 status=-1
        axios.get('/api2/admin').then((res) => {
            let status = res.data.status;
            if (status == 0) {
                next();
            } else {
                //没有权限，跳转到  /mine/login
                next('/mine/login');
            }
        });
        /*
======>>调用了 获取用户信息接口,可以拿到用户信息,考虑到后期很多地方可能会用到 用户信息
        所以我们把用户信息保存到 项目转台管理中
        */
    },

}
</script>

<style>

</style>