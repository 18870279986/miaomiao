export default {
    path: '/movie',
    component: () => import('@/views/movie'),
    //配置二级路由
    children: [
        {
            path: 'city', //这里不能加 '/',加了 / 表示绝对路劲。这里的 city 是 相对 /movie 下的路径
            component: () => import('@/components/City')
        },
        {
            path: 'nowplaying', 
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'comingsoon', 
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search', 
            component: () => import('@/components/Search'),
            //如是这种 路由 用 props 接收传值，直接设置 props: true。
        },
        {
            path : 'detail/1/:movieId', //这里要配置 动态路由,传递的是 电影的 id。
            components : {
                default : () => import('@/components/NowPlaying'), //默认没有名字的路由视图。
                detail : () => import('@/views/movie/detail'),
                //这里的 detail 和 路由 名字对应要一样，
            },
            props : {    //==========>作用是 路由 参数传递 与 components对象 中的参数一一对应, true
                detail : true
            }
        },
        // 为了解决 跳转 详情页后，二级路由视图不为空的为题,还是显示当前 的这个 视图所以这里配置了两个 进入详情页的路由
        {
            // 这里是 从 ''即将上映'列表进入的详情页，此时 二级路由视图显示的是 default: @/components/ComingSoon
            path : 'detail/2/:movieId', //这里要配置 动态路由,传递的是 电影的 id
            components : {
                default : () => import('@/components/ComingSoon'),
                detail : () => import('@/views/movie/detail'),
                //这里的 detail 和 路由 名字对应要一样，
            },
            props : {    
                detail : true
            }
        },
        //二级路由重定向,请求 /movie 是 显示 movie页面中的  nowplaying 二级路由内的内容
        {
            path: '/movie',
            redirect: '/movie/nowplaying',           
        }
    ]
}