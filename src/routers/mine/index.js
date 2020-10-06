export default {
    path: '/mine',
    component: () => import('@/views/mine'),
    //配置二级路由
    children : [
        {
            path : 'center',
            component : () => import('@/views/mine/center.vue')
        },
        {
            path : 'login',
            component : () => import('@/components/Login')
        },
        {
            path : 'register',
            component : () => import('@/components/Register')
        },
        {
            path : 'findpassword',
            component : () => import('@/components/FindPassword')
        },
        //重定向
        {
            path : '/mine',
            redirect : '/mine/center'
        }
    ]
}