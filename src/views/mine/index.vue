<template>
    <div id="main">
        <!-- 引入components中的组件 -->
        <Header title="我的喵喵" />
       
        <div id="content">
            <!-- 二级路由下的视图 -->
            <router-view></router-view>
        </div>

        <!-- 引入底部tab组件 -->
        <TabBar />
    </div>
</template>

<script>

// 引入头组件 和 底部组件。 @ 表示当前的 src目录
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Login from '@/components/Login';

export default {
    name: 'mine',
    components: {   //把组件注入到components中
        Header,
        TabBar,
        Login
    }
}
</script>

<style scoped>

</style>