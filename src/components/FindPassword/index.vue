<template>
    <div class="main">
        <div class="item">
            <div class="item_left">邮箱:</div>
            <input type="email" name="email" v-model="email" />   
            <span class="zym_btn" @touchstart='handleToVerify()' >发送验证码</span>
        </div>
        <div class="item">
            <div class="item_left">新密码:</div>
            <input type="password" name="password" v-model="password" />   
        </div>
        <div class="item">
            <div class="item_left">验证码:</div>
            <input type="number" name="number" v-model="verify" />   
        </div>
        <div class="register_btn">
            <input type="submit" value="修改密码" @touchstart='handleToPassword()' />
        </div>
        <div class="login_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
import { messageBox } from '@/components/JS/index.js'
export default {
    name: 'findpassword',
    data () {
        return {
            email: '',
            password: '',
            verify: '',
        }
    },
    mounted () {},
    methods : {
        //发送验证码
        handleToVerify () {
            this.axios.get('/api2/users/verify?email='+this.email).then((res) => {
                let status = res.data.status;
                if (status == 0) {
                    messageBox({
                        title : '验证码',
                        content : '验证码已经发送',
                        ok : '确定'
                    });
                } else {
                    messageBox({
                        title : '验证码',
                        content : '验证码发送失败',
                        ok : '确定'
                    });
                }
            }).catch((err) => {
                alert(err);
            });
        },
        //修改密码
        handleToPassword () {
            this.axios.post('/api2/users/findPassword', {
                email: this.email,
                verify: this.verify,
                password: this.password
            }).then((res) => {
                console.log(res.data);
                let status = res.data.status;
                let This = this;
                if (status == 0) {
                    messageBox({
                        title : '提示',
                        content : '修改密码成功',
                        ok : '确定',
                        handleOk () {
                            //点击确定后,切换 登录
                            This.$router.push('/mine/login');
                        }
                    });
                } else {
                    messageBox({
                        title : '提示',
                        content : '修改密码失败',
                        ok : '确定',
                        handleOK () {
                            console.log('失败');
                        }
                    });
                }
            });
        },
    }
}
</script>

<style scoped>
    .item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #DEDEDE;
        padding: 10px 20px;
        position: relative;
    }
    .item_left {
        width: 22%;
    }
    .item input {
        border: none;
        outline: none;
        padding-left: 10px;
    }
    .zym_btn {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #DEDEDE;
        font-size: 14px;
        padding: 4px;
    }
    .register_btn {
        height: 50px;
        margin: 10px;
    }
    .register_btn input {
        width: 100%;
        height: 100%;
        background: #e54847;
        border-radius: 3px;
        border: none;
        display: block;
        color: white;
        font-size: 20px;
    }
    .login_link {
        display: flex;
        justify-content: space-between;
    }
    .login_link a {
        text-decoration: none;
        margin: 0 5px;
        font-size: 12px;
        color: #e54847;
    }
</style>