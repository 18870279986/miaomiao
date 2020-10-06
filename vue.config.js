module.exports = {
    //如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    // publicPath: '/miaomiao/',  这样项目上线后 静态资源(css/img/js) 就都是 /miaomiao/.....
    devServer: {
        proxy: {
            //这个是我们本地的接口,在本地。要写在第一位
            '/api2': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            //设置一个反向代理，代理我们的接口
            '/api': {
                target: 'http://39.97.33.178',
                changeOrigin: true
            },
        }
    }
}