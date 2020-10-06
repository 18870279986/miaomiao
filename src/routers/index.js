import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import adminRouter from './admin'

Vue.use(Router)

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    //base 改的是 路由的路径 
    base: 'miaomiao',   //此时访问 路劲就要从 miaomiao 下访问,  比如: /miaomiao/movie/nowplaying
    routes: [
       movieRouter,
       cinemaRouter,
       mineRouter,
       adminRouter,
       //当路劲都不匹配的时候，就会重定向 跳转 movie 页面
       {
           path: '/*',
           redirect: '/movie'
       }
    ]
})
