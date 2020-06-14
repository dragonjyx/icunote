# icunote

> i see you future !!!

## 安装比较的UI和工具类
    npm install jquery@3.5.1 --save
    npm i element-ui -S
    npm install --save-dev sass-loader
    npm install --save-dev node-sass
    npm install less-loader@4.1.0 --save-dev
    npm install less@3.11.3 --save-dev
    npm install babel --save-dev


## 在main.js 引入
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
    Vue.use(ElementUI)
## 在webpack.base.conf.js 引入
    rules:[
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
       {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader'
        }
    ]

## 在webpack.dev.config.js 引入
      //plugin 引入jQuery
      new webpack.ProvidePlugin({
        $              : "jquery",
        jQuery         : "jquery",
        "window.jQuery": "jquery",
        "root.jQuery"  : "jquery",
      })

## 构建步骤

``` bash
# 构建
npm install

# 服务器热部署： localhost:8080
npm run dev

# 构建打包
npm run build

# 构建打包分析报告
npm run build --report
```








