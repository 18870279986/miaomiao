<template>
    <div id="detailContrainer" class="slide-enter-active">
        <!-- 映入的是 头 组件 -->
        <Header title="影片详情">
            <!-- 这是 返回箭头，要在 Header 组件 设置插槽，专门来放置 返回箭头这个标签的 -->
			<!-- 也可以指定用哪个插槽 i 标签中 slot='插槽名字' -->
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <Loading v-if="isLoading" />
		<div v-else id="content" class="contentDetail">
			<!-- <div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img src="/images/movie_1.jpg" alt="">
					</div>
					<div class="detail_list_info">
						<h2>无名之辈</h2>
						<p>A Cool Fish</p>
						<p>9.2</p>
						<p>剧情,喜剧,犯罪</p>
						<p>中国大陆 / 108分钟</p>
						<p>2018-11-16大陆上映</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>在一座山间小城中，一对低配劫匪、一个落魄的泼皮保安、一个身体残疾却性格彪悍的残毒舌女以及一系列生活在社会不同轨迹上的小人物，在一个貌似平常的日子里，因为一把丢失的老枪和一桩当天发生在城中的乌龙劫案，从而被阴差阳错地拧到一起，发生的一幕幕令人啼笑皆非的荒诞喜剧。</p>
			</div>
			<div class="detail_player swiper-container">
				<ul class="swiper-wrapper">
					<li class="swiper-slide">
						<div>
							<img src="/images/movie_1.jpg" alt="">
						</div>
						<p>陈建斌</p>
						<p>马先勇</p>
					</li>
				</ul>
			</div> -->
            <div class="detail_list">
				<div class="detail_list_bg" :style="{ 'background-image' : 'url('+ detailMovie.img.replace(/w\.h/,'148.208') +')' }"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.img | setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{ detailMovie.nm }}</h2>
						<p>{{ detailMovie.enm }}</p>
						<p>{{ detailMovie.sc }}</p>
						<p>{{ detailMovie.cat }}</p>
						<p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
						<p>{{ detailMovie.pubDesc }}</p>
					</div>
				</div>
			</div>
            <div class="detail_intro">
				<p>
                    {{ detailMovie.dra }}
                </p>
			</div>
            <div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
						<div>
							<img :src="item | setWH('180.120')" alt="">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

import Header from '@/components/Header';

export default {
    name : 'Detail',
    data(){
        return {
            detailMovie : {},
            isLoading : true
        }
    },
    components : {
        Header
    },
    props : ['movieId'], //========>>>接受参数 可以通过this.movieId 获取
    methods : {
        handleToBack(){
            //返回上一级路由
            this.$router.back();
        }
    },
    mounted(){
        //通过这种方法可以获取 url 动态参数
        // console.log( this.$route );

        console.log( this.movieId );
        this.axios.get('/api/detailmovie?movieId='+ this.movieId).then((res)=>{
            var msg = res.data.msg;
            if (msg === 'ok') {
//关闭页面加载样式,让数据渲染出来,一定要在 Swiper插件 初始化之前 渲染出页面。所以this.isLoading = false;要在前面
                this.isLoading = false;

                this.detailMovie = res.data.data.detailMovie;
                //轮播数据渲染完成之后才去初始化 swiper 插件,否则会无效
                this.$nextTick( ()=>{
                    new Swiper(this.$refs.detail_player , {
                        slidesPerView : 'auto',
                        freeMode : true,
                        freeModeSticky: true
                    });
                });
            }
        });
    }
}
</script>

<style scoped>
/* 设置定位为了 覆盖掉 首页 正在热映 页面。全部覆盖  */
#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white;}
/* 设置animation动画效果,当点击进入详情页的时候,会有一个划过来的 动画效果 */
#detailContrainer.slide-enter-active { 
    animation: 0.3s slideMove;
}
@keyframes slideMove {
    0% { 
        /* 一进来,页面在最右边(因为translateX(100%) 让页面显示在了 最右边) */
        transform : translateX(100%); 
    }
    100% { 
        transform : translateX(0); 
    }
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>
