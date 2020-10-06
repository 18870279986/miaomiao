<template>
    <div class="cinema_body">
        <!-- <Loading v-if="isLoading" /> -->
        <!-- <Scroller v-else > -->
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" 
                :bottom-pull-text="bottomPullText" :bottomDistance="bottomDistance" 
                @bottom-status-change="handleBottomChange" > 

                <ul>
                    <!-- <li>
                        <div>
                            <span>大地影院(澳东世纪店)</span>
                            <span class="q"><span class="price">22.9</span> 元起</span>
                        </div>
                        <div class="address">
                            <span>金州区大连经济技术开发区澳东世纪3层</span>
                            <span>1763.5km</span>
                        </div>
                        <div class="card">
                            <div>小吃</div>
                            <div>折扣卡</div>
                        </div>
                    </li> -->
                    <li v-for="item in cinemaLists" :key="item.id">
                        <div>
                            <span>{{ item.nm }}</span>
                            <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
                        </div>
                        <div class="address">
                            <span>{{ item.addr }}</span>
                            <span>{{ item.distance }}</span>
                        </div>
                        <div class="card">
                            <div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class=" key | classCard ">{{ key | formatCard }}</div>
                        </div>
                    </li>
                </ul>
            
            </mt-loadmore>
        <!-- </Scroller> -->
    </div>
</template>

<script>
    export default {
        name: "CiList",
        data() {
            return {
                cinemaLists : [],
                isLoading : true,
                prevCityId : -1,

                bottomPullText : "上拉加载更多",
                bottomDistance : 50,
                allLoaded : false,  //若为真, bottom-method方法将不会触发
            }
        },
        activated () {
            // console.log(3333);
            //从状态管理那拿到 选择的 城市,判断是不是 当前 prevCityId(城市id) 
            let cityId = this.$store.state.city.id;
            console.log(cityId);
            if (cityId === this.prevCityId) {
                return;
            }

            this.isLoading = true;
            
            this.axios.get(`/api/cinemaList?cityId=${cityId}`).then( (res) => {
                var msg = res.data.msg;
                console.log(res.data);
                if(msg === 'ok'){
                    this.cinemaLists = res.data.data.cinemas;
                    this.isLoading = false;
                    this.prevCityId = cityId
                }
            }, (err) => {
                console.log(err);
            });
        },
        methods: {
            //上拉加载
            loadBottom () {
                console.log(1212);
            },
            handleBottomChange (status) {
                console.log(status);
            },
        },
        //自定义过滤器
        filters : {
            //卡片过滤器
            formatCard (key) {
                var card = [
                    { key : 'allowRefund' , value : '改签' },
                    { key : 'endorse' , value : '退' },
                    { key : 'sell' , value : '折扣卡' },
                    { key : 'snack' , value : '小吃'}
                ];
                for(var i=0; i<card.length; i++){
                    if(card[i].key === key){
                        return card[i].value;
                    }
                }
                return '';
            },
            //不同的卡片对应不同的颜色样式
            classCard (key) {
                var card = [
                    { key : 'allowRefund' , value : 'bl' },
                    { key : 'endorse' , value : 'bl' },
                    { key : 'sell' , value : 'or' },
                    { key : 'snack' , value : 'or'}
                ];
                for(var i=0; i<card.length; i++){
                    if (card[i].key === key) {
                        return card[i].value;
                    }
                }
                return '';
            }
        }
    }
</script>

<style scoped>
    #content .cinema_body {
        flex: 1;
        overflow: auto;
    }
    .cinema_body ul {
        padding: 20px 20px 0px 20px;
    }
    .cinema_body li {
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
    }
    .cinema_body ul li div {
        margin-bottom: 10px;
    }
    .cinema_body .q {
        font-size: 11px;
        color: #f03d37;
    }
    .cinema_body .price {
        font-size: 18px;
    }
    .cinema_body .address {
        font-size: 13px;
        color: #666;
    }
    .cinema_body .address span:nth-of-type(2) {
        float: right;
    }
    .cinema_body .card {
        display: flex;
    }
    .cinema_body .card div {
        padding: 0 3px;
        height: 15px;
        line-height: 15px;
        border-radius: 2px;
        color: #f90;
        border: 1px solid #f90;
        font-size: 13px;
        margin-right: 5px;
    }
    .cinema_body .card div.or {
        color: #f90;
        border: 1px solid #f90;
    }
    .cinema_body .card div.bl {
        color: #589daf;
        border: 1px solid #589daf;
    }

</style>