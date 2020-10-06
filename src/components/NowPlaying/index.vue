<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading" />
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <!-- <li>
                    <div class="pic_show">
                    <img src="/images/movie_1.jpg" />
                    </div>
                    <div class="info_list">
                    <h2>无名之辈</h2>
                    <p>
                        观众评
                        <span class="grade">9.2</span>
                    </p>
                    <p>主演: 陈建斌,任素汐,潘斌龙</p>
                    <p>今天55家影院放映607场</p>
                    </div>
                    <div class="btn_mall">购票</div>
                </li> -->
                <li class="pullDown">{{ pullDownMsg }}</li>
                <li v-for="item in movieLists" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)">{{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                        <p>观众评 <span class="grade">{{ item.sc }}</span></p>
                        <p>主演: {{ item.star }}</p>
                        <p>{{ item.showInfo }}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
    //引入 better-scroll 第三方插件
    import BScroll from 'better-scroll';
    import { setTimeout } from 'timers';

    export default {
        name: 'NowPlaying',
        data() {
            return {
                movieLists: [],
                pullDownMsg : '',
                isLoading : true,
                prevCityId : -1,  //当前选择的城市id
            }
        },
        // mounted 生命周期函数, 如是 <keep-alive> <router-view /> </keep-alive> 有缓存,则路由之间的切换时，不会促发
        // 在城市选择 页面，选择了城市后，这里的数据需要换成选择的城市的数据。所以 需求是要促发这个 函数 拿到新数据
        // 这里 可以用 activated() 生命周期函数, 每次切换都会执行这个 activated() 配合 <keep-alive>使用
        activated() {
            //从状态管理那拿到 选择的 城市,判断是不是 当前 prevCityId(城市id) 
            let cityId = this.$store.state.city.id;
            if (cityId === this.prevCityId) {
                return;
            }

            console.log(1212);
            this.isLoading = true;
            this.axios.get('/api/movieOnInfoList?cityId='+cityId).then( (res) => {
                var msg = res.data.msg;
                console.log(res.data.data.movieList);
                if (msg === 'ok') {
                    this.movieLists = res.data.data.movieList;

                    this.isLoading = false;
                    this.prevCityId = cityId;

                    //当页面数据都渲染成功后会调用这个方法
                    // this.$nextTick( () => {
                    //     var scroll = new BScroll( this.$refs.movie_body, {
                    //         tap: true,
                    //         probeType: 1,
                    //     });

                    //     scroll.on('scroll', (pos) => {
                    //         // console.log(pos.x + '~~~' + pos.y);
                    //         if (pos.y > 50) {
                    //             this.pullDownMsg = '正在更新中';
                    //             // console.log('正在更新中');
                    //         }
                    //     });

                    //     scroll.on('touchEnd', (pos) => {
                    //         if (pos.y > 50) {
                    //             this.axios.get('/api/movieOnInfoList?cityId=1').then( (res) => {
                    //                 var msg = res.data.msg;
                    //                 if (msg === 'ok') {
                    //                     this.pullDownMsg = '更新成功';
                    //                     setTimeout( () => {
                    //                         this.movieLists = res.data.data.movieList;
                    //                         this.pullDownMsg = '';
                    //                     }, 1000);
                                        
                    //                 }
                    //             });
                    //         }
                    //     });
                    // });
                    // this.isLoading = false;
                    // this.prevCityId = cityId;
                }
            })
        },
        methods: {
            //进入详情
            handleToDetail(movieId) {
                // console.log(movieId);
                //路由的跳转
                this.$router.push('/movie/detail/1/' + movieId);
            },
            //下拉
            handleToScroll(pos) {
                if (pos.y > 30) {
                    this.pullDownMsg = '正在更新中';
                }
            },
            //触摸结束
            handleToTouchEnd(pos) {
                if (pos.y > 30) {
                    this.axios.get('/api/movieOnInfoList?cityId=1').then( (res) => {
                        var msg = res.data.msg;
                        if (msg === 'ok') {
                            this.pullDownMsg = '更新成功';
                            setTimeout(()=>{
                                this.movieLists = res.data.data.movieList;
                                this.pullDownMsg = '';
                            },1000);                       
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #content .movie_body {
        flex: 1;
        overflow: auto;
    }
    .movie_body ul {
        margin: 0 12px;
        overflow: hidden;
    }
    .movie_body ul li {
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 10px;
    }
    .movie_body .pic_show {
        width: 64px;
        height: 90px;
    }
    .movie_body .pic_show img {
        width: 100%;
        height: 100%;
    }
    .movie_body .info_list {
        margin-left: 10px;
        flex: 1;
        position: relative;
    }
    .movie_body .info_list h2 {
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .movie_body .info_list p {
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .movie_body .info_list .grade {
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
    }
    .movie_body .info_list img {
        width: 50px;
        position: absolute;
        right: 10px;
        top: 5px;
    }
    .movie_body .btn_mall,
    .movie_body .btn_pre {
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }
    .movie_body .btn_pre {
        background-color: #3c9fe6;
    }
    .movie_body .pullDown {
        display: block;
        margin: 0;
        padding: 0;
        border: none;
        text-align: center;
    }
</style>