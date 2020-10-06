<template>
    <div class="city_body">
        <!-- <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                </ul>
            </div>
            <div class="city_sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>	
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div> -->
        <div class="city_list">
            <Loading v-if="isLoading" />
            <Scroller v-else ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotLists" :key="item.id" @tap="handleToCity(item.nm , item.id)">{{ item.nm }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityLists" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="itemList in item.lists" :key="itemList.id" @tap="handleToCity(itemList.nm , itemList.id)">{{ itemList.nm }}</li>
                            </ul>
                        </div>	
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityLists" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { constants } from 'crypto';
    export default {
        name: 'city',
        data() {
            return {
                hotLists: [],  //热门城市
                cityLists: [], //城市列表
                isLoading: true,
            }
        },
        methods: {

        },
        //生命周期函数
        mounted() {
            // let url = 'http://xiaoqu.blankqwq.com/api/village/all';
            //先判断本地是否有数据。没有数据再去请求接口，拿数据
            let cityLists = window.localStorage.getItem('cityLists');
            let hotLists = window.localStorage.getItem('hotLists');
            if (cityLists && hotLists) {
                this.cityLists = JSON.parse(cityLists);
                this.hotLists = JSON.parse(hotLists);
                //初始化页面样式
                this.isLoading = false;
            } else {
                this.axios.get('/api/cityList').then( (res) => {
                    console.log(res.data);
                    var msg = res.data.msg;
                    if(msg === 'ok'){
                        var cities = res.data.data.cities;
                        //cityLists 数据结构是 ==> [ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
                        var { cityLists , hotLists } = this.formatCityList(cities);
                        this.cityLists = cityLists;
                        this.hotLists = hotLists;
                        //初始化页面样式
                        this.isLoading = false;
                        //把城市数据保存到本地
                        window.localStorage.setItem('cityLists' , JSON.stringify(cityLists));
                        window.localStorage.setItem('hotLists' , JSON.stringify(hotLists));

                        console.log(hotLists);
                        console.log(cityLists);
                    }
                });
            }
            
        },
        methods: {
            //城市分类
            formatCityList(cities){
                var cityLists = [];
                var hotLists = [];
                //选出热门城市，把他们添加到  hotLists 数组中
                for (let i=0; i<cities.length; i++) {
                    if (cities[i].isHot === 1) {
                        hotLists.push( cities[i] );
                    }
                }

                for (let i=0; i<cities.length; i++) {
                    //拿到该城市首字母大写, firstLetter 是 该城市的首字母 
                    var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                    if (toCom(firstLetter)) {  
                        //新添加 index
                        cityLists.push({ index : firstLetter , lists : [ { nm : cities[i].nm , id : cities[i].id } ] });
                    } else {   
                        //累加到已有index中
                        for(let j=0; j<cityLists.length; j++){
                            if( cityLists[j].index === firstLetter ){
                                cityLists[j].lists.push( { nm : cities[i].nm , id : cities[i].id } );
                            }
                        }
                    }
                }
                //给城市列表排序，A - Z 的顺序
                cityLists.sort( (n1, n2) => {
                    //n1.index, n2.index 是 大写字母。字母之间是可以比较大小的
                    if ( n1.index > n2.index ) {
                        return 1;
                    } else if ( n1.index < n2.index ) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                //判断该 字母 在 cityLists 中是否存在,不存在就要添加这个 字母对象{index: 'N',list: []}
                function toCom(firstLetter){
                    for(let i=0; i<cityLists.length; i++){
                        if( cityLists[i].index ===  firstLetter){
                            return false;
                        }
                    }
                    return true;
                }
                //返回 城市列表 和 热门城市 数组
                return {
                    cityLists,
                    hotLists
                };

            },
            //选择右边 字母 
            handleToIndex(index){
                var h2 = this.$refs.city_sort.getElementsByTagName('h2');
                //一、原生写法，现在加入了 better-scroll插件，原生的 scrollTop 属性不生效了
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
                console.log( h2[index].offsetTop );
                //二、此时 this.$refs.city_List 就是 Scroller 组件, 可以调用 该组件下的 方法 toScrollTop()
                this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
            },
            //选择 城市列表 中的 城市
            handleToCity(nm,id){
                console.log(nm);
                //===============>>>>>修改状态管理
                this.$store.commit('city/CITY_INFO',{ nm , id });
                //把选择的 城市 保存到本地
                window.localStorage.setItem('nowNm',nm);
                window.localStorage.setItem('nowId',id);
                //跳转到 正在热映 
                this.$router.push('/movie/nowplaying');
            },
        },
    }
</script>

<style scoped>
    #content .city_body {
        margin-top: 45px;
        display: flex;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
    }
    .city_body .city_list {
        flex: 1;
        overflow: auto;
        background: #fff5f0;
    }
    .city_body .city_list::-webkit-scrollbar {
        background-color: transparent;
        width: 0;
    }
    .city_body .city_hot {
        margin-top: 0px;
    }
    .city_body .city_hot h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
    }
    .city_body .city_hot ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
    }
    .city_body .city_sort div {
        margin-top: 20px;
    }
    .city_body .city_sort h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
    }
    .city_body .city_sort ul {
        padding-left: 10px;
        margin-top: 10px;
    }
    .city_body .city_sort ul li {
        line-height: 30px;
        line-height: 30px;
    }
    .city_body .city_index {
        width: 28px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-left: 1px #e6e6e6 solid;
    }
   
</style>