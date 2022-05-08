const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: "production",
    entry: "./start.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // 告诉webpack编译为js不使用箭头函数
        environment: {
            arrowFunction: false,
            const:false
        }
    },

    // webpack打包时要用的模块
    module: {
        rules: [
            {
                test: /\.ts$/,
                use:[
                    {
                        loader:"babel-loader",
                        options: {
                            presets:[
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            "chrome":"58",
                                            "ie":"11"
                                        },
                                        "corejs":"3",
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude:/node-modules/
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:"postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],

    // 用来设置引用模块（这里是ts和js文件都能作为模块）
    resolve: {
        extensions: ['.ts','.js']
    }

}