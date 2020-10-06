
/* 
    store 管理器
*/
import Vue from 'vue'
import Vuex from 'vuex'

//引入城市管理
import city from './city'
//引入用户信息
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        city,
        user
    },
})
