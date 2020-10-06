<template>
    <div id="main">
        <!-- 映入components中的组件 -->
        <!-- title 属性是组件传值 -->
        <Header title="喵喵电影1" />
        <!-- 城市、正在热映、即将上映、搜索导航 -->
        <div id="content">
            <div class="movie_menu">
                <!-- 城市选择 -->
                <router-link tag="div" to="/movie/city" class="city_name">
                    <span>{{ $store.state.city.nm }}</span>
                    <i class="iconfont icon-lower-triangle"></i>
                </router-link>               
                <div class="hot_swtich">
                    <!-- 正在热映 -->
                    <router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
                    <!-- 即将上映 -->
                    <router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
                </div>
                <!-- 搜索 -->
                <router-link tag="div" to="/movie/search" class="search_entry">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>
            <!-- 二级路由下对应的视图(城市选择、正在热映、即将上映、搜索对应的视图内容) -->
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>

        <!-- 电影详情页路由视图 这是命名试图，name='detail'，  -->
        <!-- 该视图和 上面的 正在热映等视图不冲突,url是 /movie/detail 才会显示这个视图，否则是不会显示的 -->
        <router-view name="detail" />

        <!-- 底部(电影、影院、我的) -->
        <TabBar />
    </div>
</template>

<script>

// 引入头组件 和 底部组件。 @ 表示当前的 src目录
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
//定位弹框组件
import { messageBox } from '@/components/JS';

export default {
    name: "movie",
    components: {
        //把组件注入到components中
        Header,
        TabBar
    },
    mounted () {
        //开启定位
        setTimeout(()=>{
            this.axios.get('/api/getLocation').then((res)=>{
                var msg = res.data.msg;
                if(msg === 'ok'){

                    var nm = res.data.data.nm;
                    var id = res.data.data.id;
                    if (this.$store.state.city.id == id) {
                        return;
                    }
                    messageBox({
                        title : '定位',
                        content : nm,
                        cancel : '取消',
                        ok : '切换定位',
                        handleOk(){
                            window.localStorage.setItem('nowNm',nm);
                            window.localStorage.setItem('nowId',id);
                            window.location.reload();
                        }
                    });
                }
            });
        },3000);
       
    }
};
</script>


<style scoped>
/* scoped 表示当前这个 style 中的样式 只会在这个.vue中有效，就是局部样式，不加scoped 表示全局样式*/
    #content .movie_menu {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        z-index: 10;
    }
    .movie_menu .city_name {
        margin-left: 20px;
        height: 100%;
        line-height: 45px;
    }
    .movie_menu .city_name.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }
    .movie_menu .city_name.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }
    .movie_menu .hot_swtich {
        display: flex;
        height: 100%;
        line-height: 45px;
    }
    .movie_menu .hot_item {
        font-size: 15px;
        color: #666;
        width: 80px;
        text-align: center;
        margin: 0 12px;
        font-weight: 700;
    }
    /* .movie_menu .hot_item.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    } */
    .movie_menu .hot_item.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }
    .movie_menu .search_entry {
        margin-right: 20px;
        height: 100%;
        line-height: 45px;
    }
    .movie_menu .search_entry.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }
    .movie_menu .search_entry.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }
    .movie_menu .search_entry i {
        font-size: 24px;
        color: red;
    }
    .slide-enter-active { 
        animation : 13s detailMove;
    }
    @keyframes detailMove{
        0%{
            transform : translateX(100%);
        }
        100%{
            transform : translateX(0);
        }
    }
</style>>

