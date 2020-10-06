<template>
    <div>
        <div>个人中心: </div>
        <div>当前用户: {{ $store.state.user.name }}</div>
        <div v-if="$store.state.user.isAdmin">用户身份: 管理员 <a href="/admin" target="_blank">进入管理后台</a> </div>
        <div v-else>用户身份: 普通会员</div>
        <a href="#" @touchstart='handleToLogout()'>退出</a>
    </div>
</template>

<script>
//引入 axios ,因为在 beforeRouteEnter() 函数中不能用 this，所以无法使用 this.axios() 
import axios from 'axios';
export default {
    name: 'center',
    data () {
        return {}
    },
    mounted () {},
    methods : {
        //退出
        handleToLogout () {
            this.axios.get('/api2/users/logout').then( (res) => {
                console.log(res);
                let status = res.data.status; 
                if (status == 0) {
                    //保存状态管理
                    this.$store.commit('user/USER_NAME',{ name : '', isAdmin : false });
                    //把用户保存到浏览器信息清除
                    window.localStorage.removeItem('user');
                    window.localStorage.removeItem('isAdmin');
                    //退出成功，跳转到登录页面
                    this.$router.push('/mine/login');                   
                }
            });
        },
    },
    //使用路由导航守卫,判断用户是否登录,如果没有登录就不是显示 '个人中心' 而是显示 '登录页面'
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        //==========>>>>>>>>>>不！能！获取组件实例 `this`,因为当守卫执行前，组件实例还没被创建
        //调用 获取用户信息接口,如果登录了 就有信息 status=0。没有登录 status=-1
        axios.get('/api2/users/getUser').then((res) => {
            let status = res.data.status;
            if (status == 0) {
                //登录了,路由不变，继续执行
                //========>>通过传一个回调给 next来访问组件实例
                next((vm) => {
                    //=========>>>通过 `vm` 访问组件实例,vm 就相当于 this
                    vm.$store.commit('user/USER_NAME',{ name : res.data.data.username, isAdmin : res.data.data.isAdmin });
                    //把用户保存到浏览器本地
                    window.localStorage.setItem('user', res.data.data.username);
                    window.localStorage.setItem('isAdmin', res.data.data.isAdmin);
                });
            } else {
                //没有登录，跳转到  /mine/login
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