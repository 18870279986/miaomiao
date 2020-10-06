<template>
    <footer id="footer">
        <ul>
        <!-- router-link 路由跳转组件, tag表示该组件的标签,to表示要跳转的路由 -->
        <router-link tag="li" to="/movie">
            <i class="iconfont icon-dianying"></i>
            <p>电影</p>
        </router-link>
        <router-link tag="li" to="/cinema">
            <i class="iconfont icon-yingyuan"></i>
            <p>影院</p>
        </router-link>
        <router-link tag="li" to="/mine">
            <i class="iconfont icon-wode"></i>
            <p>我的</p>
        </router-link>
        </ul>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped>
    #footer {
        width: 100%;
        height: 50px;
        background: white;
        border-top: 2px #ebe8e3 solid;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    #footer ul {
        display: flex;
        text-align: center;
        height: 50px;
        align-items: center;
    }
    #footer ul li {
        flex: 1;
        height: 40px;
    }
    #footer ul li.active {
        color: #f03d37;
    }
    /* 
    =====>> .router-link-active 这个类是Vue提供的,表示当前路由的状态。
    */
    #footer ul li.router-link-active {
        color: #f03d37;
    }
    #footer ul i {
        font-size: 20px;
    }
    #footer ul p {
        font-size: 12px;
        line-height: 18px;
    }
</style>
