'use strict'
const path = require('path')
const baseConf = require('../config').base
// 拼接路径
const resolve = dir => path.join(__dirname, '..', dir)
// 资源路径
const assetsPath = dir => path.posix.join(baseConf.assetsPath, dir)

//webpack 基本设置
module.exports = {
    //项目入口文件->webpack从此处开始构建！
    entry: {
        app: './src/main.js'
    },

    //配置模块如何被解析
    resolve: {
        //自动解析文件扩展名(补全文件后缀)(从左->右)
        // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
        extensions: [".js", ".jsx", ".json"],

        //配置别名映射
        alias: {
            'src': resolve('src'),
            'components': resolve('src/components'),
            'assets': resolve('src/assets'),
            'views': resolve('src/views'),
            'utils': resolve('src/utils'),
            'actions': resolve('src/actions'),
            'reducers': resolve('src/reducers'),
            'config': resolve('src/config'),
            'connect': resolve('src/utils/connect')
        }
    },

    //处理模块的规则(可在此处使用不同的loader来处理模块！)
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, //资源路径
                loader: 'babel-loader', //该路径执行的loader
                include: resolve("src") //指定哪个文件loader
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}