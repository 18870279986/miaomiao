import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from './stores/index'

//引入 axios 
import axios from 'axios'
Vue.prototype.axios = axios;

//配置全局过滤器,图片地址中有 w.h 表示 可以设置 图片的具体 宽高
// setWH 是 过滤器名称, 第一个参数 url表示 谁做处理就是谁,这里就是 图片地址。arg 表示传过来的宽高 ('128.180') 
Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg);
});

//把Scroller 组件注册为全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller);

//把 Loading 组件注册为全局组件
import Loading from '@/components/Loading'
Vue.component('Loading', Loading);

//引入 element ui 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入 mint-ui插件的 上拉加载更多组件
import { Loadmore } from  'mint-ui';
Vue.component(Loadmore.name, Loadmore);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
