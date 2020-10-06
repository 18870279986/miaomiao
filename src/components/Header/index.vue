<template>
    <header id="header">
        <!-- <slot>标签放置插槽的 slot标签中有 name属性 表示插槽的名字 -->
        <slot></slot>
        <h1>{{ title }}</h1>
    </header>
</template>

<script>
export default {
    name: "Header",
    //=====>> props 属性 接受父子级组件的传值,有验证效果
    props: {
        title: {    //定义title 字段的类型,string。
            type: String,  
            default: "喵喵电影"
        }
    },
    data () {
        return {
            myData: '',
        }
    },
    beforeCreate () {
        // console.log(this.title);//拿不到title的值
    },
    created () {
        // console.log(this.title); //可以拿到title的值
        // this.myData = this.title;
        // console.log(this.myData);
    },
    beforeMount () {
        // console.log(this.title);
    },
    mounted () {
        // console.log(this.title);
    },

};
</script>

<style scoped>
    #header {
        width: 100%;
        height: 50px;
        color: #fff;
        background: #e54847;
        border-bottom: 1px solid #e54847;
        position: relative;
    }
    #header h1 {
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        font-weight: normal;
    }
    #header i {
        position: absolute;
        left: 5px;
        top: 50%;
        margin-top: -13px;
        font-size: 26px;
    }
</style>
