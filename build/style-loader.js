'use strict'
const path = require('path')
//一个抽离出css的webpack插件！
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const getLessVariables = require('./get-less-variables.js')

exports.cssLoader = function(opts) {
    function generateLoaders(loader, loaderOpts) {
        const loaders = [{ //默认loader
            loader: 'css-loader',
            options: Object.assign({}, {
                minimize: process.env.NODE_ENV === 'production',
                sourceMap: opts.sourceMap
            }, (loader && loader.indexOf('modules') !== -1 ? {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
            } : {}))
        }, {
            loader: 'postcss-loader',
            options: {
                sourceMap: opts.sourceMap,
                config: {
                    path: 'postcss.config.js'
                }
            }
        }]
        if (loader && loader.indexOf('css') === -1) { // 需要增加的loader
            loaders.push({
                loader: `${loader.split('_')[0]}-loader`,
                options: Object.assign({}, loaderOpts, {
                    sourceMap: opts.sourceMap
                })
            })
        }

        if (opts.extract) { //是否需要抽离css
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'style-loader',
                publicPath: '../../' //抽离出来的css 添加路径前缀, 让其打包出来的路径正确
            })
        } else {
            return ['style-loader'].concat(loaders)
        }
    }

    let variables = getLessVariables(path.join(__dirname, '../static/color.less'))
    return {
        css: generateLoaders(),
        css_modules: generateLoaders('css_modules'),
        less: generateLoaders('less', {
            globalVars: variables
        }),
        less_modules: generateLoaders('less_modules', {
            globalVars: variables
        })
    }
}

exports.styleLoader = function(opts) {
    const output = []
    const cssLoaders = exports.cssLoader(opts)
    // 需要CSS模块化的路径放入 commonStylePath 中
    // let commonStylePath = [path.resolve(__dirname, '../src/views'), path.resolve(__dirname, '../src/components')]
    let commonStylePath = []
    for (let extension in cssLoaders) {
        let loader = cssLoaders[extension]
        let rule = {
            test: new RegExp('\\.' + extension.split('_')[0] + '$'), //路径匹配
            use: loader
        }
        if (extension.indexOf('modules') !== -1) {
            rule.include = commonStylePath
        } else {
            rule.exclude = commonStylePath
        }
        output.push(rule)
    }
    return output
}